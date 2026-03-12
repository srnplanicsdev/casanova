'use client'
import axios from "axios"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/utils/useLanguage"
import { crmApi } from "@/utils/apis/api"
import NewPropertyCardSkeleton from "../skeletons/NewPropertyCardSkeleton"

export default function NewPropertyCard() {
    const { getLanguage } = useLanguage()
    const [newProperties, setNewProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const propertiesImage = useMemo(() => [
        {
            image: "/assets/media/images/website/banner-home-01.jpg"
        },
        { image: "/assets/media/images/website/banner-home-02.jpg" },
        { image: "/assets/media/images/website/banner-home-03.jpg" }
    ], [])

    const fetchNewProperties = async () => {
        setLoading(true);
        try {
            const response = await crmApi.get("/posts&user=6765ef9d6aac6f782a03b64f&post_type=Categorywise property&site_id=227&page-size=10")
            const { data } = response
            setNewProperties(data.map((item, index) => ({
                ...item,
                image: propertiesImage[index].image
            })))
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchNewProperties()
    }, [])

    if (loading) return <NewPropertyCardSkeleton />;


    return (
        <div className="mt-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto px-4 gap-4">
            {newProperties.map((property) => (
                <div key={property._id} >
                    <div className="col-md-4 font-dm-serif-display">
                        <Link href={property.link || '/properties'} className="block relative z-1 no-underline hover:bg-white/60 group">
                            <Image width={500} height={500} src={property.image} alt={property.title[getLanguage.toUpperCase()] || property.title["EN"]} className="group-hover:opacity-50 " />
                            <Image width={150} height={150} src="/assets/media/images/website/sde-no_bg-web.png" alt="Logo"
                                className="absolute group-hover:top-12 left-1/2 -translate-x-1/2 opacity-0 transition-all top-0  duration-400 ease-in-out group-hover:opacity-100 h-[92px]" />
                            <div className="absolute bottom-5 left-5 right-5 p-8 group-hover:bg-gold text-xl tracking-[3px] bg-white/60 z-2 text-center text-gray-800 group-hover:text-white transition-all duration-300 ease-in-out">
                                <h3 className="text-xl md:text-2xl font-medium">
                                    <span className="group-hover:text-white text-3xl font-bold italic text-gold">
                                        <div dangerouslySetInnerHTML={{ __html: property.title[getLanguage.toUpperCase()] || property.title["EN"] }}></div>
                                    </span>
                                </h3>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}