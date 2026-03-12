import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { getServerTranslation } from "@/utils/serverTranslation"
import TestimonialCard from "./TestimonialCard"
import { api } from "@/utils/apis/api"

export default async function Testimonials({}) {
    const { t } = await getServerTranslation()

    
    return (
        <div>
            <Navbar />
            <div className="">
                <div className="flex justify-center">
                    <div
                        className="pt-30 bg-[url('/assets/media/images/website/thumbnails/bg-header-testimonials_1920x593.jpg')] brightness-90 w-full h-64 md:h-96 lg:h-[500px] bg-cover bg-center text-center">
                        <h1
                            className="text-3xl md:text-4xl lg:text-5xl flex justify-center items-center not-italic font-bold text-white font-dm-serif-display h-full px-4">
                            {t("testimonials-page.title")}&nbsp; <span className="italic">{t("testimonials-page.subtitle")}</span>
                        </h1>
                    </div>
                </div>

                <div className="mt-12 md:mt-16 lg:mt-20 container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="col-span-1 lg:col-span-8 divide-y divide-gold/50 px-4 md:px-8 lg:px-12">
                            
                                    <TestimonialCard />
                                   
                        </div>
                        <div className="col-span-1 lg:col-span-4">
                            <div className="bg-gold/10 flex items-center flex-col gap-4 py-6 px-4 md:px-8 lg:px-12">
                                <div className="text-4xl font-dm-serif-display font-semibold italic text-gray-800 text-center ">
                                    {t("contact")} <span className="not-italic  text-gold">{t("about-card.us")}</span>
                                </div>
                                <div className="w-full">
                                    <input type="text" className="p-4 bg-white w-full"
                                        placeholder={t('about-card.name') + ' *'} />
                                </div>
                                <div className="w-full">
                                    <input type="text" className="p-4 bg-white w-full"
                                        placeholder={t('about-card.email') + ' *'} />
                                </div>
                                <div className="w-full">
                                    <input type="text" className="p-4 bg-white w-full"
                                        placeholder={t('about-card.phone') + ' *'} />
                                </div>
                                <div className="w-full">
                                    <textarea type="text" className="p-4 bg-white appearance-none w-full"
                                        placeholder={t('about-card.message') + ' *'} />
                                </div>
                                <div className="w-full">
                                    <label className="group flex items-start cursor-pointer">
                                        <input type="checkbox" className="sr-only" />

                                        <span
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-black group-has-checked:border-black transition duration-300 ease-in-out">
                                            <svg className="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <p className="text-xs text-start w-full ps-3 text-gray-700 ">
                                            {t('about-card.about-the-policy')}<span className="underline font-medium">{t('about-card.privacy-policy')}</span>.
                                            {t('about-card.information')}
                                        </p>
                                    </label>
                                </div>
                                <div className="w-full">
                                    <button className="bg-gold text-white py-2 px-6 w-full">{t('about-card.send')}</button>
                                </div>
                                <div className="w-full pb-10">
                                    <textarea name="" id="" className="w-full text-xs" defaultValue={t('about-card.policy')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <Footer />
            </div>
        </div>
    )
}