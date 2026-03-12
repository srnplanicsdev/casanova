"use client"
import api from "@/app/utils/api"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  password: yup.string().min(6).required(),
  confirmpassword: yup
    .string()
    .min(6)
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
})

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await api.post("reset-password", {
        token: searchParams.get('token'),
        email: searchParams.get('email'),
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium dark:text-gray-300 text-gray-700">
              New Password
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
            <div className="flex justify-between items-center">
              <label htmlFor="confirmpassword" className="text-sm font-medium dark:text-gray-300 text-gray-700">
                Confirm Password
              </label>
            </div>
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
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
