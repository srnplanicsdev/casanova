
import PropertyFilter from '@/components/PropertyFilter';
import { getServerTranslation } from '@/utils/serverTranslation';

export default async function Hero() {
    const { t } = await getServerTranslation();
    return (
        <div className="relative w-full">
            <div
                className="bg-[url('/assets/media/images/banner/banner_1.jpg')] brightness-90 w-full h-screen bg-cover bg-center text-white text-center">
                <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <strong className="text-5xl lg:text-6xl font-bold font-dm-serif-display">
                            <span className="italic mr-2">{t("home-page.title")}</span>
                            <span className="font-bold not-italic">{t("home-page.title-span")}</span>
                        </strong>
                    </div>
                </div>
            </div>
            <div className="md:-mt-68">
                <PropertyFilter />
            </div>
        </div>
    )
}
