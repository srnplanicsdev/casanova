<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ref } from 'vue';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useFavoriteStore } from '@/stores/favorite';
const modules = [Pagination, Navigation, Autoplay];
const swiperRef = ref(null);
const store = useFavoriteStore();
import { mapToI18nKey } from '@/i18n/helper/mapToI18nKey';
import { useI18n } from 'vue-i18n';
import { handleCardPrice } from '@/utils/helper';
const { t } = useI18n();

const props = defineProps({
  cardData: {
    type: Object,
    required: true
  }
})

</script>
<template>
  <div class=" font-dm-serif-display group mx-2 mb-4 relative w-full">
    <div
      class="property-featured block relative bg-white hover:border-gold hover:border-b-8 border-b-8 border-transparent overflow-hidden shadow-lg transition-all duration-300">
      <div class="porta-img relative">
        <div v-if="cardData.image">
          <img :src="cardData.image" alt="Add to Favorites"
            class="w-full group-hover:scale-104 transition-all duration-300 h-64 object-cover">
        </div>

        <div v-if="cardData.images">
          <swiper :modules="modules" slidesPerView="auto" :centered-slides="true" :pagination="{ clickable: true }"
            :navigation="true" :autoplay="{ delay: 2500 }">
            <swiper-slide v-for="image in cardData.images" :key="image">
              <img :src="image" alt="Villa - Resale - Altea - Altea La Vella"
                title="Villa - Resale - Altea - Altea La Vella"
                class="w-full group-hover:scale-104 transition-all duration-300 h-64 object-cover">
            </swiper-slide>
          </swiper>
        </div>

        <div class="labels absolute top-2 left-2 flex gap-2 z-10">
          <div v-for="badge in cardData.badges" :key="badge"
            class="badge bg-gray-800 text-white text-xs px-4 py-1 rounded-xl">
            {{ t(mapToI18nKey(badge)) }}
          </div>
        </div>
      </div>

      <div class="property-detail p-4 relative bg-white z-10 ">
        <div class="absolute -top-5 right-2 bg-white rounded-full p-2 flex space-x-2">
          <span class="add-fav cursor-pointer" title="Add to Favorites">

            <img v-if="store.favorites.includes(cardData)"
              src="@/assets/media/images/website/properties/icon-favorites-full.svg" alt="Add to Favorites"
              @click.prevent.stop="store.removeFavorite(cardData)" class="w-6 h-6" />
            <img v-else src="@/assets/media/images/website/properties/icon-favorites.svg" alt="Add to Favorites"
              @click.prevent.stop="store.addFavorite(cardData)" class="w-6 h-6" />

          </span>
        </div>

        <h3 class="text-2xl font-semibold text-gray-900 italic truncate mt-6 font-dm-serif-display">
          <strong class="font-dm-serif-display not-italic">{{ t(mapToI18nKey(cardData.title)) }}</strong> · {{
            t(mapToI18nKey(cardData.type)) }}
        </h3>
        <h4 class="text-sm text-gold uppercase mt-2 tracking-[3px] font-dm-serif-display truncate">{{
          t(mapToI18nKey(cardData.location)) }}
        </h4>

        <div class="icons mt-2">
          <ul class="flex flex-wrap text-sm text-gray-700 gap-8 py-5">
            <li class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/house.svg" class="h-5" alt="meters">
              <span>{{ t(mapToI18nKey(cardData.size)) }}</span>
            </li>
            <li class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/plano.svg" class="h-5" alt="plot">
              <span>{{ t(mapToI18nKey(cardData.plot)) }}</span>
            </li>
            <li class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/bed.svg" class="h-5" alt="bedrooms">
              <span>{{ t(mapToI18nKey(cardData.bedrooms)) }}</span>
            </li>
            <li class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/bath.svg" class="h-5" alt="baths">
              <span>{{ t(mapToI18nKey(cardData.bathrooms)) }}</span>
            </li>
            <li class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/pool.svg" class="h-5" alt="pool">
              <span>{{ cardData.pool ? t('yes') : t('no') }}</span>
            </li>
            <li class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/garaje.svg" class="h-5" alt="parking">
              <span>{{ t(mapToI18nKey(cardData.parking)) }}</span>
            </li>
          </ul>
        </div>

        <div class="flex justify-between items-center mt-3 text-sm font-medium text-gray-700">
          <div class="rounded-full bg-gray-100 px-3 py-1">Ref. {{ t(mapToI18nKey(cardData.reference)) }}</div>
          <div class="text-4xl text-black font-light">{{ handleCardPrice(cardData.price) }}</div>
        </div>
      </div>
    </div>
  </div>

</template>