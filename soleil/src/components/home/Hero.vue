<script setup>
import PropertyFilter from '../PropertyFilter.vue';
</script>

<template>
    <div class="relative w-full  ">
        <div
            class="bg-[url('@/assets/media/images/banner/banner_1.jpg')] brightness-90 w-full h-screen bg-cover bg-center text-white text-center">
            <div class="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <strong class="text-5xl lg:text-6xl italic font-bold font-dm-serif-display">{{ $t("home-page.title")
                    }}
                        <span class="font-bold not-italic">{{ $t("home-page.title-span") }}</span></strong>
                </div>
            </div>
        </div>
        <div class="md:-mt-68">
            <PropertyFilter />
        </div>
    </div>
</template>
