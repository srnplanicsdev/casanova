'use client'
import { useState, useEffect } from 'react'
import { useWebSocket } from '@/hooks/useWebsocket'
import { api } from '@/utils/apis/api'

export default function VerificationPage() {
    const [status, setStatus] = useState([])
    const [token, setToken] = useState(null)
    const { messages } = useWebSocket(token)

    const log = (msg) => setStatus(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])

    const registerAdmin = async () => {
        try {
            log('Attempting to register admin via console injection style...')
            // We use the same fetch as the one I planned for the console
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: "Auto Admin",
                    email: "auto_admin@example.com",
                    password: "password123",
                    role: "admin",
                    phone: "1112223333"
                })
            })
            const data = await res.json()
            log(`Register Admin Result: ${JSON.stringify(data)}`)
        } catch (e) {
            log(`Error: ${e.message}`)
        }
    }

    const loginAdmin = async () => {
        try {
            const res = await api.post('/auth/login', {
                email: 'auto_admin@example.com',
                password: 'password123'
            })
            if (res.data.token) {
                setToken(res.data.token)
                localStorage.setItem('token', res.data.token)
                log('Admin Logged In. Token set.')
            }
        } catch (e) {
            log(`Login Error: ${e.message}`)
        }
    }

    const triggerNotify = async () => {
        try {
            log('Triggering notification via dummy request (approving non-existent property)...')
            // This will trigger notifyAdmins in createProperty if we just create one
            const res = await api.post('/properties', {
                title: "Test Property",
                description: "Test",
                price: 1000,
                location: "65e8a5a5...", // dummy, might fail validation but should trigger notify before or after
                type: "Residential"
            })
            log('Property create triggered.')
        } catch (e) {
            log(`Trigger Error: ${e.message} (expected if validation fails but check WS)`)
        }
    }

    useEffect(() => {
        if (messages.length > 0) {
            log(`WS MESSAGE RECEIVED: ${JSON.stringify(messages[messages.length-1])}`)
        }
    }, [messages])

    return (
        <div className="p-10 font-mono text-sm">
            <h1 className="text-2xl font-bold mb-6">WebSocket Verification Dashboard</h1>
            <div className="flex gap-4 mb-8">
                <button onClick={registerAdmin} className="bg-black text-white px-4 py-2 rounded">1. Register Admin</button>
                <button onClick={loginAdmin} className="bg-blue-600 text-white px-4 py-2 rounded">2. Login & Connect WS</button>
                <button onClick={triggerNotify} className="bg-green-600 text-white px-4 py-2 rounded">3. Trigger Notification</button>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-xl min-h-[300px]">
                <h2 className="font-bold border-b mb-4">Logs:</h2>
                {status.map((s, i) => <div key={i} className="mb-1">{s}</div>)}
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded">
                <strong>Current Token:</strong> {token ? 'Present' : 'None'} <br/>
                <strong>WS Messages:</strong> {messages.length}
            </div>
        </div>
    )
}
