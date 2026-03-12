<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { ref, onMounted } from "vue";
import { Pagination, Autoplay } from "swiper/modules";
import router from "@/router";
import NodePropertyCard from "../NodePropertyCard.vue";
import { propertiesApi } from "@/utils/api";

const modules = [Pagination, Autoplay];
const swiperInstance = ref(null);
const pagination = ref({
  clickable: true,
  type: 'custom',
  el: '.custom-pagination',

  renderCustom: (swiper, current, total) => {
    let html = '';
    for (let i = 1; i <= total; i++) {
      html += `
          <span class="page-box ${i === current ? 'active' : ''}" data-page="${i}">
           0${i}.
          </span>
        `;
    }
    return html;
  },
});

const properties = ref([])
onMounted(async () => {
  try {
    const response = await propertiesApi.get('/properties');
    properties.value = response.data;
  } catch (error) {
    console.log(error);
  }
})
// const properties = ref([
//   {
//     id: 1,
//     title: 'New Construction',
//     type: 'Villas',
//     image: image4,
//     link: '#',
//     badges: ['PRIVATE FOREST', 'PRIVATE SWIMMING POOL'],
//     size: '431m2',
//     plot: '1.670m2',
//     bedrooms: '6',
//     bathrooms: '6',
//     pool: 'Yes',
//     parking: 'Pri.',
//     reference: 'NBR-10012',
//     price: '1.390.000 €'
//   },
//   {
//     id: 2,
//     title: 'New Construction',
//     type: 'Villas',
//     image: image5,
//     link: '#',
//     badges: ['PRIVATE FOREST', 'PRIVATE SWIMMING POOL'],
//     size: '431m2',
//     plot: '1.670m2',
//     bedrooms: '6',
//     bathrooms: '6',
//     pool: 'Yes',
//     parking: 'Pri.',
//     reference: 'NBR-10012',
//     price: '1.390.000 €'
//   },
//   {
//     id: 3,
//     title: 'New Construction',
//     type: 'Villas',
//     image: image6,
//     link: '#',
//     badges: ['PRIVATE FOREST', 'PRIVATE SWIMMING POOL'],
//     size: '431m2',
//     plot: '1.670m2',
//     bedrooms: '6',
//     bathrooms: '6',
//     pool: 'Yes',
//     parking: 'Pri.',
//     reference: 'NBR-10012',
//     price: '1.390.000 €'
//   },
//   {
//     id: 4,
//     title: 'New Construction',
//     type: 'Villas',
//     image: image7,
//     link: '#',
//     badges: ['PRIVATE FOREST', 'PRIVATE SWIMMING POOL'],
//     size: '431m2',
//     plot: '1.670m2',
//     bedrooms: '6',
//     bathrooms: '6',
//     pool: 'Yes',
//     parking: 'Pri.',
//     reference: 'NBR-10012',
//     price: '1.390.000 €'
//   },
//   {
//     id: 5,
//     title: 'New Construction',
//     type: 'Villas',
//     image: image8,
//     link: '#',
//     badges: ['PRIVATE FOREST', 'PRIVATE SWIMMING POOL'],
//     size: '431m2',
//     plot: '1.670m2',
//     bedrooms: '6',
//     bathrooms: '6',
//     pool: 'Yes',
//     parking: 'Pri.',
//     reference: 'NBR-10012',
//     price: '1.390.000 €'
//   },
//   {
//     id: 6,
//     title: 'New Construction',
//     type: 'Villas',
//     image: image9,
//     link: '#',
//     badges: ['PRIVATE FOREST', 'PRIVATE SWIMMING POOL'],
//     size: '431m2',
//     plot: '1.670m2',
//     bedrooms: '6',
//     bathrooms: '6',
//     pool: 'Yes',
//     parking: 'Pri.',
//     reference: 'NBR-10012',
//     price: '1.390.000 €'
//   },
//   {
//     id: 7,
//     title: 'New Construction',
//     type: 'Villas',
//     image: image10,
//     link: '#',
//     badges: ['PRIVATE FOREST', 'PRIVATE SWIMMING POOL'],
//     size: '431m2',
//     plot: '1.670m2',
//     bedrooms: '6',
//     bathrooms: '6',
//     pool: 'Yes',
//     parking: 'Pri.',
//     reference: 'NBR-10012',
//     price: '1.390.000 €'
//   },
//   {
//     id: 8,
//     title: 'New Construction',
//     type: 'Villas',
//     image: image11,
//     link: '#',
//     badges: ['PRIVATE FOREST', 'PRIVATE SWIMMING POOL'],
//     size: '431m2',
//     plot: '1.670m2',
//     bedrooms: '6',
//     bathrooms: '6',
//     pool: 'Yes',
//     parking: 'Pri.',
//     reference: 'NBR-10012',
//     price: '1.390.000 €'
//   },
//   {
//     id: 9,
//     title: 'New Construction',
//     type: 'Villas',
//     image: image12,
//     link: '#',
//     badges: ['PRIVATE FOREST', 'PRIVATE SWIMMING POOL'],
//     size: '431m2',
//     plot: '1.670m2',
//     bedrooms: '6',
//     bathrooms: '6',
//     pool: 'Yes',
//     parking: 'Pri.',
//     reference: 'NBR-10012',
//     price: '1.390.000 €'
//   }
// ])

const onPaginationClick = (e) => {
  const page = e.target.dataset.page;
  if (!page || !swiperInstance.value) return;
  swiperInstance.value.slideTo((page - 1) * 3);
};
</script>
<template>
  <div class="flex justify-center items-center mt-20 md:mt-30 text-center px-4">
    <h2 class="text-3xl md:text-4xl text-gold font-dm-serif-display font-bold">
      {{ $t("featured-properties.featured") }} <span class="text-black italic">{{ $t("featured-properties.property")
        }}</span>
    </h2>
  </div>

  <div class="flex justify-center items-center w-full container mx-auto px-4">
    <div class="w-full h-full my-10 md:my-15">

      <swiper @swiper="(swiper) => (swiperInstance = swiper)" :slidesPerView="1" :slidesPerGroup="1" :loop="true" :spaceBetween="20" :breakpoints="{
        640: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 30 }
      }" :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }" :pagination="pagination" :modules="modules" class="mySwiper">
        <swiper-slide v-for="property in properties.slice(0, 9)" :key="property._id">
          <router-link :to="{ name: 'property', params: { id: property._id } }">
            <NodePropertyCard :cardData="property" />
          </router-link>
        </swiper-slide>
      </swiper>

      <div class="custom-pagination mt-6 font-dm-serif-display text-2xl font-semibold flex justify-center"
        @click="onPaginationClick"></div>
    </div>
  </div>
  <div class="flex justify-center items-center px-4">
    <button @click="router.push({ name: 'properties' })"
      class="text-black font-work-sans py-3 w-full md:w-auto md:px-20 text-sm border-black hover:bg-black hover:text-white border transition-colors">{{
        $t("view-all-properties") }}</button>
  </div>
</template>

<style scoped>
.custom-pagination :deep(.page-box) {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.custom-pagination :deep(.page-box.active) {

  color: #c1a664;
}
</style>
