/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { api } from "@/utils/apis/api";
import { useEffect, useState, use, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser, faEnvelope, faPhone, faMapMarkerAlt, faEdit,
    faSave, faTimes, faShieldAlt, faCheckCircle, faTimesCircle,
    faLock, faCamera
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Profile({ params }) {
    const { role } = use(params)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        bio: '',
        phone: '',
        officeLocation: '',
        contactEmail: '',
    })

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await api.get(`${role}/profile`)
            const data = response.data
            setUser(data)
            setForm({
                name: data.name || '',
                email: data.email || '',
                bio: data.bio || '',
                phone: data.phone || '',
                officeLocation: data.officeLocation || '',
                contactEmail: data.contactEmail || data.email || '',
            })
        } catch (error) {
            console.error("Profile Fetch Error:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchRef = useRef(false)
    useEffect(() => {
        if (!role || fetchRef.current) return
        fetchRef.current = true
        fetchData()
    }, [role])

    const handleSave = async () => {
        setSaving(true)
        try {
            await api.put(`${role}/profile`, form)
            setSaveSuccess(true)
            setEditing(false)
            fetchData()
            setTimeout(() => setSaveSuccess(false), 3000)
        } catch (error) {
            console.error("Profile Update Error:", error)
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCancel = () => {
        setEditing(false)
        if (user) {
            setForm({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                phone: user.phone || '',
                officeLocation: user.officeLocation || '',
                contactEmail: user.contactEmail || user.email || '',
            })
        }
    }

    const initials = (name) => {
        if (!name) return '?'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    if (loading) return (
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#B89758]"></div>
                <p className="text-sm font-medium text-gray-400">Loading profile...</p>
            </div>
        </div>
    )

    return (
        <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'DM Serif Display, serif' }}>My Profile</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Manage your personal information and settings</p>
                </div>
                {saveSuccess && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <span>Profile updated!</span>agen
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-1 space-y-6">
                    
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center space-y-4">
                        <div className="relative group">
                            <div className="w-28  h-28 rounded-2xl bg-linear-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center text-white text-3xl font-bold shadow-lg" style={{ fontFamily: 'DM Serif Display, serif' }}>
                                {user?.profileImage ? (
                                    <Image width={112} height={112} src={user.profileImage} alt="" className="w-full h-full object-cover rounded-2xl" />
                                ) : initials(form.name || user?.name)}
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#B89758] rounded-lg flex items-center justify-center text-white shadow-md hover:bg-[#B89758]/90 transition-all translate-x-1 translate-y-1">
                                <FontAwesomeIcon icon={faCamera} className="text-xs" />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'DM Serif Display, serif' }}>{form.name || 'No Name Set'}</h2>
                            <div className="flex items-center justify-center gap-1.5 mt-1">
                                <span className="text-xs text-gray-400 capitalize font-medium">{role}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tight ${user?.isVerified ? 'text-green-600' : 'text-amber-600'}`}>
                                    <FontAwesomeIcon icon={user?.isVerified ? faCheckCircle : faTimesCircle} />
                                    {user?.isVerified ? 'Verified' : 'Pending'}
                                </div>
                            </div>
                        </div>
                        <div className="w-full pt-2 border-t border-gray-50 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <FontAwesomeIcon icon={faEnvelope} className="w-3 text-gray-300" />
                                <span className="truncate">{form.email || 'No email set'}</span>
                            </div>
                            {form.phone && (
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <FontAwesomeIcon icon={faPhone} className="w-3 text-gray-300" />
                                    <span>{form.phone}</span>
                                </div>
                            )}
                            {form.officeLocation && (
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 text-gray-300" />
                                    <span>{form.officeLocation}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#0f172a] rounded-2xl p-5 text-white">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-xl bg-[#B89758] flex items-center justify-center">
                                <FontAwesomeIcon icon={faShieldAlt} className="text-white text-sm" />
                            </div>
                            <div>
                                <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Access Level</p>
                                <p className="text-sm font-bold capitalize">{role} Panel</p>
                            </div>
                        </div>
                        <p className="text-[11px] text-white/40 leading-relaxed">Your account has {role}-level access to the Soleil d&#39;Espagne management system.</p>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                            <div>
                                <h3 className="text-base font-bold text-gray-800" style={{ fontFamily: 'DM Serif Display, serif' }}>Personal Information</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Update your account details and public profile</p>
                            </div>
                            {!editing ? (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded-xl hover:bg-[#B89758]/10 hover:text-[#B89758] transition-all"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                    Edit
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-100 transition-all"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#B89758] text-white text-xs font-bold rounded-xl hover:bg-[#B89758]/90 transition-all disabled:opacity-70"
                                    >
                                        <FontAwesomeIcon icon={faSave} />
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            placeholder="Your full name"
                                            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#B89758] focus:border-[#B89758] disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            placeholder="your@email.com"
                                            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#B89758] focus:border-[#B89758] disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            placeholder="+34 000 000 000"
                                            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#B89758] focus:border-[#B89758] disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Contact Email</label>
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={form.contactEmail}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            placeholder="public@email.com"
                                            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#B89758] focus:border-[#B89758] disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Office Location</label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                                    <input
                                        type="text"
                                        name="officeLocation"
                                        value={form.officeLocation}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        placeholder="e.g. Alicante, Spain"
                                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#B89758] focus:border-[#B89758] disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                    />
                                </div>
                            </div>

           
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Professional Bio</label>
                                <textarea
                                    name="bio"
                                    value={form.bio}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    rows={4}
                                    placeholder="Write a short bio about yourself..."
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#B89758] focus:border-[#B89758] disabled:bg-gray-50 disabled:text-gray-500 transition-all resize-none"
                                />
                                {editing && <p className="text-[10px] text-gray-400 mt-1">{form.bio.length}/300 characters</p>}
                            </div>
                        </div>
                    </div>

               
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-50">
                            <h3 className="text-base font-bold text-gray-800" style={{ fontFamily: 'DM Serif Display, serif' }}>Security</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Manage your password and account security settings</p>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#B89758]/30 transition-all group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#B89758]/10 transition-colors">
                                        <FontAwesomeIcon icon={faLock} className="text-gray-400 group-hover:text-[#B89758] transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Change Password</p>
                                        <p className="text-xs text-gray-400">Update your login credentials</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#B89758] opacity-0 group-hover:opacity-100 transition-all">Update →</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}