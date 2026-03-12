import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Sitemap from "@/components/Sitemap"
import { getServerTranslation } from "@/utils/serverTranslation"
import Image from "next/image"
export default async function Contact() {
    const { t } = await getServerTranslation()
    return(
        <div>
    <Navbar />
    <div>
        <div
            className="bg-[url('/assets/media/images/website/bg-contact-form.jpg')] brightness-90 w-full min-h-screen bg-cover bg-center text-center py-30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white rounded-sm shadow-xl">
                        <div className="bg-gold/10 rounded-sm p-6 md:p-10">
                            <h1
                                className="text-3xl md:text-5xl text-gray-800 italic font-bold font-dm-serif-display text-center">
                                {t('contact')}
                                <span className="text-gold not-italic"> {t("about-card.us")}</span>
                            </h1>
                            <div className="flex flex-col gap-5 mt-10">
                                <input type="text"
                                    className="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                    placeholder={t('about-card.name') + ' *'} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input type="email"
                                        className="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                        placeholder={t('about-card.email') + ' *'} />
                                    <input type="text"
                                        className="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                        placeholder={t('about-card.phone') + ' *'} />
                                </div>

                                <textarea name="" rows="4" placeholder={t('about-card.message') + ' *'}
                                    className="p-4 bg-white appearance-none border border-gray-200 focus:border-gold outline-none transition-colors"/>
                                <div>
                                    <label className="group flex items-start cursor-pointer">
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
                                            {t("about-card.about-the-policy")}<span
                                                className="underline font-medium">{t("about-card.privacy-policy")}</span>.
                                            {t("about-card.information")}
                                        </p>
                                    </label>
                                </div>
                                <button
                                    className="bg-gold text-white py-3 px-10 hover:bg-black transition-colors uppercase font-bold tracking-widest">CONTACT</button>
                                <div>
                                    <textarea
                                        className="p-4 w-full appearance-none text-xs bg-gray-50 border border-gray-200" defaultValue={t("about-card.policy")}
                                        rows="4" readOnly></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="p-6 md:p-10 flex flex-col justify-center bg-black/50 lg:bg-transparent rounded-sm lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
                        <div>
                            <h1
                                className="text-3xl md:text-5xl text-white italic font-bold font-dm-serif-display text-center">
                                 {t("contact")} <span className="not-italic">{t("info")}</span></h1>
                            <div className="flex flex-col text-center gap-8 mt-10">
                                <div>
                                    <h2 className="text-2xl text-white font-semibold font-dm-serif-display">{t("footer.email")}</h2>
                                    <p className="text-xl text-white mt-2 font-work-sans">info@soleildepagne.com</p>
                                </div>
                                <div>
                                    <h2 className="text-2xl text-white font-semibold font-dm-serif-display">{t  ("footer.phone")}</h2>
                                    <p className="text-xl text-white mt-2 font-work-sans">+34 622 919 887 | +48 660 512
                                        460</p>
                                </div>
                                <div>
                                    <h2 className="text-2xl text-white font-semibold font-dm-serif-display">{t("footer.address")}</h2>
                                    <p className="text-xl text-white mt-2 font-work-sans">ALTEA</p>
                                </div>
                                <div>
                                    <h2 className="text-2xl text-white font-semibold font-dm-serif-display">{t("footer.follow-in") }</h2>
                                    <div className="text-2xl text-white mt-3 flex justify-center gap-4">
                                        <font-awesome-icon icon="fa-brands fa-facebook" />
                                        <font-awesome-icon icon="fa-brands fa-twitter" />
                                        <font-awesome-icon icon="fa-brands fa-instagram" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 flex justify-center">
                                <Image width={320} height={60} src="/assets/media/images/website/firma-contact.svg" alt=""
                                    className="h-20 invert brightness-0"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="my-20 px-4">
            <div className="text-3xl md:text-5xl text-gray-800 italic font-bold font-dm-serif-display text-center">{t("find") }
                <span className="not-italic text-gold"> {t("about-card.us")}</span>
            </div>
            <div className="mt-10 container mx-auto">
                <Sitemap title="Find us" address="C. Ifach, 18, 03590 Altea, Alicante" height="500px" />
            </div>
        </div>
    </div>
    <Footer />
</div>
    )}