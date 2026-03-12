/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/utils/useLanguage";
import { useRouter } from "next/navigation";
import { crmApi } from "@/utils/apis/api";
import AgentSkeleton from "./skeletons/AgentSkeleton";

export default function Agent() {
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t, getLanguage } = useLanguage();
    const router = useRouter();
    const fetchAgent = async () => {
        setLoading(true);
        try {
            const response = await crmApi.get('/posts&user=6765ef9d6aac6f782a03b64f&post_type=Your reliable agent&site_id=227&page-size=10');
            const data = await response.data;
            setAgent(data[0]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchAgent();
    }, []);
    return (
        <div>
            {loading ? (
                <AgentSkeleton />
            ) : (
                <div className="bg-gold/10 py-10 mt-20">
                    <div className="max-lg:container max-lg:mx-auto max-lg:px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                            <div className="w-full h-full lg:pr-40">
                                <Image width={780} height={720} src="/assets/media/images/website/martyna-kaminska.jpg" alt=""
                                    className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="w-full lg:pr-40 text-base font-light font-work-sans">
                                    <div className="py-6 md:py-12 gap-4 flex flex-col">
                                        <h2 className="text-lg text-gold font-work-sans font-normal tracking-widest uppercase mt-2 mb-0">
                                            <span className="text-gold">{t("agents.reliable")}</span>
                                        </h2>
                                        <h2 className="text-3xl md:text-5xl italic text-black font-dm-serif-display mb-6 font-bold">
                                            {t("agents.name")}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: agent.content[getLanguage.toUpperCase()] }}></div>
                                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                                            <button onClick={() => router.push('/about-us')}
                                                className="text-white font-work-sans py-4 px-10 md:px-20 font-medium text-sm bg-gold hover:bg-gold/80 hover:text-black transition-colors w-full sm:w-auto">
                                                {t("agents.about")}</button>
                                            <Image width={220} height={60} src="/assets/media/images/website/firma-martyna.svg" alt="" className="max-h-12" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}