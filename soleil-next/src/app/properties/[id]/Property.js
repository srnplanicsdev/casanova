/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import PropertyCard from "@/components/PropertyCard"
import Sitemap from "@/components/Sitemap"
import { useFavorite } from "@/context/FavoriteContext"
import { api } from "@/utils/apis/api"
import { handleCardPrice } from "@/utils/helper/helper"
import { useLanguage } from "@/utils/useLanguage"
import { faLinkedin, faTwitter, faFacebook, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faHeart, faMobileScreenButton, faLink, faAngleLeft, faCheck, faAngleRight, faFileArrowDown, faArrowUpFromBracket, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState, useRef, useMemo } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export default function Property({ id }) {
    const [property, setProperty] = useState(null)
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [monthlyPayment, setMonthlyPayment] = useState(0)
    const [interestRate, setInterestRate] = useState(5)
    const [loanTerm, setLoanTerm] = useState(20)
    const [propertyPrice, setPropertyPrice] = useState(property?.price)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isFinancesOpen, setIsFinancesOpen] = useState(false)
    const swiperRef = useRef(null)
    const { t } = useLanguage()
    const { favorites, addFavorite, removeFavorite } = useFavorite()
    const modules = [Pagination, Navigation, Autoplay]

    const fetchProperty = async () => {
        setLoading(true)
        try {
            const property = await api.get(`/properties/${id}`)
            setProperty(property.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const fetchProperties = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/properties`)
            setProperties(response.data)
            setPropertyPrice(response.data?.price)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const calculateMonthlyPayment = (e) => {
        e.preventDefault()
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        const estimate = (propertyPrice * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        setMonthlyPayment(estimate.toFixed(2));
    }
    const location = useMemo(() => {
        if (!property) return ""
        const loc = property.location || {}
        return [loc.area, loc.zone, loc.city, loc.country].filter(Boolean).join(", ")
    }, [property])
    const features = useMemo(() => {
        if (!property) return []

        const baseFeatures = [
            { name: t("about-card.bedroom"), value: property.propertyDetails?.bedrooms },
            { name: t("about-card.bathrooms"), value: property.propertyDetails?.bathrooms },
            { name: t("property.usable"), value: property.propertyDetails?.usableArea + " m²" },
            { name: t("property.plot"), value: property.propertyDetails?.plotSize + " m²" },
            { name: t("property.pool"), value: property.propertyDetails?.pool },
            { name: t("property.distance-to-beach"), value: property.location?.distanceToBeachMeters + " Mts" },
            { name: t("property.location"), value: property.location?.city },
            { name: t("property.year-construction"), value: property.construction.year },
            { name: t("property.delivery-date"), value: property.construction.deliveryDate },
        ]

        const communityFeatures = (property.communityFeatures || []).map(feature => ({
            name: feature
        }))

        return [...baseFeatures, ...communityFeatures]
    }, [property])

    const scrollToMap = () => {
        document.getElementById("map").scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        const promise = async () => {
            await Promise.all([fetchProperty(), fetchProperties()])
        }
        promise()

    }, [id])
    return (
        <div>
            {loading ? (

                <div className="min-h-screen bg-gray-50 animate-pulse">

                    <div className="sticky top-0 z-30 bg-white border-b h-24">
                        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                            <div className="space-y-3">
                                <div className="h-6 w-72 bg-gray-300 rounded"></div>
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                            </div>
                            <div className="space-y-2 text-right">
                                <div className="h-4 w-20 bg-gray-200 rounded ml-auto"></div>
                                <div className="h-6 w-32 bg-gray-300 rounded ml-auto"></div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[500px] bg-gray-300"></div>

                    <div className="container mx-auto px-4 py-6 flex flex-wrap gap-4 justify-center">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-12 w-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>

                    <div className="bg-gold/10 py-10">
                        <div className="container mx-auto flex flex-wrap justify-center gap-10">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="h-10 w-10 bg-gray-300 rounded"></div>
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-6">
                        <div className="h-10 w-2/3 mx-auto bg-gray-300 rounded"></div>

                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>

                        <div className="h-10 w-40 mx-auto bg-gray-300 rounded"></div>
                    </div>

                    <div className="container mx-auto px-4 py-12 max-w-6xl">
                        <div className="h-8 w-64 mx-auto bg-gray-300 rounded mb-10"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="h-6 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-12">
                        <div className="h-8 w-48 mx-auto bg-gray-300 rounded mb-8"></div>
                        <div className="h-[400px] bg-gray-300 rounded"></div>
                    </div>

                    <div className="bg-gold/10 py-12">
                        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl">

                            <div className="bg-white shadow-sm">
                                <div className="h-64 bg-gray-300"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-6 w-40 bg-gray-300 rounded"></div>
                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-52 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="h-12 bg-white border rounded"></div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="h-12 bg-white border rounded"></div>
                                    <div className="h-12 bg-white border rounded"></div>
                                </div>
                                <div className="h-24 bg-white border rounded"></div>
                                <div className="h-12 w-40 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-12 max-w-4xl">
                        <div className="h-8 w-72 mx-auto bg-gray-300 rounded mb-10"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className="bg-white shadow-sm">
                                    <div className="h-48 bg-gray-300"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                                        <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            ) : (
                <div className="min-h-screen bg-gray-50 pb-10">

                    <div className="sticky top-0 z-30 bg-white shadow-sm border-b min-w-full h-24 border-gray-100 transition-all duration-300">
                        <div className="container mx-auto max-w-337.5 px-4 py-3">
                            <div className="flex flex-col md:flex-row  gap-4 items-center justify-between">
                                <div className="hidden xl:block flex-1">
                                    <h2 className="text-2xl xl:text-2xl font-semibold text-gray-800 leading-tight">
                                        {property?.type} · <em>{property?.status}</em>
                                        <small className="block text-base uppercase tracking-wider text-gold font-normal mt-1">
                                            {property?.location?.city} · {property?.location?.zone}
                                        </small>
                                    </h2>
                                </div>

                                <div className="text-center md:text-right">
                                    <span
                                        className="block text-sm uppercase tracking-wider rounded-full px-2 py-1 bg-gold/10 text-gray-800">
                                        {property?.reference}
                                    </span>
                                    <div className="text-2xl font-semibold text-gray-800 mt-0.5">
                                        {handleCardPrice(property?.price)}
                                    </div>
                                </div>

                                <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                                    <button
                                        className="flex-1 md:flex-none px-6 py-5 text-sm font-medium border border-gray-900 text-gray-900  hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wider">
                                        <span className="hidden sm:inline">{t('property.notify-offer')}</span>
                                        <span className="sm:hidden">{t('property.notify')}</span>
                                    </button>
                                    <button
                                        className="flex-1 md:flex-none px-6 py-5 text-sm font-medium bg-gold text-white  hover:bg-gold/80 transition-colors uppercase tracking-wider shadow-sm">
                                        <span className="hidden sm:inline">{t('property.make-enquiry')}</span>
                                        <span className="sm:hidden">{t('property.enquiry')}</span>
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white  hover:bg-green-600 transition-colors shadow-sm">
                                        <FontAwesomeIcon icon={faWhatsapp} className="text-4xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-black">
                        <div className="container mx-auto">
                            <Swiper
                                ref={swiperRef}
                                modules={modules}
                                slidesPerView={1}
                                centeredSlides={true}
                                spaceBetween={0}
                                pagination={{ clickable: true }}
                                navigation={true}
                                loop={true}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                className="property-slider"
                            >
                                {property?.images?.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className="relative w-full"
                                            style={{ aspectRatio: "16 / 9" }}
                                        >
                                            <Image
                                                src={image.url}
                                                alt="Property Image"
                                                width={1920}
                                                height={1280}
                                                className="object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-8">

                            <div className="flex items-center justify-center lg:justify-start gap-3 order-1">
                                <button onClick={() => addFavorite(property.id)}
                                    className="flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-white transition-all duration-300 group">
                                    <FontAwesomeIcon icon={faHeart}
                                        className="text-xl group-hover:scale-110 transition-transform" />
                                </button>

                                <div className="relative group">
                                    <button
                                        className="flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-white transition-all duration-300">
                                        <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-xl" />
                                    </button>


                                    <div
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                        <div className="bg-white shadow-xl rounded-lg p-3 flex gap-2 border border-gray-100">
                                            <button
                                                className="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                                <FontAwesomeIcon icon={faFacebook} />
                                            </button>
                                            <button
                                                className="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                                <FontAwesomeIcon icon={faTwitter} />
                                            </button>
                                            <button
                                                className="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                                <FontAwesomeIcon icon={faLinkedin} />
                                            </button>
                                            <button
                                                className="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                                <FontAwesomeIcon icon={faWhatsapp} />
                                            </button>
                                            <button
                                                className="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                                <FontAwesomeIcon icon={faTelegram} />
                                            </button>
                                            <button
                                                className="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </button>
                                            <button
                                                className="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                                <FontAwesomeIcon icon={faLink} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-white transition-all duration-300 group">
                                    <FontAwesomeIcon icon={faFileArrowDown}
                                        className="text-xl group-hover:scale-110 transition-transform" />
                                </button>
                            </div>

                            <div
                                className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 order-2 w-full lg:w-auto lg:flex-1 lg:justify-center">
                                <button
                                    className="w-full lg:w-auto px-6 py-3 text-sm font-medium uppercase tracking-wider border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
                                    {t('property.photos')}
                                </button>
                                <button onClick={() => scrollToMap()}
                                    className="w-full lg:w-auto px-6 py-3 text-sm font-medium uppercase tracking-wider bg-gold/10 text-gray-900 hover:bg-gold hover:text-white transition-colors">
                                    {t('property.map')}
                                </button>
                                <button onClick={() => setIsFinancesOpen(true)}
                                    className="w-full lg:w-auto px-6 py-3 text-sm font-medium uppercase tracking-wider bg-gold/10 text-gray-900 hover:bg-gold hover:text-white transition-colors">
                                    {t('property.finances')}
                                </button>
                                <button
                                    className="w-full lg:w-auto px-6 py-3 text-sm font-medium uppercase tracking-wider bg-gold/10 text-gray-900 hover:bg-gold hover:text-white transition-colors flex items-center justify-center gap-2">
                                    <FontAwesomeIcon icon={faAngleLeft} /> {t('property.back')}
                                </button>
                            </div>
                        </div>
                    </div>
                    {isFinancesOpen && (
                        <div onClick={() => setIsFinancesOpen(false)}
                            className="fixed z-9999 transition-transform duration-400 ease-linear scroll-none w-full h-full  bg-black/50 inset-0 flex items-center justify-center">
                            <div className="bg-white w-8xl h-8xl p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                                <h2 className="text-xl flex justify-center font-bold mb-4">{t('property.calculate-mortgage')}</h2>
                                <button onClick={() => setIsFinancesOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 flex justify-center">{t('property.close')}</button>
                                <form onSubmit={(e) => calculateMonthlyPayment(e)}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="price">{t('property.price')}</label>
                                            <input type="text" id="price" value={propertyPrice ?? ''} onChange={(e) => setPropertyPrice(e.target.value)}
                                                className="border border-gray-300 rounded p-2" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="interest-rate">{t('property.interest-rate')}</label>
                                            <input type="text" id="interest-rate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                                                className="border border-gray-300 rounded p-2" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="loan-term">{t('property.years')}</label>
                                            <select id="loan-term" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="border border-gray-300 rounded p-2">
                                                <option value="">Duration</option>
                                                {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                                                    <option key={n} value={n}>{n} Years</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button type="submit" className="col-span-3 bg-gold hover:bg-gold/80 transition-colors hover:text-black text-white p-2 ">{t('property.calculate')}</button>
                                    </div>
                                </form>
                                <div className="mt-2">
                                    <h1 className="text-sm uppercase text-gold flex justify-center">{t('property.monthly-payment')}
                                    </h1>
                                    <p className="text-2xl mt-3 py-4 border-b border-gray-300 font-bold flex justify-center">
                                        {monthlyPayment}
                                    </p>

                                </div>
                                <div className="mt-2 bg-gold/10 p-5">
                                    <div className="flex justify-between">
                                        <p>Pounds:</p>
                                        <p>1.446.340 GBP</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Swiss franc:</p>
                                        <p>1.647.275 CHF</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Chinese yuan:</p>
                                        <p>13.381.200 CNY</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Dollar:</p>
                                        <p>1.836.975 USD</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Swedish krona:</p>
                                        <p>20.076.000 SEK</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>The Norwegian crown:</p>
                                        <p>20.586.125 NOK</p>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    <div className="mt-10 bg-gold/10 py-8">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap gap-4 justify-center md:gap-10 lg:gap-20 max-w-5xl mx-auto">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                                    <Image width={40} height={40} src="/assets/media/images/website/house.svg" className="h-10 w-10" alt="meters" />
                                    <div className="text-xs">
                                        <p className="font-medium">{t('property.home')}</p>
                                        <p className="text-gray-700">{property?.propertyDetails.usableArea}<sup>2</sup></p>
                                    </div>
                                </div>
                                {property?.propertyDetails.plotSize && (
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                                        <Image width={40} height={40} src="/assets/media/images/website/plano.svg" className="h-10 w-10" alt="plot" />
                                        <div className="text-xs">
                                            <p className="font-medium">{t('property.plot')}</p>
                                            <p className="text-gray-700">{property?.propertyDetails.plotSize}<sup>2</sup></p>
                                        </div>
                                    </div>
                                )}
                                {property?.propertyDetails.bedrooms && (
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                                        <Image width={40} height={40} src="/assets/media/images/website/bed.svg" className="h-10 w-10" alt="bedrooms" />
                                        <div className="text-xs">
                                            <p className="font-medium">Bedrooms</p>
                                            <p className="text-gray-700">{property?.propertyDetails.bedrooms}</p>
                                        </div>
                                    </div>
                                )}
                                {property?.propertyDetails.bathrooms && (
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                                        <Image width={40} height={40} src="/assets/media/images/website/bath.svg" className="h-10 w-10" alt="baths" />
                                        <div className="text-xs">
                                            <p className="font-medium">Baths</p>
                                            <p className="text-gray-700">{property?.propertyDetails.bathrooms}</p>
                                        </div>
                                    </div>
                                )}
                                {property?.propertyDetails.pool && (
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                                        <Image width={40} height={40} src="/assets/media/images/website/pool.svg" className="h-10 w-10" alt="pool" />
                                        <div className="text-xs">
                                            <p className="font-medium">{t('property.pool')}</p>
                                            <p className="text-gray-700">{property?.propertyDetails.pool}</p>
                                        </div>
                                    </div>
                                )}
                                {property?.propertyDetails.parking && (
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                                        <Image width={40} height={40} src="/assets/media/images/website/garaje.svg" className="h-10 w-10" alt="parking" />
                                        <div className="text-xs">
                                            <p className="font-medium">{t('property.parking')}</p>
                                            <p className="text-gray-700">{property?.propertyDetails.parking}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="container mx-auto px-4 py-12 max-w-4xl">
                            <h1 className="font-work-sans text-2xl md:text-3xl lg:text-4xl font-normal text-center">
                                {property?.title}
                            </h1>
                            <p className={`font-work-sans text-base md:text-lg mt-6 text-gray-700 leading-relaxed text-center ${isExpanded ? '' : 'line-clamp-5'}`}>
                                {property?.description}

                            </p>
                            <div className="mt-8 flex justify-center">
                                <button onClick={() => setIsExpanded(!isExpanded)}
                                    className="px-8 py-3 border border-gray-900 transition-all duration-300 ease-in-out text-gray-900 hover:bg-gray-900 hover:text-white uppercase tracking-wider font-medium flex items-center gap-2">
                                    <span>{isExpanded ? t('property.less-info') : t('property.more-info')}</span>
                                    <FontAwesomeIcon icon={faAngleRight}
                                        className={`ml-2 transform transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-270' : 'rotate-90'}`} />
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-12 max-w-6xl">
                        <h2
                            className="text-center font-dm-serif-display text-3xl md:text-4xl font-semibold italic text-gray-800 mb-8">
                            {t('property.features')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                            {features.map((feature) => (
                                <div key={feature.name}
                                    className="flex justify-between items-center gap-4">
                                    <div className="text-sm md:text-base flex items-center gap-2 flex-1">
                                        <div
                                            className="bg-gold flex justify-center items-center text-white h-5 w-5 min-w-5 text-xs rounded-full">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        <span className="text-gray-800">
                                            {feature.name}
                                        </span>
                                    </div>
                                    {feature.value && <p className="font-semibold text-gray-900 text-sm md:text-base">{feature.value}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="map" className="container mx-auto  px-4 py-12">
                        <h2
                            className="text-center font-dm-serif-display text-3xl md:text-4xl font-semibold italic text-gray-800 mb-8">
                            {t('property.location')}
                        </h2>
                        <div className="max-w-5xl mx-auto">
                            <Sitemap address={location} height="500px" />
                        </div>
                    </div>


                    <div className="bg-gold/10 mt-12">
                        <div className="container mx-auto px-4 py-12">
                            <div className="flex flex-col items-center gap-5 mb-10">
                                <Image width={250} height={250} src="/assets/img/sde-no_bg-web.png" alt="contact" className="h-20 md:h-24" />
                                <h2
                                    className="font-dm-serif-display text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 text-center">
                                    {t('property.make')} <span className="italic lowercase">{t('property.enquiry')}</span>
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                                <div className="flex flex-col w-full max-w-sm mx-auto lg:mx-0">
                                    <div className="bg-white shadow-sm">
                                        <Image width={500} height={500} src="/assets/media/images/website/img-contact-martyna@2x.jpg"
                                            alt="contact" />
                                        <div className=" p-4 ">
                                            <p className="text-2xl font-dm-serif-display font-semibold"><em>Martyna Kamińska</em>
                                            </p>
                                            <p className="uppercase text-gold mt-2 ">{t('property.your-agent')}</p>
                                            <p className="font-light text-base mt-3 flex items-center gap-2"> <FontAwesomeIcon
                                                icon={faMobileScreenButton} className="text-gold" /> +34 622 919 887
                                            </p>
                                            <p className="font-light text-base mt-2 flex items-center gap-2"> <FontAwesomeIcon
                                                icon={faEnvelope} className="text-gold" />
                                                info@mkpremiumproperties.com
                                            </p>

                                        </div>
                                    </div>

                                    <div className=" mt-4">
                                        <button
                                            className="bg-green-600 w-full hover:bg-green-500 text-white p-3 flex items-center gap-2 justify-center"><font-awesome-icon
                                                icon="fa-brands fa-whatsapp" className="text-3xl" /> {t('property.contact-whatsapp')} </button>
                                    </div>
                                </div>

                                <div className="w-full max-w-2xl lg:mt-10 mx-auto lg:mx-0">

                                    <div className="flex flex-col gap-5">
                                        <input type="text"
                                            className="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                            placeholder={t('about-card.name') + ' *'} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <input type="email"
                                                className="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                                placeholder={t('about-card.email') + ' *'} />
                                            <input type="text"
                                                className="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                                placeholder={t('about-card.phone')} />
                                        </div>

                                        <textarea name="" rows="4" placeholder={t('about-card.message') + ' *'} readOnly
                                            className="p-4 bg-white appearance-none border border-gray-200 focus:border-gold outline-none transition-colors" />
                                        <div>
                                            <label className="group flex items-start cursor-pointer">
                                                <input type="checkbox" className="sr-only" />
                                                <span
                                                    className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-black group-has-checked:border-black transition duration-300 ease-in-out">
                                                    <svg className="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                                                        viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                                                            clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                <p className="text-xs text-start w-full ps-3 text-gray-700 ">
                                                    {t('about-card.about-the-policy')}<span
                                                        className="underline font-medium">{t('about-card.privacy-policy')
                                                        }</span>.
                                                    {t('about-card.information')}
                                                </p>
                                            </label>
                                        </div>
                                        <button
                                            className="bg-gold text-white py-3 px-10 hover:bg-gold/80 hover:text-black transition-colors uppercase font-semibold tracking-widest">{t('contact')}</button>
                                        <div>
                                            <textarea className="p-4 w-full appearance-none text-xs border border-gray-200" defaultValue={t('about-card.policy')} rows="2" readOnly></textarea>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-12">
                        <h2 className="text-center text-3xl md:text-4xl font-bold font-dm-serif-display mb-10">
                            {t('property.similar')} <em className="text-gold">{t('property.properties')}</em>
                        </h2>

                        <div className="max-w-3xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {properties.slice(0, 2).map((property) => (
                                    <PropertyCard key={property._id} cardData={property} />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}