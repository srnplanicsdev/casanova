/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/utils/useLanguage";
import axios from "axios";
import Image from "next/image";
import { crmApi } from "@/utils/apis/api";
import RegionSkeleton from "./skeletons/RegionSkeleton";
export default function Region() {
    const [region, setRegion] = useState([]);
    const [loading, setLoading] = useState(true);

    const regionImage = useMemo(() => [
        { image: "/assets/media/images/zonas/o_1jdupnacurdo1jl6e63qvb1dakc.jpg" },
        { image: "/assets/media/images/zonas/o_1jdupnhf31fp6v6o1q7u1b8b1alpc.jpg" },
        { image: "/assets/media/images/zonas/o_1jebkg3j5dcrjsg1bef1ve91botc.jpg" }
    ], [])
    const { t, getLanguage } = useLanguage()


    const fetchRegions = async () => {
        setLoading(true);
        try {
            const response = await crmApi.get('/posts&user=6765ef9d6aac6f782a03b64f&post_type=location-group-wise-properties&site_id=227&page-size=10');
            const { data } = response;
            setRegion(data.map((item, index) => ({
                ...item,
                image: regionImage[index]?.image
            })))
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchRegions();
    }, []);

    if (loading) return <RegionSkeleton />;
    return (

        <div className="container mx-auto px-4 py-12">
            <h2
                className="text-3xl md:text-4xl lg:text-5xl font-dm-serif-display font-semibold italic text-center text-gray-800 mb-10">
                {t("regions.regions")} <span className="text-gold">{t("regions.discover")}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                {region.slice(0, 3).map((region) => (
                    <div key={region._id} className="font-dm-serif-display">
                        <div className="block relative z-10 no-underline hover:bg-white/60 group">
                            <div className="relative h-full overflow-hidden">
                                {region.image ? (
                                    <Image width={500} height={500} src={region.image} alt={region.title[getLanguage.toUpperCase()]}
                                        className="w-full h-full group-hover:opacity-50 object-cover transition-opacity duration-300" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">No Image</span>
                                    </div>
                                )}

                                <div
                                    className="absolute bottom-5 left-5 right-5 p-8 group-hover:bg-gold bg-white/60 z-20 text-center text-gray-800 group-hover:text-white transition-all duration-300 ease-in-out">
                                    <h3 className="text-xl md:text-2xl font-medium">
                                        <span className="group-hover:text-white text-3xl font-bold italic text-gold">{region.title[getLanguage.toUpperCase()]}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}