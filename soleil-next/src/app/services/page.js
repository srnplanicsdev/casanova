import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SellPropertyCard from "@/components/SellPropertyCard"
import { getServerTranslation } from "@/utils/serverTranslation"
import Image from "next/image"
import Link from "next/link"

export default async function Services() {
    const { t } = await getServerTranslation()
    const cardsData = [
    {
        id: "01",
        title: t("service-page.services-list.complete-property-handling.title"),
        description: t("service-page.services-list.complete-property-handling.description")
    },
    {
        id: "02",
        title: t("service-page.services-list.notary-services.title"),
        description: t("service-page.services-list.notary-services.description")
    },
    {
        id: "03",
        title: t("service-page.services-list.document-translation-services.title"),
        description: t("service-page.services-list.document-translation-services.description")
    },
    {
        id: "04",
        title: t("service-page.services-list.nie-residence-permit-bank-account-assistance.title"),
        description: t("service-page.services-list.nie-residence-permit-bank-account-assistance.description")
    },
    {
        id: "05",
        title: t("service-page.services-list.property-promotion.title"),
        description: t("service-page.services-list.property-promotion.description")
    },
    {
        id: "06",
        title: t("service-page.services-list.post-sale-property-management.title"),
        description: t("service-page.services-list.post-sale-property-management.description")
    },
    {
        id: "07",
        title: t("service-page.services-list.recommendation-of-a-certain-lawyer-accountant-and-certified-translator.title"),
        description: t("service-page.services-list.recommendation-of-a-certain-lawyer-accountant-and-certified-translator.description")
    },
    {
        id: "08",
        title: t("service-page.services-list.obtaining-licenses-and-certificates.title"),
        description: t("service-page.services-list.obtaining-licenses-and-certificates.description")
    },
    {
        id: "09",
        title: t("service-page.services-list.recommendation-of-a-technical-architect-construction-team-and-interior-designer.title"),
        description: t("service-page.services-list.recommendation-of-a-technical-architect-construction-team-and-interior-designer.description")
    },
    {
        id: "10",
        title: t("service-page.services-list.management-of-cleaning-home-staging-and-vacation-rentals.title"),
        description: t("service-page.services-list.management-of-cleaning-home-staging-and-vacation-rentals.description")
    },
    {
        id: "11",
        title: t("service-page.services-list.car-rental-services-parking-transportation-and-moving-companies.title"),
        description: t("service-page.services-list.car-rental-services-parking-transportation-and-moving-companies.description")
    },
    {
        id: "12",
        title: t("service-page.services-list.list-of-recommended-restaurants-and-tourist-attractions.title"),
        description: t("service-page.services-list.list-of-recommended-restaurants-and-tourist-attractions.description")
    },

]
    return (
        <div>
        <Navbar />
        <div
            className="pt-30 bg-[url('/assets/media/images/website/thumbnails/bg-header-services_1920x593.jpg')] brightness-90 w-full h-screen bg-cover bg-center text-center">
            <div
                className="text-5xl flex justify-center items-center italic font-bold text-white font-dm-serif-display h-full">
                <span className="not-italic"> {t("service-page.our")} &nbsp;</span><span className="italic">
                    {t("service-page.services")}</span>

            </div>
        </div>
        <div className="px-4 md:px-0 flex flex-col items-center justify-center gap-10 mt-20 container mx-auto">
            <p className="text-3xl md:text-5xl font-bold font-dm-serif-display italic text-center">
                {t("service-page.comprehensive")}<span className="text-gold not-italic">{t("service-page.peace-of-mind")}</span></p>
            <p className="font-work-sans font-light text-center text-sm md:text-base max-w-4xl mx-auto">{t("service-page.content")}</p>
        </div>
        <div className="bg-gold/10 mt-10 py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
                {cardsData.map((card) => (
                    <SellPropertyCard key={card.id} cardData={card} />
                ))}
            </div>
        </div>
        <div className="flex justify-center items-center mt-20 px-4 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col gap-5">
                    <p className="text-3xl md:text-5xl font-bold font-dm-serif-display italic">
                        {t("service-page.partner")} <span className="text-gold not-italic">{t("service-page.costa-blanca")}</span></p>
                    <p className="font-work-sans font-light text-sm md:text-base mt-3">{t("service-page.partner-content")}</p>
                    <p className="font-work-sans font-light text-sm md:text-base mt-3">{t("service-page.partner-content2")}</p>
                    <div>
                        <Link href="/testimonials"
                            className="bg-gold text-white px-8 py-3 text-sm hover:bg-gold/80 transition-all duration-300 uppercase font-work-sans mt-5">{t("service-page.read-testimonials")}
                        </Link>
                    </div>
                </div>
                <div className="w-full">
                    <Image width={520} height={560} src="/assets/media/images/news/o_1i802i3t3tf716sr14s2a1j1vihc.jpg" alt=""
                        className="w-full h-auto object-cover"/>
                </div>
            </div>

        </div>

        <div className="mt-20">
            <Footer />
        </div>
    </div>
    )
}