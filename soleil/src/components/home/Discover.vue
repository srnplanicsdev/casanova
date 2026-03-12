<script setup>
import { useLanguage } from '@/utils/useLanguage';
const { currentLangCode } = useLanguage()
const props = defineProps({
    discover: {
        type: Object,
        required: true
    }
});


</script>
<template>
    <div class="container mx-auto px-4 mt-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div class="order-2 md:order-1">
                <div class="w-full pb-5 text-base font-light font-work-sans gap-4 flex flex-col">
                    <h1 class="text-3xl md:text-5xl font-dm-serif-display font-bold text-gold my-4 md:my-8">
                        <em class="text-gray-800">{{ $t("discover.discover") }}</em>
                        {{ $t("discover.with-soleildespagne") }}
                    </h1>
                    <div v-html="discover.content?.[currentLangCode]" class="text-gray-800 text-justify"></div>
                </div>
            </div>
            <div class="order-1 md:order-2 w-full h-full">
                <img src="@/assets/media/images/news/o_1i7vieeja36le4eu11hef1u1tc.jpg" alt=""
                    class="w-full h-full object-cover">
            </div>
        </div>
    </div>
</template>