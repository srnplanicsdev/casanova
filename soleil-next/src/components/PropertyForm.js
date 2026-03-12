'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/utils/apis/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faTrash,
	faChevronRight,
	faChevronLeft,
	faCheck,
	faImage as faImageIcon,
	faMapMarkerAlt,
	faInfoCircle,
	faBuilding,
	faBed,
	faBath,
	faRulerCombined,
	faSwimmingPool,
	faCalendarAlt,
	faEuroSign,
	faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function PropertyForm({ mode = 'create', role, id }) {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(mode === 'edit');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const lastStepChange = useRef(0);


	const [areas, setAreas] = useState([]);
	const [cities, setCities] = useState([]);
	const [loadingLocations, setLoadingLocations] = useState(false);

	const [form, setForm] = useState({
		title: '',
		type: '',
		status: 'New Build',
		price: '',
		currency: 'EUR',
		reference: '',
		images: [],
		energyRating: '',
		location: {
			country: 'Spain',
			area: '',
			areaId: '',
			city: '',
			zone: '',
			distanceToBeachMeters: ''
		},
		propertyDetails: {
			bedrooms: '',
			bathrooms: '',
			floor: '',
			usableArea: '',
			plotSize: '',
			balconyArea: '',
			pool: ''
		},
		construction: {
			year: new Date().getFullYear(),
			deliveryDate: ''
		},
		description: '',
		communityFeatures: [],
		architects: []
	});

	const [imageUrl, setImageUrl] = useState('');
	const [featureInput, setFeatureInput] = useState('');
	const [architectInput, setArchitectInput] = useState('');

	const fetchAreas = async () => {
		try {
			const response = await api.get('locations/areas');
			setAreas(response.data);
		} catch (err) {
			console.error("Error fetching areas:", err);
		}
	};

	const fetchProperty = useCallback(async () => {
		if (mode !== 'edit' || !id) return;

		try {
			const endpoint = role === 'admin' ? `admin/properties/${id}` : `agent/properties/${id}`;
			const response = await api.get(endpoint);
			const data = response.data;

			setForm({
				title: data.title || '',
				type: data.type || '',
				status: data.status || 'New Build',
				price: data.price || '',
				currency: data.currency || 'EUR',
				reference: data.reference || '',
				images: data.images || [],
				energyRating: data.energyRating || '',
				location: {
					country: data.location?.country || 'Spain',
					area: data.location?.area || '',
					areaId: data.location?.areaId || '',
					city: data.location?.city || '',
					zone: data.location?.zone || '',
					distanceToBeachMeters: data.location?.distanceToBeachMeters || ''
				},
				propertyDetails: {
					bedrooms: data.propertyDetails?.bedrooms || '',
					bathrooms: data.propertyDetails?.bathrooms || '',
					floor: data.propertyDetails?.floor || '',
					usableArea: data.propertyDetails?.usableArea || '',
					plotSize: data.propertyDetails?.plotSize || '',
					balconyArea: data.propertyDetails?.balconyArea || '',
					pool: data.propertyDetails?.pool || ''
				},
				construction: {
					year: data.construction?.year || new Date().getFullYear(),
					deliveryDate: data.construction?.deliveryDate || ''
				},
				description: data.description || '',
				communityFeatures: data.communityFeatures || [],
				architects: data.architects || []
			});

			if (data.location?.areaId) {
				const cityRes = await api.get(`locations/areas/${data.location.areaId}/cities`);
				setCities(cityRes.data);
			}
		} catch (err) {
			setError('Failed to fetch property details');
			console.error(err);
		} finally {
			setFetching(false);
		}
	}, [mode, id, role]);

	const hasFetchedRef = useRef(false);
	useEffect(() => {
		if (hasFetchedRef.current) return;
		hasFetchedRef.current = true;
		fetchAreas();
		if (mode === 'edit') fetchProperty();
	}, [fetchProperty, mode]);

	const handleAreaChange = async (areaId) => {
		const selectedArea = areas.find(a => a._id === areaId);
		setForm(prev => ({
			...prev,
			location: {
				...prev.location,
				areaId: areaId,
				area: selectedArea?.name || '',
				city: ''
			}
		}));

		if (areaId) {
			setLoadingLocations(true);
			try {
				const response = await api.get(`locations/areas/${areaId}/cities`);
				setCities(response.data);
			} catch (err) {
				console.error("Error fetching cities:", err);
			} finally {
				setLoadingLocations(false);
			}
		} else {
			setCities([]);
		}
	};

	const addImage = () => {
	   const urls = imageUrl
	.split('\n')
	.map(url => url.trim())
	.filter(url => url);

		if (urls.length) {
			setForm(prev => ({
				...prev,
				images: [...prev.images, ...urls.map(url => ({ url }))]
			}));
			setImageUrl('');
		}
	};

	const removeImage = (index) => {
		setForm(prev => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index)
		}));
	};

	const addFeature = () => {
		if (featureInput.trim()) {
			setForm(prev => ({
				...prev,
				communityFeatures: [...prev.communityFeatures, featureInput.trim()]
			}));
			setFeatureInput('');
		}
	};

	const addArchitect = () => {
		if (architectInput.trim()) {
			setForm(prev => ({
				...prev,
				architects: [...prev.architects, architectInput.trim()]
			}));
			setArchitectInput('');
		}
	};

	const handleSubmit = async () => {
		if (step !== 5) {
			console.warn("Attempted to submit on wrong step:", step);
			return;
		}

		if (Date.now() - lastStepChange.current < 800) {
			console.warn("Submission blocked: Too soon after step change");
			return;
		}

		setLoading(true);
		setError('');

		try {

			const imageUrls = form.images
				.filter(img => !img.public_id)
				.map(img => img.url);

			const existingImages = form.images
				.filter(img => img.public_id)
				.map(img => img.public_id);

			const payload = {
				...form,
				imageUrls,
				existingImages
			};

			if (mode === 'create') {
				const endpoint = role === 'admin' ? 'admin/properties' : 'agent/properties';
				await api.post(endpoint, payload);
			} else {
				const endpoint = role === 'admin' ? `admin/properties/${id}` : `agent/properties/${id}`;
				await api.put(endpoint, payload);
			}

			setSuccess(true);
			setTimeout(() => {
				router.push(`/${role}/properties`);
			}, 2000);
		} catch (err) {
			setError(err.response?.data?.message || `Failed to ${mode} property`);
		} finally {
			setLoading(false);
		}
	};

	const nextStep = () => {
		lastStepChange.current = Date.now();
		setStep(prev => Math.min(prev + 1, 5));
	};
	const prevStep = () => {
		lastStepChange.current = Date.now();
		setStep(prev => Math.max(prev - 1, 1));
	};

	if (fetching) return (
		<div className="flex items-center justify-center min-h-100">
			<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
		</div>
	);

	if (success) {
		return (
			<div className="flex flex-col items-center justify-center min-h-125 animate-in fade-in zoom-in duration-500">
				<div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
					<FontAwesomeIcon icon={faCheck} className="text-3xl text-green-600" />
				</div>
				<h2 className="text-3xl font-dm-serif-display text-slate-800 mb-2">
					Property {mode === 'create' ? 'Created' : 'Updated'}!
				</h2>
				<p className="text-slate-500 font-work-sans">Redirecting to your properties list...</p>
			</div>
		);
	}

	const StepIndicator = () => (
		<div className="hidden md:flex justify-between mb-12 relative px-4">
			<div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
			{[1, 2, 3, 4, 5].map((num) => (
				<div key={num} className="relative z-10 flex flex-col items-center">
					<div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step >= num ? 'bg-gold text-white shadow-lg' : 'bg-white border-2 border-slate-100 text-slate-300'
						}`}>
						<span className="text-sm font-bold">{num}</span>
					</div>
				</div>
			))}
		</div>
	);

	// const faTimes = {
	//     prefix: 'fas',
	//     iconName: 'times',
	//     icon: [352, 512, [], "f00d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.19 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"]
	// };

	return (
		<div
			className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-700"
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					if (e.target.tagName !== 'TEXTAREA' && step !== 5) {
						e.preventDefault();
					}
				}
			}}
		>
			<div className="mb-10 text-center md:text-left">
				<h1 className="text-3xl md:text-4xl font-dm-serif-display text-slate-800 mb-2 italic">
					{mode === 'create' ? 'Create New' : 'Edit'}{' '}
					<span className="text-gold not-italic">Property</span>
				</h1>
				<p className="text-slate-500 font-work-sans text-sm md:text-base">
					{mode === 'create'
						? 'Enter the details of your prime listing in Spain.'
						: 'Modify the details of your prime listing.'}
				</p>
			</div>

			<StepIndicator />

			<div className="bg-white rounded-3xl shadow-2xl border border-slate-50 overflow-hidden">
				<div className="p-6 md:p-10">
					{error && (
						<div className="mb-8 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-r-xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
							<FontAwesomeIcon icon={faExclamationTriangle} />
							<p className="text-sm font-medium">{error}</p>
						</div>
					)}

					{step === 1 && (
						<div className="space-y-8 animate-in slide-in-from-right duration-500">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-gold/10 rounded-lg">
									<FontAwesomeIcon icon={faInfoCircle} className="text-gold" />
								</div>
								<h2 className="text-xl font-bold text-slate-800">Basic Information</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Property Title *</label>
									<input
										type="text" required
										value={form.title}
										onChange={e => setForm({ ...form, title: e.target.value })}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										placeholder="e.g. Modern Villa in Marbella"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Reference Number *</label>
									<input
										type="text" required
										value={form.reference}
										onChange={e => setForm({ ...form, reference: e.target.value })}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										placeholder="e.g. SV-1002"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Property Type *</label>
									<select
										required
										value={form.type}
										onChange={e => setForm({ ...form, type: e.target.value })}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									>
										<option value="">Select Type</option>
										<option value="Villa">Villa</option>
										<option value="Apartment">Apartment</option>
										<option value="Townhouse">Townhouse</option>
										<option value="Plot">Plot</option>
										<option value="Commercial">Commercial</option>
									</select>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Listing Status *</label>
									<select
										required
										value={form.status}
										onChange={e => setForm({ ...form, status: e.target.value })}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									>
										<option value="New Build">New Build</option>
										<option value="Resale">Resale</option>
									</select>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Price ({form.currency}) *</label>
									<div className="relative">
										<input
											type="number" required min="0"
											value={form.price}
											onChange={e => setForm({ ...form, price: e.target.value })}
											className="w-full h-12 px-4 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										/>
										<FontAwesomeIcon icon={faEuroSign} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Energy Rating</label>
									<select
										value={form.energyRating}
										onChange={e => setForm({ ...form, energyRating: e.target.value })}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									>
										<option value="">Select Rating</option>
										{['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(r => (
											<option key={r} value={r}>{r}</option>
										))}
									</select>
								</div>
							</div>
						</div>
					)}

					{step === 2 && (
						<div className="space-y-8 animate-in slide-in-from-right duration-500">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-gold/10 rounded-lg">
									<FontAwesomeIcon icon={faMapMarkerAlt} className="text-gold" />
								</div>
								<h2 className="text-xl font-bold text-slate-800">Location Details</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Area *</label>
									<select
										required
										value={form.location.areaId}
										onChange={e => handleAreaChange(e.target.value)}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									>
										<option value="">Select Area</option>
										{areas.map(area => (
											<option key={area._id} value={area._id}>{area.name}</option>
										))}
									</select>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">City *</label>
									<select
										required
										disabled={!form.location.areaId || loadingLocations}
										value={form.location.city}
										onChange={e => setForm({
											...form,
											location: { ...form.location, city: e.target.value }
										})}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all disabled:opacity-50"
									>
										<option value="">{loadingLocations ? 'Loading cities...' : 'Select City'}</option>
										{cities.map(city => (
											<option key={city._id} value={city.name}>{city.name}</option>
										))}
									</select>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Zone</label>
									<input
										type="text"
										value={form.location.zone}
										onChange={e => setForm({
											...form,
											location: { ...form.location, zone: e.target.value }
										})}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										placeholder="e.g. Golden Mile"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Distance to Beach (meters)</label>
									<input
										type="number" min="0"
										value={form.location.distanceToBeachMeters}
										onChange={e => setForm({
											...form,
											location: { ...form.location, distanceToBeachMeters: e.target.value }
										})}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									/>
								</div>
							</div>
						</div>
					)}

					{step === 3 && (
						<div className="space-y-8 animate-in slide-in-from-right duration-500">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-gold/10 rounded-lg">
									<FontAwesomeIcon icon={faBuilding} className="text-gold" />
								</div>
								<h2 className="text-xl font-bold text-slate-800">Property Specifications</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Bedrooms</label>
									<div className="relative">
										<input
											type="number" min="0"
											value={form.propertyDetails.bedrooms}
											onChange={e => setForm({
												...form,
												propertyDetails: { ...form.propertyDetails, bedrooms: e.target.value }
											})}
											className="w-full h-12 px-4 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										/>
										<FontAwesomeIcon icon={faBed} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Bathrooms</label>
									<div className="relative">
										<input
											type="number" min="0"
											value={form.propertyDetails.bathrooms}
											onChange={e => setForm({
												...form,
												propertyDetails: { ...form.propertyDetails, bathrooms: e.target.value }
											})}
											className="w-full h-12 px-4 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										/>
										<FontAwesomeIcon icon={faBath} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Floor</label>
									<input
										type="number" min="0"
										value={form.propertyDetails.floor}
										onChange={e => setForm({
											...form,
											propertyDetails: { ...form.propertyDetails, floor: e.target.value }
										})}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Usable Area (m²)</label>
									<div className="relative">
										<input
											type="number" min="0"
											value={form.propertyDetails.usableArea}
											onChange={e => setForm({
												...form,
												propertyDetails: { ...form.propertyDetails, usableArea: e.target.value }
											})}
											className="w-full h-12 px-4 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										/>
										<FontAwesomeIcon icon={faRulerCombined} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Plot Size (m²)</label>
									<input
										type="number" min="0"
										value={form.propertyDetails.plotSize}
										onChange={e => setForm({
											...form,
											propertyDetails: { ...form.propertyDetails, plotSize: e.target.value }
										})}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Balcony Area (m²)</label>
									<input
										type="number" min="0"
										value={form.propertyDetails.balconyArea}
										onChange={e => setForm({
											...form,
											propertyDetails: { ...form.propertyDetails, balconyArea: e.target.value }
										})}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Pool Facility</label>
									<div className="relative">
										<select
											value={form.propertyDetails.pool}
											onChange={e => setForm({
												...form,
												propertyDetails: { ...form.propertyDetails, pool: e.target.value }
											})}
											className="w-full h-12 px-4 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										>
											<option value="">No Pool</option>
											<option value="Private">Private</option>
											<option value="Communal">Communal</option>
										</select>
										<FontAwesomeIcon icon={faSwimmingPool} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
									</div>
								</div>
							</div>
						</div>
					)}

					{step === 4 && (
						<div className="space-y-8 animate-in slide-in-from-right duration-500">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-gold/10 rounded-lg">
									<FontAwesomeIcon icon={faCalendarAlt} className="text-gold" />
								</div>
								<h2 className="text-xl font-bold text-slate-800">Construction & Vision</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Year Built</label>
									<input
										type="number" min="1900" max={new Date().getFullYear() + 10}
										value={form.construction.year}
										onChange={e => setForm({
											...form,
											construction: { ...form.construction, year: e.target.value }
										})}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Delivery Date</label>
									<input
										type="date"
										value={form.construction.deliveryDate}
										onChange={e => setForm({
											...form,
											construction: { ...form.construction, deliveryDate: e.target.value }
										})}
										className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
									/>
								</div>
								<div className="col-span-full space-y-2">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Compelling Description *</label>
									<textarea
										rows="6"
										value={form.description}
										onChange={e => setForm({ ...form, description: e.target.value })}
										className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all resize-none"
										placeholder="Describe the lifestyle..."
									></textarea>
								</div>
							</div>
						</div>
					)}

					{step === 5 && (
						<div className="space-y-8 animate-in slide-in-from-right duration-500">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-gold/10 rounded-lg">
									<FontAwesomeIcon icon={faImageIcon} className="text-gold" />
								</div>
								<h2 className="text-xl font-bold text-slate-800">Gallery & Features</h2>
							</div>

							<div className="space-y-4">
								<label className="text-xs font-black uppercase tracking-widest text-slate-400">Property Gallery (Image URLs)</label>
								<div className="flex gap-2">
									<textarea
									rows={4}
										type="url"
										value={imageUrl}
										onChange={e => setImageUrl(e.target.value)}
										onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
										className="flex-1 h-40 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										placeholder="https://..."
									/>
									<button
										type="button"
										onClick={addImage}
										className="px-6 bg-gold text-white rounded-xl font-bold hover:bg-gold/80 transition-all"
									>
										<FontAwesomeIcon icon={faPlus} />
									</button>
								</div>

								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
									{form.images.map((img, i) => (
										<div key={i} className="group relative aspect-video rounded-xl overflow-hidden shadow-sm border border-slate-100">
											<Image width={200} height={200} src={img.url} alt="" className="w-full h-full object-cover" />
											<button
												type="button"
												onClick={() => removeImage(i)}
												className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
											>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</div>
									))}
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
								<div className="space-y-4">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Community Features</label>
									<div className="flex gap-2">
										<input
											type="text"
											value={featureInput}
											onChange={e => setFeatureInput(e.target.value)}
											onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
											className="flex-1 h-11 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										/>
										<button
											type="button"
											onClick={addFeature}
											className="px-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all text-sm"
										>Add</button>
									</div>
									<div className="flex flex-wrap gap-2">
										{form.communityFeatures.map((f, i) => (
											<span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold flex items-center gap-2">
												{f}
												<button type="button" onClick={() => setForm({ ...form, communityFeatures: form.communityFeatures.filter((_, idx) => idx !== i) })}>
													<FontAwesomeIcon icon={faTimes} className="text-[10px] text-red-400" />
												</button>
											</span>
										))}
									</div>
								</div>

								<div className="space-y-4">
									<label className="text-xs font-black uppercase tracking-widest text-slate-400">Envisioned by (Architects)</label>
									<div className="flex gap-2">
										<input
											type="text"
											value={architectInput}
											onChange={e => setArchitectInput(e.target.value)}
											onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addArchitect())}
											className="flex-1 h-11 px-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-gold transition-all"
										/>
										<button
											type="button"
											onClick={addArchitect}
											className="px-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all text-sm"
										>Add</button>
									</div>
									<div className="flex flex-wrap gap-2">
										{form.architects.map((a, i) => (
											<span key={i} className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-bold flex items-center gap-2">
												{a}
												<button type="button" onClick={() => setForm({ ...form, architects: form.architects.filter((_, idx) => idx !== i) })}>
													<FontAwesomeIcon icon={faTimes} className="text-[10px] text-red-400" />
												</button>
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
					<button
						type="button"
						key={`back-${step}`}
						onClick={prevStep}
						disabled={step === 1}
						className={`flex items-center gap-2 font-bold text-sm transition-all ${step === 1 ? 'text-slate-300 pointer-events-none' : 'text-slate-600 hover:text-slate-800'}`}
					>
						<FontAwesomeIcon icon={faChevronLeft} />
						Back
					</button>

					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => router.back()}
							className="px-6 py-2 text-slate-400 hover:text-slate-600 text-sm font-bold transition-all"
						>Cancel</button>

						{step < 5 ? (
							<button
								type="button"
								key={`next-${step}`}
								onClick={nextStep}
								className="px-8 py-3 bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm font-bold flex items-center gap-2"
							>
								Continue
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						) : (
							<button
								type="button"
								key={`submit-${step}`}
								onClick={handleSubmit}
								disabled={loading}
								className="px-10 py-3 bg-gold text-white rounded-xl shadow-lg shadow-gold/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm font-bold flex items-center gap-2 disabled:opacity-50"
							>
								{loading
									? (mode === 'create' ? 'Listing...' : 'Saving...')
									: (mode === 'create' ? 'List Property' : 'Update Property')}
								<FontAwesomeIcon icon={faCheck} />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
