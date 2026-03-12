import { api } from '@/utils/apis/api'
import TestimonialLayout from '../TestimonialLayout'
import Image from 'next/image'
import Link from 'next/link'
import { getServerTranslation } from '@/utils/serverTranslation'
import { ChevronRight } from 'lucide-react'

export default async function slug({ params }) {
    const { slug } = await params
    const responce = await api.get(`/testimonials/${slug}`)
    const cardData = responce.data
    const { t } = await getServerTranslation()
    return (
        <TestimonialLayout>
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-0 w-full">
                <div className="col-span-1 flex justify-center sm:justify-start pt-5">
                    <Image width={100} height={100} className="w-20 h-20 sm:w-25 sm:h-25 rounded-full" src={cardData.image} alt="" />
                </div>
                <div className="col-span-1 sm:col-span-5 flex flex-col gap-4 ps-0 sm:ps-5 text-center sm:text-left">
                    <div className="text-xl md:text-2xl font-bold font-dm-serif-display italic">
                        {cardData.name}
                    </div>
                    <div className="text-sm md:text-base font-work-sans font-light">
                        {cardData.message}
                    </div>
                    <div className="mt-4">
                        <Image width={360} height={70} src="/assets/media/images/website/logo-firma-test.svg" alt="" />
                    </div>
                </div>
            </div>
        </TestimonialLayout>
    )
}