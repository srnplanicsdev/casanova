"use client"

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../utils/useLanguage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFavorite } from "../context/FavoriteContext";
export default function Navbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const { languages, currentLanguage, setLanguage, t } = useLanguage();
    const {favorites} = useFavorite();
    const propertiesDropdown = useMemo(() => [
        { label: t("view-all-properties"), name: "/properties" },
        { label: t("new-build"), name: "/properties?status=New Build" },
        { label: t("resale"), name: "/properties?status=Resale" }
    ], [t]);

    const leftNavLinks = useMemo(() => [
        { label: t("home"), name: "/home" },
        { label: t("properties"), dropdown: propertiesDropdown },
        { label: t("about-us"), name: "/about-us" },
        { label: t("sell-with-us"), name: "/sell-with-us" },
    ], [t, propertiesDropdown]);

    const rightNavLinks = useMemo(() => [
        { label: t("services"), name: "/services" },
        { label: t("testimonials"), name: "/testimonials" },
        { label: t("contact"), name: "/contact" },
    ], [t]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const toggleLanguage = () => {
        setIsLanguageOpen(!isLanguageOpen);
    }

    const router = useRouter();
    const selectLanguage = (code) => {
        setLanguage(code);
        setIsLanguageOpen(false);
        router.refresh();
    }

    const getFlagUrl = ((code) => (`/assets/website/flags-rounded/${code}.svg`));

    return (
        <header
            className="sticky top-0 left-0 z-40 w-full h-24 bg-white font-work-sans font-medium text-sm tracking-[1.4px] shadow-sm">
            <div className="xl:block absolute top-2 left-1/2 flex items-center -translate-x-1/2 cursor-pointer">
                <Image width={200} height={80} src="/assets/img/sde-no_bg-web.png" alt="Soleildespagne"
                    className="h-20 object-contain hidden xl:block" />
            </div>

            <div className="h-full w-full">
                <div className="flex items-center justify-between xl:justify-center h-full px-4 container mx-auto">
                    <div className="xl:hidden">
                        <Image width={100} height={100} src="/assets/img/sde-no_bg-web.png" alt="Soleildespagne"
                            className="h-16 object-contain" />
                    </div>
                    <button onClick={toggleMobileMenu} className="xl:hidden p-2 text-gray-700 hover:text-gold focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>

                    <div className="hidden xl:flex justify-between w-full max-w-330 items-center space-x-4">
                        <nav className="flex space-x-6 gap-4 items-center">
                            {leftNavLinks.map((link, inx) => (
                                <div key={inx}>
                                    {link.dropdown ? <div className="relative group" onMouseEnter={() => setIsPropertiesOpen(true)}
                                        onMouseLeave={() => setIsPropertiesOpen(false)}>
                                        <button className="text-gray-700 hover:text-gold uppercase flex items-center gap-1">
                                            {link.label}
                                            <font-awesome-icon icon="fa-solid fa-chevron-down" classNameName={`text-xs transition-transform duration-300 ${isPropertiesOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isPropertiesOpen && <div className="absolute left-0 pt-2 w-56 z-9999" >
                                            <ul className="bg-gold border border-gold rounded-md shadow-lg overflow-hidden">
                                                {link.dropdown.map((item) => (
                                                    <li key={item.name}>
                                                        <Link href={item.name}
                                                            className="block px-4 py-3 text-white transition-all duration-300 hover:bg-white hover:text-gold uppercase font-semibold text-xs">
                                                            {item.label}
                                                        </Link>
                                                    </li>))}
                                            </ul>
                                        </div>}
                                    </div> : <Link href={link.name} className="text-gray-700 uppercase hover:text-gold"
                                        active-classname="text-gold! ">{link.label}</Link>}
                                </div>))}
                        </nav>

                        <div className="flex gap-8 items-center">
                            {rightNavLinks.map((link) => (<Link href={link.name} key={link.name} className="text-gray-700 uppercase hover:text-gold"
                                active-classname="text-gold!">
                                {link.label}
                            </Link>))}

                            <Link href="/favorites" className="relative inline-block hover:scale-110 transition-transform">
                                <Image width={100} height={100} src="/assets/website/icon-favorites-header.svg" alt="favorites" className="inline-block h-6 w-6" />
                                {favorites.length > 0 && <span
                                    className="absolute -top-1 -right-1 inline-flex h-4 w-4 rounded-full bg-red-500 text-[10px] text-white justify-center items-center">{favorites.length}</span>}
                            </Link>

                            <div className="relative inline-block">
                                <button onClick={toggleLanguage}
                                    className="p-1 rounded-full focus:outline-none hover:shadow-md transition-all">
                                    <Image width={100} height={100} src={getFlagUrl(currentLanguage.flag)} alt={currentLanguage.name}
                                        className="h-6 w-6 object-cover rounded-full" />
                                </button>
                                {isLanguageOpen && <ul className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    {languages.map((lang) => (<li key={lang.code}>
                                        <button onClick={() => selectLanguage(lang.code)}
                                            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left">
                                            <Image width={100} height={100} src={getFlagUrl(lang.flag)} alt={lang.name} className="h-5 w-5 mr-2 rounded-full" />
                                            {lang.name}
                                        </button>
                                    </li>))}
                                </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="fade">
                {isMobileMenuOpen && <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 overflow-y-auto xl:hidden">
                    <nav className="flex flex-col gap-6 text-center">
                        {leftNavLinks.map((link) => (
                            <div key={link.name}>
                                {link.dropdown ?
                                    <div className="flex flex-col gap-4">
                                        <span className="text-gold font-bold uppercase border-b pb-2">{link.label}</span>
                                        {link.dropdown.map((item) => (
                                            <Link key={item.name} href={item.name}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-xl font-semibold text-gray-800">
                                                {item.label}
                                            </Link>))}
                                    </div> :
                                    <Link href={link.name} onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-xl font-semibold text-gray-800 hover:text-gold">{link.label}
                                    </Link>
                                }
                            </div>))}
                        <hr className="border-gray-200" />
                        {rightNavLinks.map((link) => (
                            <Link key={link.name} href={link.name} onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-semibold text-gray-800 hover:text-gold">
                                {link.label}
                            </Link>))}
                    </nav>
                    <div className="mt-8 flex justify-center gap-6 ">
                        <Link href={'/favorites'} onClick={() => setIsMobileMenuOpen(false)}
                            className="flex justify-center items-center gap-2 text-gray-800">
                            <span className="text-xl font-semibold">{t("favorites")}</span>
                            {favorites.length > 0 && <span className="bg-red-500 text-white rounded-full px-2 text-xs">{favorites.length}</span>}
                        </Link>
                    </div>
                </div>}
            </div>
        </header>
    )
}
