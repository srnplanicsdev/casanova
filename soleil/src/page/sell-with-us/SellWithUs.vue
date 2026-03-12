<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import SellPropertyCard from '@/components/sell-with-us/SellPropertyCard.vue';
import image1 from '@/assets/media/images/news/o_1i81vlkb1omq1bfku6r9hs1ekj.png';
import image2 from '@/assets/media/images/news/o_1i81vlkb1v5rvad15cq8rd7mck.png';
import image3 from '@/assets/media/images/news/o_1i81vlkb1ccue9te8bf0otel.png';
import image4 from '@/assets/media/images/news/o_1i81vlkb18etiltm5fp1417nvm.png';
import image5 from '@/assets/media/images/news/o_1i81vlkb15tu1qlhhvlqm71b2un.png';
import image6 from '@/assets/media/images/news/o_1i81vlkb11q15l4edtg1h881bnfo.png';
import image7 from '@/assets/media/images/news/o_1i81vlkb15clldm28nvtp5odp.png';
import image8 from '@/assets/media/images/news/o_1i81vlkb1k0j1emj117am3aueq.png';
import image9 from '@/assets/media/images/news/o_1i81vmk1m1bab9c31rb42mp89m2d.png';
import { useI18n } from 'vue-i18n';
import {computed} from 'vue'
const { t } = useI18n()
const cardsData = computed(()=>[
    {
        id: 1,
        image: image1,
        title: t('sell-with-us-page.reasons-list.accurate-valutation.title'),
        description: t('sell-with-us-page.reasons-list.accurate-valutation.description')
    },
    {
        id: 2,
        image: image2,
        title: t('sell-with-us-page.reasons-list.effective-marketing.title'),
        description: t('sell-with-us-page.reasons-list.effective-marketing.description')
    },
    {
        id: 3,
        image: image3,
        title: t('sell-with-us-page.reasons-list.extensive-network.title'),
        description: t('sell-with-us-page.reasons-list.extensive-network.description')
    },
    {
        id: 4,
        image: image4,
        title: t('sell-with-us-page.reasons-list.expert-negotiation.title'),
        description: t('sell-with-us-page.reasons-list.expert-negotiation.description')
    },
    {
        id: 5,
        image: image5,
        title: t('sell-with-us-page.reasons-list.complete-legal-guidance.title'),
        description: t('sell-with-us-page.reasons-list.complete-legal-guidance.description')
    },
    {
        id: 6,
        image: image6,
        title: t('sell-with-us-page.reasons-list.professional-presentation.title'),
        description: t('sell-with-us-page.reasons-list.professional-presentation.description')
    },
    {
        id: 7,
        image: image7,
        title: t('sell-with-us-page.reasons-list.total-transparency.title'),
        description: t('sell-with-us-page.reasons-list.total-transparency.description')
    },
    {
        id: 8,
        image: image8,
        title: t('sell-with-us-page.reasons-list.efficient-management.title'),
        description: t('sell-with-us-page.reasons-list.efficient-management.description')
    },
    {
        id: 9,
        image: image9,
        title: t('sell-with-us-page.reasons-list.personalized-service.title'),
        description: t('sell-with-us-page.reasons-list.personalized-service.description')
    },
])
</script>
<template>
    <Navbar />
    <div>
        <div
            class="pt-30 bg-[url('@/assets/media/images/website/thumbnails/bg-header-sell_1920x593.jpg')] brightness-90 w-full h-screen bg-cover bg-center text-center">
            <h1 class=" flex justify-center flex-col items-center font-bold text-white font-dm-serif-display h-full">
                <span class=" text-base uppercase not-italic font-normal ">{{ t('mk-premium') }}</span>
                <p class="text-5xl italic ">{{ t('sell-with-us-page.title') }}</p>

            </h1>
        </div>
        <div class="mt-10">
            <div class="flex flex-col items-center justify-center text-center gap-4 lg:mx-100">
                <h2 class="text-5xl font-bold font-dm-serif-display text-gray-800 italic my-5">
                    {{ t('sell-with-us-page.reasons') }} <em class="  not-italic text-gold ">{{ t('mk-premium') }}</em></h2>
                <p class="my-5">{{ $t('sell-with-us-page.content') }}</p>
                <p class="font-semibold">{{ $t('sell-with-us-page.content-span') }}</p>
            </div>
        </div>
        <div class="flex  justify-center">
            <div class="container mx-auto">

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div v-for="cardData in cardsData" :key="cardData.id">
                        <SellPropertyCard :cardData="cardData" />
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center w-full lg:px-120 my-10 text-center flex-col">

            <img src="@/assets/media/images/news/o_1i81vmk1m1sutpuh146f1u511b6v2e.png" alt="">
            <p class="my-5 text-base font-semibold font-work-sans">{{ $t('sell-with-us-page.content-footer') }}</p>
        </div>

        <div class="bg-gold/10 py-10">
            <div class="flex items-center justify-center w-full my-10 text-center flex-col">
                <div class="text-4xl font-semibold font-dm-serif-display text-gray-800 italic my-5">
                    {{ $t('about-card.about') }} <span class="text-gold not-italic">{{ $t('about-card.you') }}</span>

                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white ">
                        <input class="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                            :placeholder="$t('about-card.name') + ' *'">
                    </div>
                    <div class="bg-white ">
                        <input class="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                            :placeholder="$t('about-card.email') + ' *'">
                    </div>
                    <div class="bg-white ">
                        <input class="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                            :placeholder="$t('about-card.phone')">
                    </div>

                </div>
                <div class="text-4xl font-semibold font-dm-serif-display text-gray-800 italic my-5">
                    {{ $t('about-card.about') }} <span class="text-gold not-italic">{{ $t('about-card.property')
                        }}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white ">
                        <input class="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                            :placeholder="$t('about-card.type')">
                    </div>
                    <div class="bg-white ">
                        <input class="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                            :placeholder="$t('about-card.bedroom')">
                    </div>
                    <div class="bg-white row-span-3">
                        <input class="p-4 w-100 " type="text" :placeholder="$t('about-card.message')">
                    </div>
                    <div class="bg-white ">
                        <input class="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                            :placeholder="$t('about-card.location')">
                    </div>
                    <div class="bg-white ">
                        <input class="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                            :placeholder="$t('about-card.bathrooms')">
                    </div>
                    <div class="bg-white ">
                        <input class="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                            :placeholder="$t('about-card.features')">
                    </div>
                    <div class="bg-white ">
                        <input class="p-4 w-100 focus:outline-6 focus:outline-gold/50" type="text"
                            :placeholder="$t('about-card.price') + ' *'">
                    </div>

                </div>
                <div class="w-175 mt-5">
                    <label class="group flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" class="sr-only" />

                        <span
                            class="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-black group-has-checked:border-black transition duration-300 ease-in-out">
                            <svg class="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        <p class="text-xs text-start text-gray-700 w-175">
                            {{ $t('about-card.about-the-policy') }}
                            <span class="underline font-medium">{{ $t('about-card.privacy-policy') }}</span>.
                            {{ $t('about-card.information') }}
                        </p>
                    </label>
                </div>
                <div class=" mt-5">
                    <button
                        class="text-white w-110 font-work-sans py-3 px-20 font-medium uppercase text-sm bg-gold hover:bg-gold/80 hover:text-black ">
                        {{ $t('about-card.send') }}
                    </button>
                </div>
                <div class="mt-5">
                    <textarea class="appearance-none  w-300 h-12 text-xs text-start p-4 " name="" id="">{{ $t('about-card.policy') }}
                    </textarea>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>
