'use client'
import { api } from "@/utils/apis/api"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
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
            try {
                await api.post("/auth/register", form)
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                })
                router.push("/auth/login")
            } catch (error) {
                console.error(error)
            }
        }
    }
    const validate = () => {
        const errors = {}
        if (!form.name) {
            errors.name = "Name is required"
        }
        if (!form.email) {
            errors.email = "Email is required"
        }
        if (!form.phone) {
            errors.phone = "Phone is required"
        }
        if (!form.phone.match(/^[0-9]{10}$/)) {
            errors.phone = "Phone number is invalid"
        }
        if (!form.password) {
            errors.password = "Password is required"
        }
        if (!form.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required"
        }
        if (form.password !== form.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }
        setErrors(errors)
        return errors
    }
    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <div className="flex flex-col items-center justify-center w-1/4 bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2">
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border border-gray-300 rounded-md p-2" />
                        <p className="text-red-500 leading-tight text-sm">{errors.name}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border border-gray-300 rounded-md p-2" />
                        <p className="text-red-500 leading-tight text-sm">{errors.email}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border border-gray-300 rounded-md p-2" />
                        <p className="text-red-500 leading-tight text-sm">{errors.phone}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="border border-gray-300 rounded-md p-2" />
                        <p className="text-red-500 leading-tight text-sm">{errors.password}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="border border-gray-300 rounded-md p-2" />
                        <p className="text-red-500 leading-tight text-sm">{errors.confirmPassword}</p>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded-md">Register</button>
                </form>
                <p className="text-gray-500 leading-tight mt-4 text-sm">Already have an account? <Link href="/auth/login" className="text-blue-500">Login</Link></p>
            </div>
        </div>
    )
}