<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>
<template>
    <Navbar />
    <div>
        <div
            class="pt-30 bg-[url('@/assets/media/images/website/thumbnails/bg-header-about-us_1920x593.jpg')] brightness-90 w-full h-screen bg-cover bg-center text-center">
            <h1
                class="text-5xl flex justify-center items-center italic font-bold text-white font-dm-serif-display h-full">
                {{ $t('about-us-page.title') }}

            </h1>


        </div>
        <div class="container mx-auto px-4 mt-20">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div class="flex flex-col gap-5">
                    <div class="font-work-sans text-base font-light">
                        <h2 class="text-3xl md:text-5xl font-bold font-dm-serif-display not-italic text-gold my-5"><em
                                class="italic text-gray-800">{{ $t("about-us-page.our-charm") }}</em> {{
                                    $t("about-us-page.our-charm-span") }}</h2>
                        <p>{{ $t("about-us-page.content") }}</p>
                        <p class="my-5"><strong class="font-semibold ">{{ $t("about-us-page.content-span") }}</strong>
                        </p>
                        <p>{{ $t("about-us-page.content-footer") }}</p>
                    </div>
                </div>
                <div class="w-full h-full">
                    <img src="@/assets/media/images/news/o_1i7vselrp1hvf19n215af1cb8ajec.jpg" alt=""
                        class="w-full h-full object-cover">
                </div>
            </div>
        </div>
        <div class="mt-20">
            <div class="bg-[url('@/assets/media/images/news/o_1i7vt4imqhd8c4qpof78e1s67c.jpg')] p-4 md:p-17 bg-cover">
                <div class="flex flex-col items-center justify-center h-full">
                    <div class="w-full max-w-3xl bg-white p-6 md:p-12 md:py-20">
                        <div class="flex justify-center">
                            <img src="@/assets/img/sde-no_bg-web.png" alt="" class="max-w-[150px] md:max-w-full">
                        </div>
                        <div
                            class="flex flex-col items-center font-work-sans text-center text-sm md:text-base font-light gap-5">
                            <h2 class="text-3xl md:text-5xl font-bold font-dm-serif-display not-italic text-gold mt-5">
                                <em class="italic text-gray-800">{{ $t("about-us-page.services.title") }}</em> {{
                                    $t("about-us-page.services.title-span") }}
                            </h2>
                            <p class="my-5">{{ $t("about-us-page.services.content") }}</p>
                            <p class=" font-semibold ">{{ $t("about-us-page.services.content-span") }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=" my-20 bg-gold/10 py-10">
            <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div class="flex flex-col font-work-sans text-base font-light order-2 md:order-1">
                    <h2 class="text-3xl md:text-5xl font-bold font-dm-serif-display not-italic text-gold my-5">Hello,
                        <em class="italic text-gray-800">{{ $t("about-us-page.agent.name") }}</em>
                    </h2>
                    <p>{{ $t("about-us-page.agent.content") }}</p>
                    <p class="my-5">{{ $t("about-us-page.agent.content-span") }}</p>
                    <p class="font-semibold">{{ $t("about-us-page.agent.content-footer") }}</p>
                    <div class=" my-6">
                        <img src="@/assets/media/images/website/firma-martyna.svg" alt="" class="max-w-[200px]">
                    </div>
                </div>
                <div class="w-full h-full order-1 md:order-2">
                    <img src="@/assets/media/images/news/o_1i8001mho26g1d1m1d2c3v11j8uc.jpg" alt=""
                        class="w-full h-full object-cover">
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>