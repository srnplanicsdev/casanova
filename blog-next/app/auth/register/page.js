"use client"
import api from "@/app/utils/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().min(6).required(),
  confirmpassword: yup
    .string()
    .min(6)
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
})

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await api.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmpassword,
      })
      router.push('/auth/login')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1 text-center">
          Register
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-center mb-8">Sign UP to account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="name"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmpassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              {...register("confirmpassword")}
              type="password"
              placeholder="••••••••"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {errors.confirmpassword && <span className="text-sm text-red-600">{errors.confirmpassword.message}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? 'Signing Up...' : 'Sign UP'}
          </button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
            Already an user?
            <span
              onClick={() => router.push('/auth/login')}
              className="text-blue-600 hover:underline cursor-pointer font-medium ml-1"
            >
              login
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
