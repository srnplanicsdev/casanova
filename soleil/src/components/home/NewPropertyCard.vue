<script setup>
import { useLanguage } from '@/utils/useLanguage';
const { currentLangCode } = useLanguage();
const props = defineProps({
  cardData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="col-md-4 font-dm-serif-display">
    <router-link :to="cardData.link || 'properties'" class="block relative z-1 no-underline hover:bg-white/60 group">
      <img :src="cardData.image" :alt="cardData.title" class="w-full h-full group-hover:opacity-50 object-cover" />
      <img src="@/assets/media/images/website/sde-no_bg-web.png" alt="Logo"
        class="absolute group-hover:top-12 left-1/2 -translate-x-1/2 opacity-0 transition-all top-0  duration-400 ease-in-out group-hover:opacity-100 h-[92px]" />
      <div class="absolute bottom-5 left-5 right-5 p-8 group-hover:bg-gold text-xl tracking-[3px] bg-white/60 z-2 text-center text-gray-800 group-hover:text-white transition-all duration-300 ease-in-out">
        <h3 class="text-xl md:text-2xl font-medium">
          <span class="group-hover:text-white text-3xl font-bold italic text-gold">
            <div v-html="cardData.content?.[currentLangCode]"></div>
          </span>
        </h3>
      </div>
    </router-link>
  </div>
</template>
