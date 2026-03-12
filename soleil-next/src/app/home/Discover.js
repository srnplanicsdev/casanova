/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { crmApi } from "@/utils/apis/api";
import { useEffect, useState } from "react";
import { useLanguage } from "@/utils/useLanguage";
import Image from "next/image";
import DiscoverSkeleton from "./skeletons/DiscoverSkeleton";
export default function Discover() {
    const [discover, setDiscover] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t, getLanguage } = useLanguage();
    const fetchDiscover = async () => {
        setLoading(true);
        try {
            const response = await crmApi.get('/posts&user=6765ef9d6aac6f782a03b64f&post_type=Magic of the Costa Blanca&site_id=227&page-size=10');
            const { data } = response;
            setDiscover(data[0]);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDiscover();
    }, []);
    return (
        <div>
            {loading ? (
                <DiscoverSkeleton />
            ) : (
                <div className="max-lg:container max-lg:mx-auto max-lg:px-4 mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="order-2 md:order-1">
                            <div className="w-full lg:px-20 lg:ps-42 pb-5 text-base font-light font-work-sans gap-4 flex flex-col">
                                <h1 className="text-3xl md:text-5xl font-dm-serif-display font-bold text-gold my-4 md:my-8">
                                    <em className="text-gray-800">{t("discover.discover")} </em>
                                    {t("discover.with-soleildespagne")}
                                </h1>
                                <div className="text-gray-800 text-justify" dangerouslySetInnerHTML={{ __html: discover.content[getLanguage.toUpperCase()] || "" }}></div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 w-full h-full">
                            <Image height={570} width={960} src="/assets/media/images/news/o_1i7vieeja36le4eu11hef1u1tc.jpg" alt=""
                                className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}