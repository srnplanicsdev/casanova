<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import image1 from '@/assets/media/images/news/thumbnails/246bbab04091a482ca2191e5a2b56bfd_320x320.jpg'
import image2 from '@/assets/media/images/news/thumbnails/53071037e5e404bcd6bed175c29d380b_320x320.jpg'
import image3 from '@/assets/media/images/news/thumbnails/ad5ef600292badbec715a483f50af53b_320x320.jpg'
import image4 from '@/assets/media/images/news/thumbnails/b9ff2c2d3cbf2301b5987364539deb12_320x320.jpg'
import image5 from '@/assets/media/images/news/thumbnails/28717731e9c525369cd366822755a6fa_320x320.jpg'
import TestimonialCard from '@/components/testiminals/TestimonialCard.vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import SelectedTestimonials from './selectedTestimonials.vue';
const { t } = useI18n();
const route = useRoute();
const testimonialsData = computed(() => [
    {
        slug: "joanna",
        image: image1,
        name: t("testimonials-page.clients.joanna.name"),
        description: t("testimonials-page.clients.joanna.description")
    },
    {
        slug: "krzysztof",
        image: image2,
        name: t("testimonials-page.clients.krzysztof.name"),
        description: t("testimonials-page.clients.krzysztof.description")
    },
    {
        slug: "sylwester",
        image: image3,
        name: t("testimonials-page.clients.sylwester.name"),
        description: t("testimonials-page.clients.sylwester.description")
    },
    {
        slug: "marlena",
        image: image4,
        name: t("testimonials-page.clients.marlena.name"),
        description: t("testimonials-page.clients.marlena.description")
    },
    {
        slug: "poll",
        image: image5,
        name: t("testimonials-page.clients.poll.name"),
        description: t("testimonials-page.clients.poll.description")
    },
])
const selectedTestimonial = computed(() => {
    return testimonialsData.value.find(card => card.slug === route.params.slug);
});
</script>
<template>
    <div>
        <Navbar />
        <div class="">
            <div class="flex justify-center">
                <div
                    class="pt-30 bg-[url('@/assets/media/images/website/thumbnails/bg-header-testimonials_1920x593.jpg')] brightness-90 w-full h-64 md:h-96 lg:h-[500px] bg-cover bg-center text-center">
                    <h1
                        class="text-3xl md:text-4xl lg:text-5xl flex justify-center items-center not-italic font-bold text-white font-dm-serif-display h-full px-4">
                        {{ $t("testimonials-page.title") }}&nbsp; <span class="italic">{{
                            $t("testimonials-page.subtitle") }}</span>
                    </h1>
                </div>
            </div>

            <div class="mt-12 md:mt-16 lg:mt-20 container mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="col-span-1 lg:col-span-8 divide-y divide-gold/50 px-4 md:px-8 lg:px-12">
                        <div v-if="!$route.params.slug" v-for="card in testimonialsData" :key="card.name" class="py-8">
                            <TestimonialCard :cardData="card" />
                        </div>
                        <div v-else>
                            <SelectedTestimonials :cardData="selectedTestimonial" />
                        </div>
                    </div>
                    <div class="col-span-1 lg:col-span-4">
                        <div class="bg-gold/10 flex items-center flex-col gap-4 py-6 px-4 md:px-8 lg:px-12">
                            <div class="text-4xl font-dm-serif-display font-semibold italic text-gray-800 text-center ">
                                {{ $t("contact") }} <span class="not-italic  text-gold">{{ $t("about-card.us") }}</span>
                            </div>
                            <div class="w-full">
                                <input type="text" class="p-4 bg-white w-full"
                                    :placeholder="$t('about-card.name') + ' *'">
                            </div>
                            <div class="w-full">
                                <input type="text" class="p-4 bg-white w-full"
                                    :placeholder="$t('about-card.email') + ' *'">
                            </div>
                            <div class="w-full">
                                <input type="text" class="p-4 bg-white w-full"
                                    :placeholder="$t('about-card.phone') + ' *'">
                            </div>
                            <div class="w-full">
                                <textarea type="text" class="p-4 bg-white appearance-none w-full"
                                    :placeholder="$t('about-card.message') + ' *'"></textarea>
                            </div>
                            <div class="w-full">
                                <label class="group flex items-start cursor-pointer">
                                    <input type="checkbox" class="sr-only" />

                                    <span
                                        class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-black group-has-checked:border-black transition duration-300 ease-in-out">
                                        <svg class="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    <p class="text-xs text-start w-full ps-3 text-gray-700 ">
                                        {{ $t('about-card.about-the-policy') }}<span class="underline font-medium">{{
                                            $t('about-card.privacy-policy') }}</span>.
                                        {{ $t('about-card.information') }}
                                    </p>
                                </label>
                            </div>
                            <div class="w-full">
                                <button class="bg-gold text-white py-2 px-6 w-full">{{ $t('about-card.send') }}</button>
                            </div>


                            <div class="w-full pb-10">
                                <textarea name="" id="" class="w-full text-xs">{{ $t('about-card.policy') }}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-20">
            <Footer />
        </div>
    </div>
</template>