<script setup>
import { computed } from 'vue';
import { useLanguage } from '@/utils/useLanguage';

const props = defineProps({
    region: {
        type: Object,
        required: true
    }
});

const { currentLangCode } = useLanguage();


const localizedTitle = computed(() => props.region.title?.[currentLangCode.value] || props.region.title?.EN || '');

const regionLink = computed(() => {
    const slug = props.region.slug?.[currentLangCode.value] || props.region.slug?.EN || '';
    return { name: "region", params: { slug: slug, lang: currentLangCode.value } };

});
</script>

<template>
    <div class="font-dm-serif-display">
        <router-link :to="regionLink" class="block relative z-10 no-underline hover:bg-white/60 group">
            <div class="relative h-full overflow-hidden">
                <img v-if="region.image" :src="region.image" :alt="localizedTitle"
                    class="w-full h-full group-hover:opacity-50 object-cover transition-opacity duration-300" />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-400">No Image</span>
                </div>

                <div
                    class="absolute bottom-5 left-5 right-5 p-8 group-hover:bg-gold bg-white/60 z-20 text-center text-gray-800 group-hover:text-white transition-all duration-300 ease-in-out">
                    <h3 class="text-xl md:text-2xl font-medium">
                        <span class="group-hover:text-white text-3xl font-bold italic text-gold">{{ localizedTitle
                        }}</span>
                    </h3>
                </div>
            </div>
        </router-link>
    </div>
</template>