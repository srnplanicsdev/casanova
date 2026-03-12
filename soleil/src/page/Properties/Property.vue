<script setup>
import PropertyCard from '@/components/PropertyCard.vue';
import Navbar from '@/components/Navbar.vue';
import PropertyFilter from '@/components/PropertyFilter.vue';
import Footer from '@/components/Footer.vue';
import { API } from '../../../dummy-data/API';
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import NodePropertyCard from '@/components/NodePropertyCard.vue';
import { propertiesApi } from '@/utils/api';
const allProperties = ref([])
const filteredProperties = ref([])
const currentPage = ref(1)
const perPage = ref(12)


const totalPages = computed(() => {
  return Math.ceil(filteredProperties.value.length / perPage.value)
})

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredProperties.value.slice(start, end)
})

const handleFilter = (filtered) => {
  filteredProperties.value = filtered
  currentPage.value = 1
}
const handlePageChange = (page) => {
  currentPage.value = page
}

const handlePageProperties = (e) => {
   perPage.value = Number(e.target.value)
  currentPage.value = 1
}
const handleSort = (e) => {
  const value = e.target.value
  let sorted = [...filteredProperties.value]

  if (value === 'Lowest') {
    sorted.sort((a, b) => a.price - b.price)
  } else if (value === 'Highest') {
    sorted.sort((a, b) => b.price - a.price)
  } else {
    sorted.sort((a, b) => b._id.localeCompare(a._id))
  }
  filteredProperties.value = sorted
}


onMounted(async () => {
  try {
    const res = await propertiesApi.get("/properties")
    allProperties.value = res.data
    filteredProperties.value = res.data
  } catch (err) {
    console.error("Error fetching properties:", err)
  }
})
watch(allProperties, (newProps) => {
  filteredProperties.value = newProps;  
  handleSort({target: {value: 'Lowest'}})
}, { immediate: true })

</script>
<template>

    <Navbar />
    <div class="bg-gold/10 w-full">
        <div class="flex justify-center items-center pt-40 pb-10">
            <h1 class="text-4xl italic font-bold font-dm-serif-display">
                <span class="text-gold not-italic">{{ filteredProperties.length }}</span> {{ $t('properties') }}
            </h1>
        </div>

        <div class="pb-8">
            <div class="max-w-7xl mx-auto px-4">
                <PropertyFilter @filter="handleFilter" :properties="allProperties" />
            </div>
        </div>
    </div>

    <div class="flex justify-center">
        <div class="container mt-15">
            <div class="flex justify-between">
                <div>
                    <select name="" id=""  @change="handlePageProperties">
                        <option value="12" selected>12 {{ $t('properties') }}</option>
                        <option value="24">24 {{ $t('properties') }}</option>
                        <option value="36">36 {{ $t('properties') }}</option>
                    </select>
                </div>
                <div>
                    <span class="font-semibold text-sm pe-4">ORDER BY</span>
                    <select name="" id="" selected="Lowest price" @change="handleSort">
                        <option value="Lowest">{{ $t('order-by.lowest-price') }}</option>
                        <option value="Highest">{{ $t('order-by.highest-price') }}</option>
                        <option value="Latest">{{ $t('order-by.latest-price') }}</option>
                    </select>
                </div>
            </div>
            <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-5 place-content-center">
                <div v-for="property in api" :key="property.id" class="justify-self-center w-full">
                    <router-link :to="{ name: 'property', params: { id: property.id } }">
                        <PropertyCard :cardData="property" />
                    </router-link>
                </div>
            </div> -->
            <div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-5 place-content-center">
                <div v-for="property in paginatedProperties" :key="property._id" class="justify-self-center w-full">
                    <router-link :to="{ name: 'property', params: { id: property._id } }">
                        <NodePropertyCard :cardData="property" />
                    </router-link>
                </div>
                </div>
            </div>
            <div class="flex justify-center items-center my-10 gap-3 font-dm-serif-display">
                <button v-for="i in totalPages" :key="i" class="bg-gold/10  text-gold h-8 w-8 rounded-full"
                    :class="currentPage === i ? 'bg-gold! text-white!' : ''" @click="handlePageChange(i)">{{ i }}</button>
                <button class="bg-gold/10 text-gold h-8 w-8 rounded-full">
                    <font-awesome-icon icon="fa-solid fa-angle-right" />
                </button>
            </div>
        </div>

    </div>
    <Footer />
</template>
