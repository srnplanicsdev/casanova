<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { ref } from 'vue';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { computed } from 'vue';
import { useFavoriteStore } from '@/stores/favorite';
const modules = [Pagination, Navigation, Autoplay, EffectFade];
const swiperRef = ref(null);
const store = useFavoriteStore();
import { useI18n } from 'vue-i18n';
import { handleCardPrice } from '@/utils/helper';
const { t } = useI18n();

const props = defineProps({
  cardData: {
    type: Object,
    required: true
  }
})

const badges = computed(() => {
  const badge = [];
  const features = props.cardData.communityFeatures || [];
  if (!features.length) return badge; 
  const numberOfBadges = Math.min(Math.floor(Math.random() * 3) + 1, features.length);
  const shuffled = [...features].sort(() => 0.5 - Math.random());
  badge.push(...shuffled.slice(0, numberOfBadges));
  return badge;
});


const handleLocation = () => {
  const { area, city, zone } = props.cardData.location || {}
  return [area, city, zone].filter(Boolean).join(' · ')
}
</script>
<template>

  <div class=" max-w-125 font-dm-serif-display group mx-2 mb-4 relative w-full">
    <div
      class="property-featured block relative bg-white hover:border-gold hover:border-b-8 border-b-8 border-transparent overflow-hidden shadow-lg transition-all duration-300">

      <div class="porta-img relative">
        <div v-if="cardData.image">
          <img :src="cardData.image" alt="Add to Favorites"
            class="w-full group-hover:scale-104 transition-all duration-300 h-64 object-cover">
        </div>
        <div v-if="cardData.images">

          <swiper :modules="modules" slidesPerView="auto" :effect="'fade'" :centered-slides="true" :pagination="{ clickable: true }"
            :navigation="true" :autoplay="{ delay: 2500 }" class="mySwiper">
            <swiper-slide v-for="image in cardData.images.slice(0,5)" :key="image">
                <div class="overflow-hidden">
                    <img :src="image" alt="Villa - Resale - Altea - Altea La Vella"
                        title="Villa - Resale - Altea - Altea La Vella"
                        class="w-full group-hover:scale-110 max-w-full transition-all duration-800 ease-in-out h-64 object-cover">
                </div>
            </swiper-slide>
          </swiper>
        </div>

        <div class="labels absolute top-2 left-2 flex gap-2 z-10">
          <div v-for="badge in badges" :key="badge"
            class="badge bg-gray-800 text-white text-xs px-4 py-1 rounded-xl">
            {{ badge }}
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
          <strong class="font-dm-serif-display not-italic">{{ cardData.type }}</strong> · {{
            cardData.status }}
        </h3>
        <h4 class="text-sm text-gold uppercase mt-2 tracking-[3px] font-dm-serif-display truncate">{{
          handleLocation() }}
        </h4>
        <div class="icons mt-2">
          <ul class="flex flex-wrap text-sm text-gray-700 gap-8 py-5">
            <li v-if="cardData.propertyDetails.usableArea" class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/house.svg" class="h-5" alt="meters">
              <span>{{ cardData.propertyDetails.usableArea }}</span>
            </li>
            <li v-if="cardData.propertyDetails.plotSize" class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/plano.svg" class="h-5" alt="plot">
              <span>{{ cardData.propertyDetails.plotSize }}</span>
            </li>
            <li v-if="cardData.propertyDetails.bedrooms" class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/bed.svg" class="h-5" alt="bedrooms">
              <span>{{ cardData.propertyDetails.bedrooms }}</span>
            </li>
            <li v-if="cardData.propertyDetails.bathrooms" class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/bath.svg" class="h-5" alt="baths">
              <span>{{ cardData.propertyDetails.bathrooms }}</span>
            </li>
            <li v-if="cardData.propertyDetails.pool" class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/pool.svg" class="h-5" alt="pool">
              <span>{{ cardData.propertyDetails.pool }}</span>
            </li>
            <li v-if="cardData.propertyDetails.parking" class="flex flex-col items-center gap-1">
              <img src="@/assets/media/images/website/garaje.svg" class="h-5" alt="parking">
              <span>{{ cardData.propertyDetails.parking }}</span>
            </li>
          </ul>
        </div>

        <div class="flex justify-between items-center mt-3 text-sm font-medium text-gray-700">
          <div class="rounded-full bg-gray-100 px-3 py-1">Ref. {{ cardData.reference }}</div>
          <div class="text-4xl text-black font-light">{{ handleCardPrice(cardData.price) }}</div>
        </div>
      </div>
    </div>
  </div>

</template>