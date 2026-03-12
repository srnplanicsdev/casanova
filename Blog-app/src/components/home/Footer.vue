<script setup>

import ArrowButton from '@/components/common/ArrowButton.vue'
import SiteFooter from './SiteFooter.vue';
import { ArrowUpRightIcon } from '@heroicons/vue/20/solid';
import FooterCard from '../common/FooterCard.vue';
const footerCard = [{
    title: "Resource Access",
    content: "Visitors can access a wide range of resources, including ebooks, whitepapers, reports."
}, {
    title: "Community Forum",
    content: "Join our active community forum to discuss industry trends, share insights, and collaborate with peers."
},
{
    title: "Tech Events",
    content: "Stay updated on upcoming tech events, webinars, and conferences to enhance your knowledge."
},
]
</script>

<template>
    <div class="bg-neutral-900">
        <section class="bg-neutral-800/30 px-6 py-12 lg:px-40 lg:py-30">
            <!-- HEADER -->
            <div class="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-20">
                <div class="shrink-0">
                    <img class="w-24 h-24 lg:w-38 lg:h-38" src="@/assets/Logo.png" alt="">
                </div>
                <div class="">
                    <span class="inline-block mb-4 rounded-sm bg-neutral-700 px-4 py-1 text-lg lg:text-xl text-white">
                        Learn, Connect, and Innovate
                    </span>

                    <h2 class="text-3xl md:text-4xl lg:text-6xl mt-4 font-medium text-white leading-tight">
                        Be Part of the Future Tech Revolution
                    </h2>

                    <p class="mt-7.5 text-neutral-400 text-base lg:text-lg ">
                        Immerse yourself in the world of future technology. Explore our comprehensive
                        resources, connect with fellow tech enthusiasts, and drive innovation in the industry.
                    </p>
                </div>
            </div>

            <!-- CARDS -->
            <div
                class="mt-10 lg:mt-25 p-4 lg:p-5 rounded-xl bg-neutral-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <!-- Card 1 -->
                <div v-for="chip in footerCard" :key="chip.title">
                    <FooterCard :chip="chip" />
                </div>
            </div>
        </section>
        <SiteFooter />
    </div>
</template>
