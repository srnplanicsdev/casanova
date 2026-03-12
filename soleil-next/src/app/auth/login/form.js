'use client'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/utils/apis/api"
import { getUserRole } from "@/utils/auth"

export default function LoginForm() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const router = useRouter()
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }))
    }
    const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validate()

    if (Object.keys(errors).length === 0) {
        const res = await api.post("/auth/login", form)

        if (res.data.token) {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("refresh_token", res.data.refreshToken)
            router.push(`/${getUserRole(res.data.token)}/dashboard`)
        }
    }
}
    const validate = () => {
        const errors = {}
        if (!form.email) {
            errors.email = "Email is required"
        }
        if (!form.password) {
            errors.password = "Password is required"
        }
        setErrors(errors)
        return errors
    }
    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <div className="flex flex-col items-center justify-center w-1/4 bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border border-gray-300 rounded-md p-2" />
                        <p className="text-red-500 leading-tight text-sm">{errors.email}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="border border-gray-300 rounded-md p-2" />
                        <p className="text-red-500 leading-tight text-sm">{errors.password}</p>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded-md">Login</button>
                </form>
                <p className="text-gray-500 leading-tight mt-4 text-sm"> Don&apos;t have an account? <Link href="/auth/register" className="text-blue-500">Register</Link></p>
            </div>
        </div>
    )
}