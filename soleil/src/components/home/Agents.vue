<script setup>
import router from '@/router';
import { useLanguage } from '@/utils/useLanguage';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const { currentLangCode } = useLanguage()
const props = defineProps({
    agent: {
        type: Object,
        required: true
    }
});


</script>
<template>
    <div class="bg-gold/10 py-10 mt-20">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div class="w-full h-full">
                    <img src="@/assets/media/images/website/martyna-kaminska.jpg" alt=""
                        class="w-full h-full object-cover">
                </div>
                <div>
                    <div class="w-full text-base font-light font-work-sans">
                        <div class="py-6 md:py-12 gap-4 flex flex-col">
                            <h2 class="text-lg text-gold font-dm-serif-display font-bold mt-2 mb-0">
                                <small class="text-primary">{{ $t("agents.reliable") }}</small>
                            </h2>
                            <h2 class="text-3xl md:text-5xl italic text-black font-dm-serif-display mb-6 font-bold">
                                {{ $t("agents.name") }}</h2>
                            <div v-html="agent.content?.[currentLangCode]"></div>
                            <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                                <button @click="router.push({ name: 'about-us' })"
                                    class="text-white font-work-sans py-4 px-10 md:px-20 font-medium text-sm bg-gold hover:bg-gold/80 hover:text-black transition-colors w-full sm:w-auto">{{
                                    $t("agents.about") }}</button>
                                <img src="@/assets/media/images/website/firma-martyna.svg" alt="" class="max-h-12">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>