/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { api } from "@/utils/apis/api";
import { useEffect, useState, use,useRef } from "react";
import BarChart from "../componant/BarChart";
import LineChart from "../componant/LineChart";

export default function Dashboard({ params }) {
    const { role } = use(params)
    const [chartData, setChartData] = useState(null)
    const [properties, setProperties] = useState([])
    const [agents, setAgents] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        console.log(`[Dashboard] fetchData called for role: ${role}`);
        setLoading(true)
        try {
            const requests = [api.get(`${role}/properties`),api.get(`${role}/profile`)];
            if (role === 'admin') {
                requests.push(api.get(`${role}/agents`));
                requests.push(api.get(`${role}/users`));
            }

            const results = await Promise.all(requests);

            const propsData = results[0].data || [];
            setProperties(propsData);

            let agentsCount = 0;
            let usersCount = 0;

            if (role === 'admin') {
                const agentsData = results[2].data || [];
                const usersData = results[3].data || [];
                setAgents(agentsData);
                setUsers(usersData);
                agentsCount = agentsData.length;
                usersCount = usersData.length;
            }

            const data = {
                labels: role === 'admin' ? ['Properties', 'Users', 'Agents'] : ['My Properties'],
                datasets: [
                    {
                        label: 'Internal Data',
                        data: role === 'admin' ? [propsData.length, usersCount, agentsCount] : [propsData.length],
                        backgroundColor: [
                            'rgba(184, 151, 88, 0.7)', 
                            'rgba(15, 23, 42, 0.7)',  
                            'rgba(53, 162, 235, 0.7)', 
                        ],
                        borderColor: [
                            '#B89758',
                            '#0f172a',
                            '#35a2eb',
                        ],
                        borderWidth: 1,
                    },
                ],
            }
            setChartData(data)
        } catch (error) {
            console.error("Dashboard Fetch Error:", error)
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

    if (loading || !chartData) return (
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
                <p className="text-sm font-medium text-gray-400 font-work-sans">Loading dashbord data...</p>
            </div>
        </div>
    )

    const stats = [
        { label: role === 'admin' ? 'Total Properties' : 'My Properties', count: properties.length, icon: '🏠', color: 'bg-blue-500' },
        ...(role === 'admin' ? [
            { label: 'Total Agents', count: agents.length, icon: '👥', color: 'bg-gold' },
            { label: 'System Users', count: users.length, icon: '👤', color: 'bg-slate-800' },
        ] : []),
    ]

    return (
        <div>
            {role === 'agent' &&  (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-gray-800 font-dm-serif-display">Dashboard</h2>
                        <p className="text-sm text-gray-400 font-work-sans">Welcome to your dashboard</p>
                    </div>
                </div>
            )}
        <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
           
            <div className={`grid grid-cols-1 ${role === 'admin' ? 'md:grid-cols-3' : 'md:grid-cols-1'} gap-6`}>
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md group">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider font-work-sans">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 font-dm-serif-display">{stat.count}</p>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white text-2xl shadow-lg transition-transform group-hover:scale-110`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-gray-800 font-dm-serif-display">Overall Distribution</h2>
                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold tracking-widest uppercase">Live Data</span>
                    </div>
                    <div className="h-[320px]">
                        <BarChart chartData={chartData} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-gray-800 font-dm-serif-display">System Growth</h2>
                        <span className="text-[10px] bg-green-50 px-2 py-1 rounded text-green-600 font-bold tracking-widest uppercase">Target Achieved</span>
                    </div>
                    <div className="h-[320px]">
                        <LineChart
                            title="Monthly Activity"
                            chartData={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                                data: [properties.length * 0.4, properties.length * 0.6, properties.length * 0.5, properties.length * 0.8, properties.length * 0.9, properties.length]
                            }}
                            color="#B89758"
                        />
                    </div>
                </div>
            </div>

           
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800 font-dm-serif-display">Recent Inventory</h2>
                    <button className="text-xs font-bold text-gold hover:underline font-work-sans uppercase tracking-tight">View All Properties</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-work-sans">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest">
                                <th className="px-6 py-4 font-bold">Property Details</th>
                                <th className="px-6 py-4 font-bold">Verification</th>
                                <th className="px-6 py-4 font-bold text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {properties.slice(0, 5).map((prop, i) => (
                                <tr key={i} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-700 group-hover:text-gold transition-colors">{prop.title?.en || prop.title || 'Untitled Property'}</span>
                                            <span className="text-secondary-400 text-xs">
                                                {typeof prop.location === 'object'
                                                    ? `${prop.location?.city || prop.location?.area || 'Costa Blanca'}, ES`
                                                    : (typeof prop.location === 'string' ? prop.location : 'Costa Blanca, ES')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${prop.verificationStatus === 'approved' ? 'bg-green-500' : prop.verificationStatus === 'rejected' ? 'bg-red-500' : 'bg-amber-400 animate-pulse'}`}></div>
                                            <span className={`text-[10px] font-black uppercase tracking-tighter ${prop.verificationStatus === 'approved' ? 'text-green-600' : prop.verificationStatus === 'rejected' ? 'text-red-600' : 'text-amber-600'}`}>
                                                {prop.verificationStatus === 'approved' ? 'Verified' : prop.verificationStatus === 'rejected' ? 'Rejected' : 'Review Required'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right font-bold text-gray-900 border-l border-transparent group-hover:border-gold/20 transition-all">
                                        €{prop.price?.toLocaleString() || 'P.O.A'}
                                    </td>
                                </tr>
                            ))}
                            {properties.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-3xl grayscale opacity-20">📭</span>
                                            <p className="text-sm text-gray-400 font-medium">No active listings in the inventory</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}
