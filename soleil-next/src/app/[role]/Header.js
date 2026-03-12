'use client'
import { usePathname } from "next/navigation"
import { faBell, faBars, faCheckDouble, faCircle, faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useWebSocket } from "@/hooks/useWebsocket"
import { formatDistanceToNow } from "date-fns"

export default function Header({ role, setShowMobile }) {
    const [dropdown, setDropdown] = useState(false)
    const [notifications, setNotifications] = useState([])
    const dropdownRef = useRef(null)
    const path = usePathname()
    
    // Get token for websocket
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const { messages } = useWebSocket(token)

    // Load notifications from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('notifications')
        if (saved) {
            try {
                setNotifications(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse notifications", e)
            }
        }
    }, [])

    // Handle new messages from websocket
    useEffect(() => {
        if (messages.length > 0) {
            const latest = messages[messages.length - 1]
            if (!latest || typeof latest !== 'object' || !latest.id) return
            
            setNotifications(prev => {
                const exists = prev.some(n => n.id === latest.id)
                if (exists) return prev
                const updated = [latest, ...prev].slice(0, 50)
                localStorage.setItem('notifications', JSON.stringify(updated))
                return updated
            })
        }
    }, [messages])

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const segments = path.split("/").filter(Boolean)
    const currentPage = segments[1]
    const pageLabel = currentPage
        ? currentPage.charAt(0).toUpperCase() + currentPage.slice(1)
        : 'Dashboard'

    const unreadCount = notifications.filter(n => !n.read).length

    const markAsRead = (id) => {
        setNotifications(prev => {
            const updated = prev.map(n => n.id === id ? { ...n, read: true } : n)
            localStorage.setItem('notifications', JSON.stringify(updated))
            return updated
        })
    }

    const markAllRead = () => {
        setNotifications(prev => {
            const updated = prev.map(n => ({ ...n, read: true }))
            localStorage.setItem('notifications', JSON.stringify(updated))
            return updated
        })
    }

    const clearAll = () => {
        setNotifications([])
        localStorage.removeItem('notifications')
    }

    return (
        <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setShowMobile(true)}
                    className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
                </button>

                <div className="flex flex-col">
                    <span className="text-[10px] md:text-xs text-slate-400 font-work-sans capitalize tracking-wider leading-none mb-1 font-bold">{role} panel</span>
                    <h1 className="text-base md:text-lg font-bold font-dm-serif-display text-slate-800 leading-tight">{pageLabel}</h1>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setDropdown(!dropdown)} 
                        className={`relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full transition-all duration-300 ${dropdown ? 'bg-gold text-white border-gold' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-100'} border`}
                    >
                        <FontAwesomeIcon icon={faBell} className="h-4 w-4" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white rounded-full border-2 border-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {dropdown && (
                        <div className="absolute top-12 right-0 w-[280px] sm:w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                            <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
                                <h3 className="text-sm font-bold text-slate-800 font-work-sans">Notifications</h3>
                                <div className="flex gap-3">
                                    <button onClick={markAllRead} className="text-[10px] font-bold text-gold hover:text-gold/80 transition-colors uppercase tracking-wider">Mark all read</button>
                                    <button onClick={clearAll} className="text-[10px] font-bold text-slate-400 hover:text-red-400 transition-colors uppercase tracking-wider">Clear</button>
                                </div>
                            </div>
                            
                            <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                                {notifications.length > 0 ? (
                                    notifications.map((n) => (
                                        <div 
                                            key={n.id} 
                                            onClick={() => markAsRead(n.id)}
                                            className={`p-4 border-b border-gray-50 hover:bg-slate-50 transition-all cursor-pointer relative group ${!n.read ? 'bg-gold/5' : ''}`}
                                        >
                                            {!n.read && (
                                                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            )}
                                            <div className="flex flex-col gap-1 pl-2">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gold/60">{n.type?.replace('_', ' ')}</span>
                                                    <span className="text-[9px] text-slate-400 flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faClock} className="text-[8px]" />
                                                        {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}
                                                    </span>
                                                </div>
                                                <h4 className="text-xs font-bold text-slate-800 leading-snug">{n.title}</h4>
                                                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{n.message}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 flex flex-col items-center justify-center opacity-30 grayscale">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                            <FontAwesomeIcon icon={faBell} className="text-2xl" />
                                        </div>
                                        <p className="text-xs font-bold font-work-sans">No notifications yet</p>
                                    </div>
                                )}
                            </div>
                            
                            {notifications.length > 0 && (
                                <div className="p-3 bg-slate-50/30 text-center border-t border-gray-50">
                                    <Link href={`/${role}/notifications`} className="text-[10px] font-bold text-slate-400 hover:text-gold transition-colors uppercase tracking-widest">
                                        View all notifications
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Link href={`/${role}/profile`} className="flex items-center gap-2 group">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-sm md:text-base border border-gold/20 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                        {role?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm font-bold text-slate-700 capitalize font-work-sans group-hover:text-gold transition-colors">{role}</span>
                </Link>
            </div>
        </header>
    )
}
