<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import PropertyCard from "@/components/PropertyCard.vue";
import { API } from "../../../../dummy-data/API";
import Footer from "@/components/Footer.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const route = useRoute();
const router = useRouter();
const loading = ref(true);

const regions = ref([]);

const fetchRegions = async () => {
    loading.value = true;
    try {
        const response = await axios.get("https://my3.optima-crm.com/yiiapp/frontend/web/index.php?r=cms/posts&user=6765ef9d6aac6f782a03b64f&post_type=location-group-wise-properties&site_id=227&page-size=10");
        regions.value = await response.data;

    } catch (error) {
        console.log(error);
    }
    finally {
        loading.value = false;
    }
};
const langKey = computed(() =>
    route.params.lang?.toUpperCase() || "EN"
);

const slug = computed(() => route.params.slug);

const region = computed(() =>
    regions.value.find(
        r => r.slug?.[langKey.value] === slug.value
    )
);

onMounted(async () => {
    await fetchRegions();
});

</script>

<template>
    <Navbar />
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
        <PulseLoader :loading="loading" color="#D4AF37" :size="50" />
    </div>
    <div v-else-if="region">
        <div
            class="bg-[url('@/assets/media/images/banner/banner_1.jpg')] brightness-90 w-full h-screen bg-cover bg-center text-white text-center">
            <div class="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto px-4">
                <div class="max-w-4xl  mx-auto">
                    <strong class="text-5xl  lg:text-6xl italic font-bold font-dm-serif-display">{{
                        region.title?.[langKey] }}</strong>
                </div>
            </div>
        </div>
        <div class="container mx-auto px-4 py-10">
            <div>
                <h1 class="text-3xl font-medium font-work-sans">{{ region.title?.[langKey] }}</h1>
                <div v-html="region.content?.[langKey]"></div>
            </div>
        </div>
        <div class="container mx-2 lg:mx-20 mt-10">
            <div class="mb-10 flex justify-center">
                <h2 class="text-3xl font-semibold italic font-dm-serif-display">Properties</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="property in API" :key="property.id">
                    <PropertyCard :cardData="property" />
                </div>
            </div>
        </div>
        <Footer />
    </div>

    <div v-else class="min-h-screen flex items-center justify-center text-gray-500">
        Region not found
    </div>




</template>
