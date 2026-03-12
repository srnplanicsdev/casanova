
"use client"
import { api } from "@/utils/apis/api";
import { useLanguage } from "@/utils/useLanguage";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from 'react'
import Link from "next/link"
import Skeleton from "@/components/Skeleton";
export default function TestimonialCard({ }) {
    const { t } = useLanguage()
    const [testimonials, setTestimonials] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [loading, setLoading] = useState(false)
    const getTestimonials = async () => {
        try {
            setLoading(true)
            const responce = await api.get('/testimonials')
            setTestimonials(responce.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }
    const totalPages = () => {
        return Math.ceil(testimonials.length / perPage)
    }
    const paginatedTestimonials = () => {
        const start = (currentPage - 1) * perPage
        const end = start + perPage
        return testimonials.slice(start, end)
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
        if (page > totalPages()) {
            setCurrentPage(totalPages())
        }
    }
    useEffect(() => {
      
        getTestimonials()
    }, [])

    return (
        <>
            {loading ? (
                <div className="space-y-10">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-6 gap-4 w-full py-6 border-b border-gray-100">
                            <div className="col-span-1 flex justify-center sm:justify-start pt-2">
                                <Skeleton className="w-20 h-20 rounded-full" />
                            </div>
                            <div className="col-span-5 flex flex-col gap-3 ps-0 sm:ps-5">
                                <Skeleton className="h-7 w-48" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-5 w-28 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {paginatedTestimonials().map((cardData) => (
                        <div key={cardData._id} className="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-0 w-full">
                            <div className="col-span-1 flex justify-center sm:justify-start pt-5">
                                <Image width={100} height={100} className="w-20 h-20 sm:w-25 sm:h-25 rounded-full" src={cardData.image} alt="" />
                            </div>
                            <div className="col-span-1 sm:col-span-5 flex flex-col gap-4 ps-0 sm:ps-5 text-center sm:text-left">
                                <div className="text-xl md:text-2xl font-bold font-dm-serif-display italic">
                                    {cardData.name}
                                </div>
                                <div className="text-sm md:text-base font-work-sans line-clamp-3 font-light">
                                    {cardData.message}
                                </div>
                                <div className="mt-4">
                                    <Link href={`/testimonials/${cardData.slug}`}
                                        className="uppercase rounded-full flex items-center text-sm md:text-base">
                                        {t("testimonials-page.read-more")} <span className="ps-2 text-gold font-light"><ChevronRight /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center items-center my-10 gap-3 font-dm-serif-display">
                        {Array.from({ length: totalPages() }, (_, i) => (
                            <button key={i} className={`bg-gold/10  text-gold h-8 w-8 rounded-full ${currentPage === i + 1 ? 'bg-gold! text-white!' : ''}`}
                                onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                        ))}
                        <button onClick={() => handlePageChange(currentPage + 1)} className="bg-gold/10 text-gold flex justify-center items-center h-8 w-8 rounded-full">
                            <ChevronRight />
                        </button>
                    </div>
                </>
            )}
        </>
    );
}