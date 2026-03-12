"use client"
import api from "@/app/utils/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  email: yup.string().email().required(),
})

export default function ForgotPassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await api.post("forgot-password", {
        email: data.email,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl dark:text-gray-50 font-bold text-gray-900 mb-1 text-center">
          Forgot-Password
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-center mb-8">Reset your password</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium dark:text-gray-300 text-gray-700">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          <div className="text-center text-sm dark:text-gray-300 text-gray-600 mt-6">
            Not a user?
            <span
              onClick={() => router.push('/auth/register')}
              className="text-blue-600 hover:underline cursor-pointer font-medium ml-1"
            >
              Create an account
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
