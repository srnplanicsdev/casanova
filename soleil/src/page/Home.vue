<script setup>
import Hero from '@/components/home/Hero.vue';
import Navbar from '@/components/Navbar.vue'
import NewPropertyCard from '../components/home/NewPropertyCard.vue'
import { ref, onMounted } from 'vue';
import image1 from '@/assets/media/images/website/banner-home-01.jpg';
import image2 from '@/assets/media/images/website/banner-home-02.jpg';
import image3 from '@/assets/media/images/website/banner-home-03.jpg';
import image4 from '@/assets/media/images/zonas/o_1jdupnacurdo1jl6e63qvb1dakc.jpg';
import image5 from '@/assets/media/images/zonas/o_1jdupnhf31fp6v6o1q7u1b8b1alpc.jpg';
import image6 from '@/assets/media/images/zonas/o_1jebkg3j5dcrjsg1bef1ve91botc.jpg';
import Discover from '@/components/home/Discover.vue';
import Agents from '@/components/home/Agents.vue';
import Testimony from '@/components/home/Testimony.vue';
import FeaturedProperty from '@/components/home/FeaturedProperty.vue';
import Footer from '@/components/Footer.vue';
import RegionSection from '@/components/home/RegionSection.vue';
import { api } from '@/utils/api';

const regions = ref([]);
const discover = ref([]);
const agent = ref([]);
const featured = ref([]);
const properties = ref([
    {
        id: 1,
        title: 'New Construction',
        type: 'Villas',
        image: image1,
        link: '#'
    },
    {
        id: 2,
        title: 'New Construction',
        type: 'Apartments',
        image: image2,
        link: '#'
    },
    {
        id: 3,
        title: 'Properties',
        type: 'Resale market',
        image: image3,
        link: '#'
    }
]);

const regionImage = ref([
    image4,
    image5,
    image6
]);


const fetchRegions = async () => {
    const response = await api.get('/posts&user=6765ef9d6aac6f782a03b64f&post_type=location-group-wise-properties&site_id=227&page-size=10');
    const data = await response.data;
    regions.value = data.map((item, index) => {
        return {
            ...item,
            image: regionImage.value[index]
        }
    });
}

const fetchAgent = async () => {
    const response = await api.get('/posts&user=6765ef9d6aac6f782a03b64f&post_type=Your reliable agent&site_id=227&page-size=10');
    const data = await response.data;
    agent.value = data[0];
}


const NewProperties = ref([]);
const fetchNewProperties = async () => {
    const response = await api.get('/posts&user=6765ef9d6aac6f782a03b64f&post_type=Categorywise property&site_id=227&page-size=10');
    const data = await response.data;
    NewProperties.value = data.map((item, index) => {
        return {
            ...item,
            image: properties.value[index].image
        }
    })
}
const fetchDiscover = async () => {
    const response = await api.get('/posts&user=6765ef9d6aac6f782a03b64f&post_type=Magic of the Costa Blanca&site_id=227&page-size=10');
    const data = await response.data;
    discover.value = data[0];

}
onMounted(async () => {
    await Promise.all([
        fetchRegions(),
        fetchNewProperties(),
        fetchDiscover(),
        fetchAgent(),

    ])
})
</script>

<template>
    <nav>
        <Navbar />
        <Hero />
        <div class="mt-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto px-4 gap-4">
            <div v-for="property in NewProperties" :key="property.id">
                <NewPropertyCard :cardData="property" />
            </div>
        </div>
        <div>
            <FeaturedProperty />
        </div>
        <div>
            <RegionSection :regions="regions" />
        </div>
        <Discover :discover="discover" />
        <div>
            <Agents :agent="agent" />
        </div>
        <Testimony />

        <Footer />
    </nav>
</template>