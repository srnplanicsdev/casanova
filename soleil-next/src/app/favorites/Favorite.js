 
'use client'

import PropertyCard from "@/components/PropertyCard";
import { useFavorite } from "@/context/FavoriteContext";
import { useLanguage } from "@/utils/useLanguage";
import Link from "next/link";
import { useState, useEffect } from "react";
import FavoriteSkeleton from "./FavoriteSkeleton";

export default function Favorite() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { favorites, removeFavorites, removeAllFavorites } = useFavorite()
    const { t } = useLanguage()

    useEffect(() => { setMounted(true) }, [])

    if (!mounted) return <FavoriteSkeleton />;
    return (<>
        <div>
            <div className="pt-30 flex flex-col items-center justify-center px-4">
                <span className="text-2xl md:text-3xl text-gray-800 font-semibold font-dm-serif-display text-center">{
                    t("favorites")}</span>
                <div className="text-lg md:text-xl text-gold font-normal font-work-sans uppercase text-center">{
                    t("favorites-page.found")}
                    {t("properties")}</div>

                <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 mt-10 w-full sm:w-auto">
                    <button
                        className="bg-white uppercase w-full sm:w-64 md:w-80 text-red-500 border hover:bg-red-500 hover:text-white border-red-500 py-3 md:py-4 px-10"
                        onClick={() => setIsDialogOpen(true)} >
                        {t("favorites-page.remove-all-favorites")}
                    </button>
                    {isDialogOpen && (
                        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white w-full sm:w-100 max-w-lg rounded-2xl shadow-lg" onClick={stop}>
                                <div className="flex flex-col bg-gold/10 px-6 py-3 ">

                                    <div className="text-xl font-normal flex justify-center">{
                                        t("favorites-page.remove-all-favorites")}?</div>
                                    <div className="flex justify-center gap-5 mt-10">
                                        <button onClick={() => setIsDialogOpen(false)}
                                            className=" bg-blue-500 rounded-md  px-5 font-light text-white text-xl py-2"><font-awesome-icon
                                                icon="fa-solid fa-xmark" />{t("favorites-page.cancel")}</button>
                                        <button onClick={() => {
                                            removeAllFavorites();
                                            setIsDialogOpen(false);
                                        }}
                                            className=" bg-red-500 rounded-md  px-5 font-light  text-white text-xl py-2"><font-awesome-icon
                                                icon="fa-solid fa-check" />{t("favorites-page.confirm")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <button onClick={() => setOpenModal(true)}
                        className="bg-gold uppercase w-full sm:w-64 md:w-80 text-white border hover:bg-gold/80 hover:text-black border-gold py-3 md:py-4 px-10">{
                            t("favorites-page.send-properties")}</button>
                </div>
                {openModal && (
                    <div onClick={() => setOpenModal(false)}
                        className="fixed inset-0 backdrop-blur-sm  bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white w-full sm:w-125 max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto  transform from-top-0 to-bottom-0 transition-all duration-300 ease-in-out"
                            onClick={stop}>
                            <div className="flex justify-between bg-gold/10 px-6 py-3 items-center">

                                <div className="text-xl font-normal">{t("favorites-page.send-properties")}</div>
                                <button onClick={() => setOpenModal(false)} className=" font-light text-2xl py-2"><font-awesome-icon
                                    icon="fa-solid fa-xmark" /></button>
                            </div>
                            <div className="p-6">
                                <div className="mt-2">
                                    <label htmlFor="name" className="text-gray-400 uppercase text-sm">{t("about-card.name") +
                                        "*"}</label>
                                    <input type="text" name="name" className="border border-gray-300 rounded w-full p-2"
                                        placeholder={t('about-card.name')} />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="email" className="text-gray-400 uppercase text-sm">{t("about-card.email") +
                                        "*"}</label>
                                    <input type="email" name="email" className="border border-gray-300 rounded w-full p-2"
                                        placeholder={t('about-card.email')} />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="message" className="text-gray-400 uppercase text-sm">{t(
                                        "about-card.message")}</label>
                                    <textarea name="message" id="" cols="30" rows="3" placeholder={t('about-card.message')}
                                        className="border border-gray-300 rounded w-full p-2" />
                                </div>
                                <div className="mt-4">
                                    <label className="group flex  items-start cursor-pointer">
                                        <input type="checkbox" className="sr-only" />
                                        <span
                                            className="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-black group-has-checked:border-black transition duration-300 ease-in-out">
                                            <svg className="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <p className="text-xs text-start w-full ps-3 text-gray-700 ">
                                            {t("about-card.about-the-policy")}<span className="underline font-medium">{
                                                t("about-card.privacy-policy")}</span>.
                                            {t("about-card.information")}
                                        </p>
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <textarea className=" w-full appearance-none text-xs bg-gray-50 border border-gray-200" rows="2"
                                        value={t("about-card.policy")} readOnly />
                                </div>
                            </div>
                            <div className="flex justify-end bg-gold/10 px-6 py-3">
                                <button
                                    className="bg-gold uppercase w-40 text-white border hover:bg-gold/80 hover:text-black border-gold py-4 px-5">{t("favorites-page.send")}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {(favorites.length > 0) ? (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 container mx-auto px-4">
                    {favorites.map((favorite) => (
                        <Link key={favorite._id} href={`/property/${favorite._id}`}>
                            <PropertyCard cardData={favorite} />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="my-20 md:my-50 flex items-center justify-center px-4">
                    <p className="text-xl md:text-2xl text-gray-800 font-light font-work-sans text-center">{
                        t("favorites-page.no-properties-found")
                    }</p>
                </div>)}
        </div>
    </>
    );
}