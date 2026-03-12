'use client'
import { api } from "@/utils/apis/api";
import { useEffect, useState, use, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPlus, faEnvelope, faPhone, faShieldAlt, faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Agents({ params }) {
    const { role } = use(params)
    const [agents, setAgents] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    const [selectedAgent, setSelectedAgent] = useState(null)
    const [actionLoading, setActionLoading] = useState(false)

    const fetchAgents = useCallback(async () => {
        setLoading(true)
        try {
            const response = await api.get(`${role}/users`)
            setAgents(response.data || [])
        } catch (error) {
            console.error("Error fetching agents:", error)
        } finally {
            setLoading(false)
        }
    }, [role])

    const handleVerifyAction = async (agentId, action) => {
        setActionLoading(true)
        try {
            await api.patch(`admin/agents/${agentId}/${action}`)
            fetchAgents()
            if (selectedAgent && selectedAgent._id === agentId) {
                setSelectedAgent(prev => ({ ...prev, isVerified: action === 'verify' }))
            }
        } catch (error) {
            console.error(`Error ${action}ing agent:`, error)
          
        } finally {
            setActionLoading(false)
        }
    }

    const fetchRef = useRef(false)
    useEffect(() => {
        if (fetchRef.current) return
        fetchRef.current = true
        fetchAgents()
    }, [fetchAgents])

    const filteredAgents = agents.filter(agent =>
        agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
        </div>
    )

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800 font-dm-serif-display">Agent Management</h2>
                    <p className="text-xs text-gray-400 font-work-sans">Manage your team and their system permissions</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <FontAwesomeIcon icon={faSearch} size="sm" />
                        </span>
                        <input
                            type="text"
                            placeholder="Find agent..."
                            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold sm:text-sm font-work-sans"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-all relative group overflow-hidden">
                        <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-widest ${agent.isVerified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {agent.isVerified ? 'Active' : 'Pending Verification'}
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <div className="w-16 h-16 rounded-full bg-slate-100 shrink-0 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                                {agent.profileImage ? (
                                    <Image width={64} height={64} src={agent.profileImage} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xl font-bold text-slate-300 uppercase">{agent.name?.charAt(0)}</span>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-base font-bold text-gray-900 leading-tight">{agent.name || 'Anonymous User'}</h3>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500" />
                                    <span>{agent.role || 'Agent'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                <FontAwesomeIcon icon={faEnvelope} className="w-4 text-gray-300" />
                                <span className="font-work-sans truncate">{agent.email || 'no-email@agent.com'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                <FontAwesomeIcon icon={faPhone} className="w-4 text-gray-300" />
                                <span className="font-work-sans">{agent.phone || '+34 000 000 000'}</span>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col gap-2 border-t border-gray-50">
                            <button
                                onClick={() => setSelectedAgent(agent)}
                                className="w-full py-2 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold hover:bg-gold/10 hover:text-gold transition-all"
                            >
                                <FontAwesomeIcon icon={faSearch} className="mr-1" /> View Details
                            </button>

                            {role === 'admin' && (
                                <div className="flex gap-2">
                                    {!agent.isVerified ? (
                                        <button
                                            disabled={actionLoading}
                                            onClick={() => handleVerifyAction(agent._id, 'verify')}
                                            className="flex-1 py-2 rounded-lg bg-green-50 text-green-600 text-xs font-bold hover:bg-green-100 transition-all disabled:opacity-50"
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <button
                                            disabled={actionLoading}
                                            onClick={() => handleVerifyAction(agent._id, 'reject')}
                                            className="flex-1 py-2 rounded-lg bg-amber-50 text-amber-600 text-xs font-bold hover:bg-amber-100 transition-all disabled:opacity-50"
                                        >
                                            Suspend
                                        </button>
                                    )}
                                    <button className="px-3 py-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-all">
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {filteredAgents.length === 0 && (
                    <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center gap-2">
                        <span className="text-3xl">👥</span>
                        <p className="text-sm text-gray-400 font-medium font-work-sans">No agents found in the system</p>
                    </div>
                )}
            </div>

            
            {selectedAgent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-[#0f172a] p-6 text-white relative">
                            <button
                                onClick={() => setSelectedAgent(null)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                    {selectedAgent.name?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-dm-serif-display">{selectedAgent.name}</h3>
                                    <p className="text-white/50 text-sm capitalize">{selectedAgent.role} Panel Access</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                                    <p className="text-sm text-gray-800 break-all">{selectedAgent.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                                    <p className="text-sm text-gray-800">{selectedAgent.phone || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Professional Bio</p>
                                <p className="text-sm text-gray-600 leading-relaxed italic">
                                    {selectedAgent.bio || 'No bio provided.'}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Office Location</p>
                                <p className="text-sm text-gray-800">{selectedAgent.officeLocation || 'Remote / Not Specified'}</p>
                            </div>

                            <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${selectedAgent.isVerified ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                                        {selectedAgent.isVerified ? 'Verified Agent' : 'Account Pending'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedAgent(null)}
                                    className="px-6 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
