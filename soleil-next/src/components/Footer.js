import { getServerTranslation } from "@/utils/serverTranslation";
import { InstagramIcon } from "lucide-react";
import { FacebookIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
    const {t} = await getServerTranslation();
    const navigation = [
    { title: t("home").toUpperCase(), name: "/home" },
    { title: t("properties").toUpperCase(), name: "/properties" },
    { title: t("about-us").toUpperCase(), name: "/about-us" },
    { title: t("sell-with-us").toUpperCase(), name: "/sell-your-property" },
    { title: t("services").toUpperCase(), name: "/services" },
    { title: t("testimonials").toUpperCase(), name: "/testimonials" },
    { title: t("contact").toUpperCase(), name: "/contact" }
]
    return (
        <div>
            <footer>
        <div className="bg-gold py-15 flex justify-center">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <Image width={280} height={160} src="/assets/media/images/website/sde-for_dark_bg-web.png" alt="Soleildespagne"
                        className="h-32 md:h-40 object-contain" />
                </div>
                <div
                    className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-10 mt-10 mb-10 text-center">
                        {navigation.map((link) => (
                            <Link href={link.name} key={link.name} className="text-white hover:text-black transition-colors">
                                {link.title}
                            </Link>
                        ))}
                    <Link href="/favorites/" className="text-white text-xl hover:text-black">
                        <font-awesome-icon icon="fa-solid fa-heart" />
                    </Link>
                </div>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200/30 font-dm-serif-display text-white text-xl md:text-2xl font-semibold text-center">
                    <div className="py-4 md:py-0">
                        <span>{t("footer.address")}:</span>
                        <p className="text-base font-normal mt-2 font-work-sans">ALTEA</p>
                    </div>
                    <div className="py-4 md:py-0">
                        <span>{t("footer.email")}:</span>
                        <p className="text-base font-normal mt-2 font-work-sans">info@soleildespagne.com</p>
                    </div>
                    <div className="py-4 md:py-0">
                        <span>{t("footer.phone")}:</span>
                        <p className="text-base font-normal mt-2 font-work-sans">+34 622 919 887 | +48 660 512 460</p>
                    </div>
                    <div className="py-4 md:py-0">
                        <span>{t("footer.follow-in")}</span>
                        <div className="mt-2 flex justify-center gap-4">
                            <FacebookIcon/> 
                            <InstagramIcon />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center pt-10 md:pt-15 gap-8 md:gap-15">
                    <Image width={110} height={80} alt="raicv" className="h-16 md:h-20" src="/assets/media/images/website/logo-api.svg" />
                    <Image width={180} height={80} alt="raicv" className="h-16 md:h-20" src="/assets/media/images/website/logo-cv.svg" />
                </div>
            </div>

        </div>
        <div className="bg-white text-sm font-light py-4">

            <div className="flex justify-center">
                <p>
                    {t("footer.copyright")}
                </p>
            </div>
        </div>
    </footer>
        </div>
    );
}