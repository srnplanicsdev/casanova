import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getServerTranslation } from "@/utils/serverTranslation";
import Image from "next/image";

export default async function AboutUs() {
    const { t } = await getServerTranslation();
    return (
        <div>
            <Navbar />
            <div>
                <div
                    className="pt-30 bg-[url('/assets/media/images/website/thumbnails/bg-header-about-us_1920x593.jpg')] brightness-90 w-full h-screen bg-cover bg-center text-center">
                    <h1
                        className="text-5xl flex justify-center items-center italic font-bold text-white font-dm-serif-display h-full">
                        {t('about-us-page.title')}
                    </h1>
                </div>
                <div className="container mx-auto px-4 mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="flex flex-col gap-5">
                            <div className="font-work-sans text-base font-light">
                                <h2 className="text-3xl md:text-5xl font-bold font-dm-serif-display not-italic text-gold my-5"><em
                                    className="italic text-gray-800">{t("about-us-page.our-charm")}</em> {
                                        t("about-us-page.our-charm-span")}</h2>
                                <p>{t("about-us-page.content")}</p>
                                <p className="my-5"><strong className="font-semibold ">{t("about-us-page.content-span")}</strong>
                                </p>
                                <p>{t("about-us-page.content-footer")}</p>
                            </div>
                        </div>
                        <div className="w-full h-full">
                            <Image width={860} height={520} src="/assets/media/images/news/o_1i7vselrp1hvf19n215af1cb8ajec.jpg" alt=""
                                className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <div className="bg-[url('/assets/media/images/news/o_1i7vt4imqhd8c4qpof78e1s67c.jpg')] p-4 md:p-17 bg-cover">
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-full max-w-3xl bg-white p-6 md:p-12 md:py-20">
                                <div className="flex justify-center">
                                    <Image width={300} height={170} src="/assets/img/sde-no_bg-web.png" alt="" className="max-w-[150px] md:max-w-full" />
                                </div>
                                <div
                                    className="flex flex-col items-center font-work-sans text-center text-sm md:text-base font-light gap-5">
                                    <h2 className="text-3xl md:text-5xl font-bold font-dm-serif-display not-italic text-gold mt-5">
                                        <em className="italic text-gray-800">{t("about-us-page.services.title")}</em> {
                                            t("about-us-page.services.title-span")}
                                    </h2>
                                    <p className="my-5">{t("about-us-page.services.content")}</p>
                                    <p className=" font-semibold ">{t("about-us-page.services.content-span")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" my-20 bg-gold/10 py-10">
                    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="flex flex-col font-work-sans text-base font-light order-2 md:order-1">
                            <h2 className="text-3xl md:text-5xl font-bold font-dm-serif-display not-italic text-gold my-5">Hello,
                                <em className="italic text-gray-800">{t("about-us-page.agent.name")}</em>
                            </h2>
                            <p>{t("about-us-page.agent.content")}</p>
                            <p className="my-5">{t("about-us-page.agent.content-span")}</p>
                            <p className="font-semibold">{t("about-us-page.agent.content-footer")}</p>
                            <div className=" my-6">
                                <Image width={220} height={60} src="/assets/media/images/website/firma-martyna.svg" alt="" className="max-w-[200px]" />
                            </div>
                        </div>
                        <div className="w-full h-full order-1 md:order-2">
                            <Image width={975} height={720} src="/assets/media/images/news/o_1i8001mho26g1d1m1d2c3v11j8uc.jpg" alt=""
                                className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}