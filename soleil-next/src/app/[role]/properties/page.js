'use client'
import { api } from "@/utils/apis/api";
import { useEffect, useState, use, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faFilter, faEllipsisV, faEye, faCheckCircle, faTimesCircle, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Properties({ params }) {
    const { role } = use(params)
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [debounce, setDebounce] = useState("")

    const fetchProperties = useCallback(async () => {
        console.log(`[Properties] fetchProperties called for role: ${role}`);
        setLoading(true)
        try {
            const response = await api.get(`${role}/properties`)
            setProperties(response.data || [])
        } catch (error) {
            console.error("Error fetching properties:", error)
        } finally {
            setLoading(false)
        }
    }, [role])

    const fetchRef = useRef(false)
    useEffect(() => {
        if (fetchRef.current) return
        fetchRef.current = true
        fetchProperties()
    }, [fetchProperties])
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(searchTerm)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchTerm])

    const filteredProperties = properties.filter(prop =>
        prop.title?.en?.toLowerCase().includes(debounce.toLowerCase()) ||
        prop.title?.toLowerCase().includes(debounce.toLowerCase()) ||
        prop.reference?.toLowerCase().includes(debounce.toLowerCase())
    )

    if (loading) return (
        <div className="flex items-center justify-center min-h-100">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
        </div>
    )

    const handleMarkSold = async (id) => {
        try {
            await api.patch(`${role}/properties/${id}/sold`);
            fetchProperties(); 
        } catch (error) {
            console.error("Error marking property as sold:", error);
        }
    }

    const handleApprove = async (id) => {
        try {
            await api.patch(`admin/properties/${id}/verify`);
            fetchProperties();
        } catch (error) {
            console.error("Error approving property:", error);
        }
    }

    const handleReject = async (id) => {
        try {
            await api.patch(`admin/properties/${id}/reject`);
            fetchProperties();
        } catch (error) {
            console.error("Error rejecting property:", error);
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            await api.delete(`${role}/properties/${id}`);
            fetchProperties();
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    }

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <FontAwesomeIcon icon={faSearch} size="sm" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search properties by title or reference..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm font-work-sans"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                            <FontAwesomeIcon icon={faFilter} size="sm" />
                            <span>Filter</span>
                        </button>
                    </div>
                    <Link href={`/${role}/add-property`}>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gold text-white rounded-xl text-sm font-bold shadow-lg hover:bg-gold/90 transition-all">
                            <FontAwesomeIcon icon={faPlus} size="sm" />
                            <span>Add Property</span>
                        </button>
                    </Link>
                </div>
            </div>


            {/* Table View (Desktop) */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-work-sans min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold border-b whitespace-nowrap">
                                <th className="px-6 py-4 w-[30%]">Property</th>
                                <th className="px-6 py-4 w-[20%]">Agent</th>
                                <th className="px-6 py-4 w-[15%]">Status</th>
                                <th className="px-6 py-4 w-[15%]">Price</th>
                                <th className="px-6 py-4 w-[10%]">Type</th>
                                <th className="px-6 py-4 text-right w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProperties.map((prop, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                {prop.images?.[0]?.url ? (
                                                    <Image width={48} height={48} src={prop.images[0].url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">🏠</div>
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-bold text-gray-800 truncate block whitespace-nowrap">{prop.title?.en || prop.title}</span>
                                                <span className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase whitespace-nowrap">{prop.reference || 'REF-N/A'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-700">{prop.agent?.name || 'Unknown'}</span>
                                            <span className="text-[10px] text-gray-400">{prop.agent?.email || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight w-fit whitespace-nowrap ${prop.verificationStatus === 'approved' ? 'bg-green-50 text-green-600' : prop.verificationStatus === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                                <FontAwesomeIcon icon={prop.verificationStatus === 'approved' ? faCheckCircle : prop.verificationStatus === 'rejected' ? faTimesCircle : faShieldAlt} className="text-[12px]" />
                                                <span>{prop.verificationStatus === 'approved' ? 'Verified' : prop.verificationStatus === 'rejected' ? 'Rejected' : 'Pending'}</span>
                                            </div>
                                            {prop.isSold && (
                                                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[8px] font-bold uppercase w-fit whitespace-nowrap text-center">Sold Listing</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span>€{prop.price?.toLocaleString() || 'P.O.A'}</span>
                                            <span className="text-[10px] text-gray-400 font-normal">
                                                {typeof prop.location === 'object'
                                                    ? `${prop.location?.city || prop.location?.area || 'Costa Blanca'}, ES`
                                                    : (typeof prop.location === 'string' ? prop.location : 'Costa Blanca, ES')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-500 capitalize whitespace-nowrap">
                                        {prop.type || 'Residential'}
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            {role === 'admin' ? (
                                                <>
                                                    {prop.verificationStatus !== 'approved' && (
                                                        <button onClick={() => handleApprove(prop._id)} className="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-lg hover:bg-green-600 transition-colors">Approve</button>
                                                    )}
                                                    {prop.verificationStatus !== 'rejected' && (
                                                        <button onClick={() => handleReject(prop._id)} className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition-colors">Reject</button>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {!prop.isSold && (
                                                        <button onClick={() => handleMarkSold(prop._id)} className="px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-lg hover:bg-blue-600 transition-colors">Mark Sold</button>
                                                    )}
                                                    <button onClick={() => handleDelete(prop._id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </>
                                            )}
                                            <Link href={`/${role}/edit-property/${prop._id}`} className="p-1.5 text-gray-400 hover:text-gold transition-colors"><FontAwesomeIcon icon={faEdit} /></Link>
                                            <Link href={`/${role}/properties/${prop._id}`} className="p-1.5 text-gray-400 hover:text-gold transition-colors"><FontAwesomeIcon icon={faEye} /></Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Card View (Mobile) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredProperties.map((prop, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                {prop.images?.[0]?.url ? (
                                    <Image width={80} height={80} src={prop.images[0].url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">🏠</div>
                                )}
                            </div>
                            <div className="flex flex-col justify-between py-1 min-w-0 flex-1">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800 wrap-break-word leading-tight mb-1">{prop.title?.en || prop.title}</h3>
                                    <p className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">{prop.reference || 'REF-N/A'}</p>
                                </div>
                                <div className="text-sm font-black text-gold">
                                    €{prop.price?.toLocaleString() || 'P.O.A'}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                            <div className="flex flex-col gap-1.5">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tight w-fit ${prop.verificationStatus === 'approved' ? 'bg-green-50 text-green-600' : prop.verificationStatus === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                    <FontAwesomeIcon icon={prop.verificationStatus === 'approved' ? faCheckCircle : prop.verificationStatus === 'rejected' ? faTimesCircle : faShieldAlt} />
                                    <span>{prop.verificationStatus === 'approved' ? 'Verified' : prop.verificationStatus === 'rejected' ? 'Rejected' : 'Pending'}</span>
                                </div>
                                {prop.isSold && (
                                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-[8px] font-bold uppercase w-fit text-center">Sold Listing</span>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <Link href={`/${role}/properties/${prop._id}`} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gold transition-colors"><FontAwesomeIcon icon={faEye} /></Link>
                                <Link href={`/${role}/edit-property/${prop._id}`} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gold transition-colors"><FontAwesomeIcon icon={faEdit} /></Link>
                                {role === 'agent' && (
                                    <button onClick={() => handleDelete(prop._id)} className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-colors"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                )}
                            </div>
                        </div>

                        {role === 'admin' && prop.verificationStatus === 'pending' && (
                            <div className="flex gap-2">
                                <button onClick={() => handleApprove(prop._id)} className="flex-1 py-2.5 bg-green-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-green-100 hover:bg-green-600 transition-all">Approve Listing</button>
                                <button onClick={() => handleReject(prop._id)} className="flex-1 py-2.5 bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-100 hover:bg-red-600 transition-all">Reject Listing</button>
                            </div>
                        )}
                        
                        {role === 'agent' && !prop.isSold && (
                            <button onClick={() => handleMarkSold(prop._id)} className="w-full py-2.5 bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all">Mark as Sold</button>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
                {filteredProperties.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-3xl opacity-20">🔍</span>
                            <p className="text-sm text-gray-400 font-medium font-work-sans">No properties matched your search</p>
                        </div>
                    </div>
                )}
                <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-work-sans">
                    <span>Showing {filteredProperties.length} of {properties.length} results</span>
                    <div className="flex items-center gap-2">
                        <button className="p-1 px-3 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50" disabled>Previous</button>
                        <button className="p-1 px-3 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}