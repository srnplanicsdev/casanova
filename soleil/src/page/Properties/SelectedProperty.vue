<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Sitemap from '@/components/Sitemap.vue';
import PropertyCard from '@/components/PropertyCard.vue';
import { useI18n } from 'vue-i18n';
import { useFavoriteStore } from '@/stores/favorite';
import { useRoute } from 'vue-router';
import { handleCardPrice } from '@/utils/helper';
import { propertiesApi } from '@/utils/api';
import { API } from '../../../dummy-data/API';
const modules = [Pagination, Navigation, Autoplay];
const swiperRef = ref(null);
const isFinancesOpen = ref(false);
const isExpanded = ref(false);
const propertyPrice = ref(1750000);
const interestRate = ref(3.5);
const loanTerm = ref(0);
const monthlyPayment = ref(0);
const { t } = useI18n();
const store = useFavoriteStore()
const route = useRoute();
const propertyId = route.params.id;
const property = ref(null);
const showNavbar = ref(true)

let ticking = false

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      showNavbar.value = window.scrollY < 110
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
})
onMounted(async () => {
    try {
        const res = await propertiesApi.get(`/properties/${propertyId}`);
        property.value = res.data;
        propertyPrice.value = property.value.price;
    } catch (err) {
        console.error("Error fetching property:", err);
    }
});
const scrollToMap = () => {
    const map = document.getElementById("map");
    map.scrollIntoView({ behavior: "smooth" });
}
const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate.value / 100 / 12;
    const numberOfPayments = loanTerm.value * 12;
   
    const estimate = (propertyPrice.value * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    monthlyPayment.value = estimate.toFixed(2);
}

const features = computed(() => {
    if (!property.value) return []

    const baseFeatures = [
        { name: t("about-card.bedroom"), value: property.value.propertyDetails?.bedrooms },
        { name: t("about-card.bathrooms"), value: property.value.propertyDetails?.bathrooms },
        { name: t("property.usable"), value: property.value.propertyDetails?.usableArea + " m²" },
        { name: t("property.plot"), value: property.value.propertyDetails?.plotSize + " m²" },
        { name: t("property.pool"), value: property.value.propertyDetails?.pool },
        { name: t("property.distance-to-beach"), value: property.value.location?.distanceToBeachMeters + " Mts" },
        { name: t("property.location"), value: property.value.location?.city },
        { name: t("property.year-construction"), value: property.value.construction.year },
        { name: t("property.delivery-date"), value: property.value.construction.deliveryDate },
    ]

    const communityFeatures = (property.value.communityFeatures || []).map(feature => ({
        name: feature
    }))

    return [...baseFeatures, ...communityFeatures]
})

const location = computed(() => {
    if (!property.value) return ""
    const loc = property.value.location || {}
    return [loc.area, loc.zone, loc.city, loc.country].filter(Boolean).join(", ")
})

</script>

<template>
    <div>
        <Navbar
  class="fixed top-0 left-0 w-full z-50 transition-transform duration-100"
  :class="showNavbar ? 'translate-y-0' : '-translate-y-full'"
/>
        <div class="min-h-screen bg-gray-50 pb-10">
            
            <div class="sticky top-0 z-30 bg-white shadow-sm border-b min-w-full h-24 border-gray-100 transition-all duration-300">
                <div class="container mx-auto max-w-337.5 px-4 py-3">
                    <div class="flex flex-col md:flex-row  gap-4 items-center justify-between">
                        <div class="hidden xl:block flex-1">
                            <h2 class="text-2xl xl:text-2xl font-semibold text-gray-800 leading-tight">
                                {{ property?.type }} · <em>{{ property?.status }}</em>
                                <small class="block text-base uppercase tracking-wider text-gold font-normal mt-1">
                                    {{ property?.location?.city }} · {{ property?.location?.zone }}
                                </small>
                            </h2>
                        </div>

                        <div class="text-center md:text-right">
                            <span
                                class="block text-sm uppercase tracking-wider rounded-full px-2 py-1 bg-gold/10 text-gray-800">
                                {{ property?.reference }}
                            </span>
                            <div class="text-2xl font-semibold text-gray-800 mt-0.5">
                                {{ handleCardPrice(property?.price) }}
                            </div>
                        </div>

                        <div class="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                            <button
                                class="flex-1 md:flex-none px-6 py-5 text-sm font-medium border border-gray-900 text-gray-900  hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wider">
                                <span class="hidden sm:inline">{{ $t('property.notify-offer') }}</span>
                                <span class="sm:hidden">{{ $t('property.notify') }}</span>
                            </button>
                            <button
                                class="flex-1 md:flex-none px-6 py-5 text-sm font-medium bg-gold text-white  hover:bg-gold/80 transition-colors uppercase tracking-wider shadow-sm">
                                <span class="hidden sm:inline">{{ $t('property.make-enquiry') }}</span>
                                <span class="sm:hidden">{{ $t('property.enquiry') }}</span>
                            </button>
                            <button
                                class="px-4 py-2 bg-green-500 text-white  hover:bg-green-600 transition-colors shadow-sm">
                                <font-awesome-icon icon="fa-brands fa-whatsapp" class="text-4xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="bg-black">
                <div class="container mx-auto">
                    <swiper :ref="swiperRef" :modules="modules" :slides-per-view="1" :centered-slides="true"
                        :space-between="0" :pagination="{ clickable: true }" :navigation="true" :loop="true"
                        :autoplay="{ delay: 5000, disableOnInteraction: false }" class="property-slider">
                        <swiper-slide v-for="(image, index) in property?.images" :key="index">
                            <div class="relative w-full" style="padding-top: 56.25%;">
                                <img :src="image" alt="Property Image"
                                    class="absolute top-0 left-0 w-full h-full object-cover" />
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>

            <div class="container mx-auto px-4 py-6">
                <div class="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-8">

                    <div class="flex items-center justify-center lg:justify-start gap-3 order-1">
                        <button @click="store.addFavorite(1)"
                            class="flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-white transition-all duration-300 group">
                            <font-awesome-icon icon="fa-solid fa-heart"
                                class="text-xl group-hover:scale-110 transition-transform" />
                        </button>

                        <div class="relative group">
                            <button
                                class="flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-white transition-all duration-300">
                                <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" class="text-xl" />
                            </button>


                            <div
                                class="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div class="bg-white shadow-xl rounded-lg p-3 flex gap-2 border border-gray-100">
                                    <button
                                        class="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                        <font-awesome-icon icon="fa-brands fa-facebook" />
                                    </button>
                                    <button
                                        class="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                        <font-awesome-icon icon="fa-brands fa-twitter" />
                                    </button>
                                    <button
                                        class="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                        <font-awesome-icon icon="fa-brands fa-linkedin" />
                                    </button>
                                    <button
                                        class="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                        <font-awesome-icon icon="fa-brands fa-whatsapp" />
                                    </button>
                                    <button
                                        class="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                        <font-awesome-icon icon="fa-brands fa-telegram-plane" />
                                    </button>
                                    <button
                                        class="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                        <font-awesome-icon icon="fa-solid fa-envelope" />
                                    </button>
                                    <button
                                        class="w-10 h-10 flex items-center justify-center text-gold rounded hover:text-black text-2xl transition-colors">
                                        <font-awesome-icon icon="fa-solid fa-link" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            class="flex items-center justify-center w-12 h-12 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-white transition-all duration-300 group">
                            <font-awesome-icon icon="fa-solid fa-file-arrow-down"
                                class="text-xl group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    <div
                        class="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 order-2 w-full lg:w-auto lg:flex-1 lg:justify-center">
                        <button
                            class="w-full lg:w-auto px-6 py-3 text-sm font-medium uppercase tracking-wider border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
                            {{ $t('property.photos') }}
                        </button>
                        <button @click="scrollToMap()"
                            class="w-full lg:w-auto px-6 py-3 text-sm font-medium uppercase tracking-wider bg-gold/10 text-gray-900 hover:bg-gold hover:text-white transition-colors">
                            {{ $t('property.map') }}
                        </button>
                        <button @click="isFinancesOpen = true"
                            class="w-full lg:w-auto px-6 py-3 text-sm font-medium uppercase tracking-wider bg-gold/10 text-gray-900 hover:bg-gold hover:text-white transition-colors">
                            {{ $t('property.finances') }}
                        </button>
                        <button
                            class="w-full lg:w-auto px-6 py-3 text-sm font-medium uppercase tracking-wider bg-gold/10 text-gray-900 hover:bg-gold hover:text-white transition-colors flex items-center justify-center gap-2">
                            <font-awesome-icon icon="fa-solid fa-angle-left" /> {{ $t('property.back') }}
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="isFinancesOpen" @click="isFinancesOpen = false"
                class="fixed z-9999 transition-transform duration-400 ease-linear scroll-none w-full h-full  bg-black/50 inset-0 flex items-center justify-center">
                <div class="bg-white w-8xl h-8xl p-6 rounded-lg shadow-lg" @click.stop>
                    <h2 class="text-xl flex justify-center font-bold mb-4">{{ $t('property.calculate-mortgage') }}</h2>
                    <button @click="isFinancesOpen = false"
                        class="text-gray-500 hover:text-gray-700 flex justify-center">{{ $t('property.close')
                        }}</button>
                    <form @submit.prevent="calculateMonthlyPayment">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="flex flex-col gap-2">
                                <label for="price">{{ $t('property.price') }}</label>
                                <input type="number" id="price" v-model="propertyPrice"
                                    class="border border-gray-300 rounded p-2">
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="interest-rate">{{ $t('property.interest-rate') }}</label>
                                <input type="text" id="interest-rate" v-model="interestRate"
                                    class="border border-gray-300 rounded p-2">
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="loan-term">{{ $t('property.years') }}</label>
                                <select id="loan-term" v-model="loanTerm" class="border border-gray-300 rounded p-2">
                                    <option value="">Duration</option>
                                    <option v-for="n in 30" :key="n" :value="n">{{ n }} Years</option>
                                </select>
                            </div>

                            <button type="submit"
                                class="col-span-3 bg-gold hover:bg-gold/80 transition-colors hover:text-black text-white p-2 ">{{
                                    $t('property.calculate') }}</button>
                        </div>
                    </form>
                    <div class="mt-2">
                        <h1 class="text-sm uppercase text-gold flex justify-center">{{ $t('property.monthly-payment') }}
                        </h1>
                        <p class="text-2xl mt-3 py-4 border-b border-gray-300 font-bold flex justify-center">
                            {{ monthlyPayment }}
                        </p>

                    </div>
                    <div class="mt-2 bg-gold/10 p-5">
                        <div class="flex justify-between">
                            <p>Pounds:</p>
                            <p>1.446.340 GBP</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Swiss franc:</p>
                            <p>1.647.275 CHF</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Chinese yuan:</p>
                            <p>13.381.200 CNY</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Dollar:</p>
                            <p>1.836.975 USD</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Swedish krona:</p>
                            <p>20.076.000 SEK</p>
                        </div>
                        <div class="flex justify-between">
                            <p>The Norwegian crown:</p>
                            <p>20.586.125 NOK</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-10 bg-gold/10 py-8">
                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap gap-4 justify-center md:gap-10 lg:gap-20 max-w-5xl mx-auto">
                        <div v-show="property?.propertyDetails.usableArea"
                            class="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                            <img src="@/assets/media/images/website/house.svg" class="h-10 w-10" alt="meters">
                            <div class="text-xs">
                                <p class="font-medium">{{ $t('property.home') }}</p>
                                <p class="text-gray-700">{{ property?.propertyDetails.usableArea }}<sup>2</sup></p>
                            </div>
                        </div>
                        <div v-show="property?.propertyDetails.plotSize"
                            class="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                            <img src="@/assets/media/images/website/plano.svg" class="h-10 w-10" alt="plot">
                            <div class="text-xs">
                                <p class="font-medium">{{ $t('property.plot') }}</p>
                                <p class="text-gray-700">{{ property?.propertyDetails.plotSize }}<sup>2</sup></p>
                            </div>
                        </div>
                        <div v-show="property?.propertyDetails.bedrooms"
                            class="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                            <img src="@/assets/media/images/website/bed.svg" class="h-10 w-10" alt="bedrooms">
                            <div class="text-xs">
                                <p class="font-medium">Bedrooms</p>
                                <p class="text-gray-700">{{ property?.propertyDetails.bedrooms }}</p>
                            </div>
                        </div>
                        <div v-show="property?.propertyDetails.bathrooms"
                            class="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                            <img src="@/assets/media/images/website/bath.svg" class="h-10 w-10" alt="baths">
                            <div class="text-xs">
                                <p class="font-medium">Baths</p>
                                <p class="text-gray-700">{{ property?.propertyDetails.bathrooms }}</p>
                            </div>
                        </div>
                        <div v-show="property?.propertyDetails.pool"
                            class="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                            <img src="@/assets/media/images/website/pool.svg" class="h-10 w-10" alt="pool">
                            <div class="text-xs">
                                <p class="font-medium">{{ $t('property.pool') }}</p>
                                <p class="text-gray-700">{{ property?.propertyDetails.pool }}</p>
                            </div>
                        </div>
                        <div v-show="property?.propertyDetails.parking" 
                            class="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                            <img src="@/assets/media/images/website/garaje.svg" class="h-10 w-10" alt="parking">
                            <div class="text-xs">
                                <p class="font-medium">{{ $t('property.parking') }}</p>
                                <p class="text-gray-700">{{ property?.propertyDetails.parking }}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="container mx-auto px-4 py-12 max-w-4xl">
                    <h1 class="font-work-sans text-2xl md:text-3xl lg:text-4xl font-normal text-center">
                        {{ property?.title }}
                    </h1>
                    <p class="font-work-sans text-base md:text-lg mt-6 text-gray-700 leading-relaxed text-center"
                        :class="isExpanded ? '' : 'line-clamp-5'">
                        {{ property?.description }}

                    </p>
                    <div class="mt-8 flex justify-center">
                        <button @click="isExpanded = !isExpanded"
                            class="px-8 py-3 border border-gray-900 transition-all duration-300 ease-in-out text-gray-900 hover:bg-gray-900 hover:text-white uppercase tracking-wider font-medium flex items-center gap-2">
                            <span>{{ isExpanded ? $t('property.less-info') : $t('property.more-info') }}</span>
                            <font-awesome-icon icon="fa-solid fa-angle-right"
                                class="ml-2 transform transition-transform duration-300 ease-in-out"
                                :class="isExpanded ? 'rotate-270' : 'rotate-90'" />
                        </button>
                    </div>

                </div>
            </div>


            <div class="container mx-auto px-4 py-12 max-w-6xl">
                <h2
                    class="text-center font-dm-serif-display text-3xl md:text-4xl font-semibold italic text-gray-800 mb-8">
                    {{ $t('property.features') }}
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">

                    <div v-for="feature in features" :key="feature.name"
                        class="flex justify-between items-center gap-4">
                        <div class="text-sm md:text-base flex items-center gap-2 flex-1">
                            <div
                                class="bg-gold flex justify-center items-center text-white h-5 w-5 min-w-5 text-xs rounded-full">
                                <font-awesome-icon icon="fa-solid fa-check" />
                            </div>
                            <span class="text-gray-800">
                                {{ feature.name }}
                            </span>
                        </div>
                        <p v-if="feature.value" class="font-semibold text-gray-900 text-sm md:text-base">{{
                            feature.value }}</p>
                    </div>

                </div>
            </div>

            <div id="map" class="container mx-auto  px-4 py-12">
                <h2
                    class="text-center font-dm-serif-display text-3xl md:text-4xl font-semibold italic text-gray-800 mb-8">
                    {{ $t('property.location') }}
                </h2>
                <div class="max-w-5xl mx-auto">
                    <Sitemap :address="location" />
                </div>
            </div>


            <div class="bg-gold/10 mt-12">
                <div class="container mx-auto px-4 py-12">
                    <div class="flex flex-col items-center gap-5 mb-10">
                        <img src="@/assets/img/sde-no_bg-web.png" alt="contact" class="h-20 md:h-24">
                        <h2
                            class="font-dm-serif-display text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 text-center">
                            {{ $t('property.make') }} <span class="italic lowercase">{{ $t('property.enquiry') }}</span>
                        </h2>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                        <div class="flex flex-col w-full max-w-sm mx-auto lg:mx-0">
                            <div class="bg-white shadow-sm">
                                <img src="@/assets/media/images/website/img-contact-martyna@2x.jpg" class="w-full"
                                    alt="contact">
                                <div class=" p-4 ">
                                    <p class="text-2xl font-dm-serif-display font-semibold"><em>Martyna Kamińska</em>
                                    </p>
                                    <p class="uppercase text-gold mt-2 ">{{ $t('property.your-agent') }}</p>
                                    <p class="font-light text-base mt-3 flex items-center gap-2"> <font-awesome-icon
                                            icon="fa-solid fa-mobile-screen-button" class="text-gold" /> +34 622 919 887
                                    </p>
                                    <p class="font-light text-base mt-2 flex items-center gap-2"> <font-awesome-icon
                                            icon="fa-solid fa-envelope" class="text-gold" />
                                        info@mkpremiumproperties.com
                                    </p>

                                </div>
                            </div>

                            <div class=" mt-4">
                                <button
                                    class="bg-green-600 w-full hover:bg-green-500 text-white p-3 flex items-center gap-2 justify-center"><font-awesome-icon
                                        icon="fa-brands fa-whatsapp" class="text-3xl" /> {{
                                            $t('property.contact-whatsapp') }} </button>
                            </div>
                        </div>

                        <div class="w-full max-w-2xl lg:mt-10 mx-auto lg:mx-0">

                            <div class="flex flex-col gap-5">
                                <input type="text"
                                    class="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                    :placeholder="$t('about-card.name') + ' *'">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input type="email"
                                        class="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                        :placeholder="$t('about-card.email') + ' *'">
                                    <input type="text"
                                        class="p-4 bg-white border border-gray-200 focus:border-gold outline-none transition-colors"
                                        :placeholder="$t('about-card.phone')">
                                </div>

                                <textarea name="" rows="4" :placeholder="$t('about-card.message') + ' *'"
                                    class="p-4 bg-white appearance-none border border-gray-200 focus:border-gold outline-none transition-colors"></textarea>
                                <div>
                                    <label class="group flex items-start cursor-pointer">
                                        <input type="checkbox" class="sr-only" />
                                        <span
                                            class="flex h-8 w-8 min-w-8 items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-black group-has-checked:border-black transition duration-300 ease-in-out">
                                            <svg class="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                        <p class="text-xs text-start w-full ps-3 text-gray-700 ">
                                            {{ $t('about-card.about-the-policy') }}<span
                                                class="underline font-medium">{{ $t('about-card.privacy-policy')
                                                }}</span>.
                                            {{ $t('about-card.information') }}
                                        </p>
                                    </label>
                                </div>
                                <button
                                    class="bg-gold text-white py-3 px-10 hover:bg-gold/80 hover:text-black transition-colors uppercase font-semibold tracking-widest">{{
                                        $t('contact') }}</button>
                                <div>
                                    <textarea class="p-4 w-full appearance-none text-xs border border-gray-200" rows="2"
                                        readonly>{{ $t('about-card.policy') }}</textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="container mx-auto px-4 py-12">
                <h2 class="text-center text-3xl md:text-4xl font-bold font-dm-serif-display mb-10">
                    {{ $t('property.similar') }} <em class="text-gold">{{ $t('property.properties') }}</em>
                </h2>

                <div class="max-w-3xl mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <PropertyCard v-for="property in API.slice(0, 2)" :key="property.id" :card-data="property" />
                    </div>

                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
.property-slider :deep(.swiper-button-next),
.property-slider :deep(.swiper-button-prev) {
    color: white;
}

.property-slider :deep(.swiper-pagination-bullet-active) {
    background-color: #c9a55a;
}
</style>
