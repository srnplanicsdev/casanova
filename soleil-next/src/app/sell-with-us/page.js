import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SellPropertyCard from "@/components/SellPropertyCard"
import { getServerTranslation } from "@/utils/serverTranslation"
import Image from "next/image"

export default async function SellWithUs() {
    const { t } = await getServerTranslation()

    const cardsData = [
        {
            id: 1,
            image: '/assets/media/images/news/o_1i81vlkb1omq1bfku6r9hs1ekj.png',
            title: t('sell-with-us-page.reasons-list.accurate-valutation.title'),
            description: t('sell-with-us-page.reasons-list.accurate-valutation.description')
        },
        {
            id: 2,
            image: '/assets/media/images/news/o_1i81vlkb1v5rvad15cq8rd7mck.png',
            title: t('sell-with-us-page.reasons-list.effective-marketing.title'),
            description: t('sell-with-us-page.reasons-list.effective-marketing.description')
        },
        {
            id: 3,
            image: '/assets/media/images/news/o_1i81vlkb1ccue9te8bf0otel.png',
            title: t('sell-with-us-page.reasons-list.extensive-network.title'),
            description: t('sell-with-us-page.reasons-list.extensive-network.description')
        },
        {
            id: 4,
            image: '/assets/media/images/news/o_1i81vlkb18etiltm5fp1417nvm.png',
            title: t('sell-with-us-page.reasons-list.expert-negotiation.title'),
            description: t('sell-with-us-page.reasons-list.expert-negotiation.description')
        },
        {
            id: 5,
            image: '/assets/media/images/news/o_1i81vlkb15tu1qlhhvlqm71b2un.png',
            title: t('sell-with-us-page.reasons-list.complete-legal-guidance.title'),
            description: t('sell-with-us-page.reasons-list.complete-legal-guidance.description')
        },
        {
            id: 6,
            image: '/assets/media/images/news/o_1i81vlkb11q15l4edtg1h881bnfo.png',
            title: t('sell-with-us-page.reasons-list.professional-presentation.title'),
            description: t('sell-with-us-page.reasons-list.professional-presentation.description')
        },
        {
            id: 7,
            image: '/assets/media/images/news/o_1i81vlkb15clldm28nvtp5odp.png',
            title: t('sell-with-us-page.reasons-list.total-transparency.title'),
            description: t('sell-with-us-page.reasons-list.total-transparency.description')
        },
        {
            id: 8,
            image: '/assets/media/images/news/o_1i81vlkb1k0j1emj117am3aueq.png',
            title: t('sell-with-us-page.reasons-list.efficient-management.title'),
            description: t('sell-with-us-page.reasons-list.efficient-management.description')
        },
        {
            id: 9,
            image: '/assets/media/images/news/o_1i81vmk1m1bab9c31rb42mp89m2d.png',
            title: t('sell-with-us-page.reasons-list.personalized-service.title'),
            description: t('sell-with-us-page.reasons-list.personalized-service.description')
        },
    ]

    return (
        <div>

            <Navbar />
            <div>
                <div
                    className="pt-30 bg-[url('/assets/media/images/website/thumbnails/bg-header-sell_1920x593.jpg')] brightness-90 w-full h-screen bg-cover bg-center text-center">
                    <h1 className=" flex justify-center flex-col items-center font-bold text-white font-dm-serif-display h-full">
                        <span className=" text-base uppercase not-italic font-normal ">{t('mk-premium')}</span>
                        <p className="text-5xl italic ">{t('sell-with-us-page.title')}</p>
                    </h1>

                </div>
                <div className="mt-10">
                    <div className="flex flex-col items-center justify-center text-center gap-4 lg:mx-100">
                        <h2 className="text-5xl font-bold font-dm-serif-display text-gray-800 italic my-5">
                            {t('sell-with-us-page.reasons')} <em className="  not-italic text-gold ">{t('mk-premium')}</em></h2>
                        <p className="my-5">{t('sell-with-us-page.content')}</p>
                        <p className="font-semibold">{t('sell-with-us-page.content-span')}</p>
                    </div>
                </div>
                <div className="flex  justify-center">
                    <div className="container mx-auto">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cardsData.map((cardData) => (
                                <SellPropertyCard key={cardData.id} cardData={cardData} />
                            ))}
                        </div>
                    </div>
                </div>


                <div className="flex items-center justify-center w-full lg:px-120 my-10 text-center flex-col">

                    <Image src="/assets/media/images/news/o_1i81vmk1m1sutpuh146f1u511b6v2e.png" alt="" width={500} height={100} />
                    <p className="my-5 text-base font-semibold font-work-sans">{t('sell-with-us-page.content-footer')}</p>
                </div>

                <div className="bg-gold/10 py-10">
                    <div className="flex items-center justify-center w-full my-10 text-center flex-col">
                        <div className="text-4xl font-semibold font-dm-serif-display text-gray-800 italic my-5">
                            {t('about-card.about')} <span className="text-gold not-italic">{t('about-card.you')}</span>

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white ">
                                <input className="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                                    placeholder={`${t('about-card.name')} *`} />
                            </div>
                            <div className="bg-white ">
                                <input className="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                                    placeholder={`${t('about-card.email')} *`} />
                            </div>
                            <div className="bg-white ">
                                <input className="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                                    placeholder={`${t('about-card.phone')}`} />
                            </div>

                        </div>
                        <div className="text-4xl font-semibold font-dm-serif-display text-gray-800 italic my-5">
                            {t('about-card.about')} <span className="text-gold not-italic">{t('about-card.property')
                            }</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white ">
                                <input className="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                                    placeholder={`${t('about-card.type')}`} />
                            </div>
                            <div className="bg-white ">
                                <input className="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                                    placeholder={`${t('about-card.bedroom')}`} />
                            </div>
                            <div className="bg-white row-span-3">
                                <input className="p-4 w-100 " type="text" placeholder={`${t('about-card.message')}`} />
                            </div>
                            <div className="bg-white ">
                                <input className="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                                    placeholder={`${t('about-card.location')}`} />
                            </div>
                            <div className="bg-white ">
                                <input className="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                                    placeholder={`${t('about-card.bathrooms')}`} />
                            </div>
                            <div className="bg-white ">
                                <input className="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                                    placeholder={`${t('about-card.features')}`} />
                            </div>
                            <div className="bg-white ">
                                <input className="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                                    placeholder={`${t('about-card.price') + ' *'}`} />
                            </div>

                        </div>
                        <div className="w-175 mt-5">
                            <label className="group flex items-start gap-2 cursor-pointer">
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
                                <p className="text-xs text-start text-gray-700 w-175">
                                    {t('about-card.about-the-policy')}
                                    <span className="underline font-medium">{t('about-card.privacy-policy')}</span>.
                                    {t('about-card.information')}
                                </p>
                            </label>
                        </div>
                        <div className=" mt-5">
                            <button
                                className="text-white w-110 font-work-sans py-3 px-20 font-medium uppercase text-sm bg-gold hover:bg-gold/80 hover:text-black ">
                                {t('about-card.send')}
                            </button>
                        </div>
                        <div className="mt-5">
                            <textarea className="appearance-none  w-300 h-12 text-xs text-start p-4 " name="" id="" value={t('about-card.policy')} readOnly />
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}