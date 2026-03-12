/* eslint-disable react-hooks/preserve-manual-memoization */
 
"use client"
import PropertyCard from "@/components/PropertyCard"
import PropertyFilter from "@/components/PropertyFilter"
import { api } from "@/utils/apis/api"
import { useLanguage } from "@/utils/useLanguage"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { useState, useEffect, useMemo } from "react"
import PropertyCardSkeleton from "./PropertyCardSkeleton"

export default function Filter() {
    const [allProperties, setAllProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(12)
    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState("Lowest")

    const { t } = useLanguage()
    const totalPages = () => {
        return Math.ceil(filteredProperties.length / perPage)
    }

    const paginatedProperties = () => {
        const start = (currentPage - 1) * perPage
        const end = start + perPage
        return sortedProperties.slice(start, end)
    }

    const handleFilter = (filtered) => {
        setFilteredProperties(filtered)
        setCurrentPage(1)
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handlePageProperties = (e) => {
        setPerPage(Number(e.target.value))
        setCurrentPage(1)
    }
    const handleSort = (e) => {
        const { value } = e.target
        setSort(value)
    }


const sortedProperties = useMemo(() => {
    let sorted = [...filteredProperties]

    if (sort === 'Lowest') {
        sorted.sort((a, b) => a.price - b.price)
    } else if (sort === 'Highest') {
        sorted.sort((a, b) => b.price - a.price)
    } else {
        sorted.sort((a, b) => b._id.localeCompare(a._id))
    }

    return sorted
}, [filteredProperties, sort])

    useEffect(() => {
        const fetchProperties = async () => {
            
            try {  
                setLoading(true) 
                const res = await api.get("/properties")
                setAllProperties(res.data)
                setFilteredProperties(res.data)
                setLoading(false)
            } catch (err) {
                console.error("Error fetching properties:", err)
                setLoading(false)
            }
        }
        fetchProperties()
    }, [])

    return (
        <div>
            <div className="bg-gold/10 w-full">
                <div className="flex justify-center items-center pt-40 pb-10">
                    <h1 className="text-4xl italic font-bold font-dm-serif-display">
                        <span className="text-gold not-italic">{filteredProperties.length}</span> {t('properties')}
                    </h1>
                </div>

                <div className="pb-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <PropertyFilter filter={handleFilter} filterdProperty={allProperties} />
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="container mt-15">
                    <div className="flex justify-between">
                        <div>
                            <select name="" id="" defaultValue="12" onChange={handlePageProperties}>
                                <option value="12">12 {t('properties')}</option>
                                <option value="24">24 {t('properties')}</option>
                                <option value="36">36 {t('properties')}</option>
                            </select>
                        </div>
                        <div>
                            <span className="font-semibold text-sm pe-4">ORDER BY</span>
                            <select name="" id="" selected="Lowest price" onChange={handleSort}>
                                <option value="Lowest">{t('order-by.lowest-price')}</option>
                                <option value="Highest">{t('order-by.highest-price')}</option>
                                <option value="Latest">{t('order-by.latest-price')}</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-5 place-content-center">
                            {loading ? (
                                Array.from({ length: 12 }).map((_, i) => (
                                    <PropertyCardSkeleton key={i} />
                                ))
                            ) : paginatedProperties().map((property) => (
                                <div key={property._id} className="justify-self-center w-full">
                                    <Link href={`/properties/${property._id}`}>
                                        <PropertyCard cardData={property} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center items-center my-10 gap-3 font-dm-serif-display">
                        {Array.from({ length: totalPages() }, (_, i) => (
                            <button key={i} className={`bg-gold/10  text-gold h-8 w-8 rounded-full ${currentPage === i + 1 ? 'bg-gold! text-white!' : ''}`}
                                onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                        ))}
                        <button className="bg-gold/10 text-gold h-8 w-8 rounded-full">
                            <ChevronRight />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}