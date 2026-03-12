<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { properties } from '../../../dummy-data/API';
import Multiselect from 'vue-multiselect';
import { ref, watch,onMounted } from 'vue';
import { computed } from 'vue';
import axios from 'axios';
import { propertiesApi } from '@/utils/api';
const allProperties = ref([])
const form = ref({
    status: [],
    towns: [],
    types: [],
    province: [],
    zone: [],
    bedrooms: '',
    bathrooms: '',
    priceFrom: '',
    priceUpTo: '',
    reference: '',
    pool: false,
    orientation: '',
    plot: '',
    newListing: true,
    built: ''
});
onMounted(async() => {
    try {
    const responce = await propertiesApi.get('/properties')
    allProperties.value = responce.data
    } catch (error) {
        console.log(error)
    }
})
const filteredProperties = computed(() => {
  if (!allProperties.value || !allProperties.value.length) return []
  return  allProperties.value.filter(property => {
    if (form.value.status.length) {
      const match = form.value.status.some(s =>
        property.status.includes(s)
      )
      if (!match) return false
    }
    if (form.value.towns.length) {
      const townValues = form.value.towns.map(t => t.label)
      if (!townValues.includes(property.town.label)) return false
    }
    if (form.value.types.length) {
      const typeValues = form.value.types.map(t => t.label)
      if (!typeValues.includes(property.type)) return false
    }
    if (form.value.bedrooms) {
      if (form.value.bedrooms && property.propertyDetails.bedrooms < +form.value.bedrooms) return false
    }
    if (form.value.bathrooms) {
      if (form.value.bathrooms && property.propertyDetails.bathrooms < +form.value.bathrooms) return false
    }
    if (form.value.priceFrom) {
      if (Math.floor(property.price) < Math.floor(form.value.priceFrom)) return false
    }
    if (form.value.priceUpTo) {
      if (Math.ceil(property.price) > Math.ceil(form.value.priceUpTo)) return false
    }
    if (form.value.reference) {
      if (!property.reference.toLowerCase().includes(form.value.reference.toLowerCase()))
        return false
    }
    if (form.value.pool) {
      if (!property.propertyDetails.pool) return false
    }
    if (form.value.plot) {
      if (!property.propertyDetails.plot) return false
    }
    if (form.value.built) {
      if (!property.propertyDetails.built) return false
    }
    return true
  })
})

</script>
<template>
    <div>
        <Navbar />
        <div class="pt-32 flex justify-center">
            <h1 class="text-4xl font-semibold font-dm-serif-display">{{ $t("properties-filter.advance-search") }}</h1>
        </div>

        <div class="container mt-10 mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="flex flex-col">
                    <label for="refrence">{{ $t("properties-filter.reference") }}</label>
                    <input v-model="form.reference" type="text" name="refrence" id="refrence" :placeholder="$t('properties-filter.reference')"
                        class="border border-gray-300 p-3 focus:outline-none">
                </div>
                <div class="flex flex-col">
                    <label for="status">{{ $t("properties-filter.status") }}</label>
                    <select v-model="form.status" name="status" id="status" class="border border-gray-300 p-3.5 focus:outline-none">
                        <option value="">Select</option>
                        <option value="">{{ $t("properties-filter.new-build") }}</option>
                        <option value="">{{ $t("properties-filter.resale") }}</option>
                    </select>
                </div>

                <div class="flex flex-col">

                    <div class="flex justify-center flex-col   ">
                        <label for="type">{{ $t("properties-filter.types") }}</label>
                        <div class="border border-gray-300 p-3">
                            <Multiselect v-model="form.types" :options="properties.type" label="label" track-by="value"
                                :placeholder="$t('properties-filter.types')" :multiple="true" :searchable="false" :taggable="true"
                                :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                                :max-height="250" open-direction="auto" :append-to-body="true" class="w-full  bg-white">

                                <template #tag="{ option, remove }">
                                    <span
                                        class="inline-flex items-center text-sm bg-blue-100 text-black border border-gray-500 rounded-md px-3 py-1 mr-1 mb-1">
                                        {{ option.label }}
                                        <button type="button" @click.stop="remove(option)"
                                            class="ml-2 text-sm text-gray-500 hover:text-gray-700">
                                            ×
                                        </button>
                                    </span>
                                </template>
                            </Multiselect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-t border-gray-300 my-8" />
        <div>
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div class="flex flex-col">
                        <label for="province">{{ $t("properties-filter.province") }}</label>
                        <div class="border border-gray-300 p-3">
                            <Multiselect v-model="form.province" :options="properties.provience" label="label"
                                track-by="value" :placeholder="$t('properties-filter.province')" :multiple="true" :searchable="false"
                                :taggable="true" :close-on-select="false" :clear-on-select="false"
                                :preserve-search="true" :max-height="250" open-direction="auto" :append-to-body="true"
                                class="w-full  bg-white">

                                <template #tag="{ option, remove }">
                                    <span
                                        class="inline-flex items-center text-sm bg-blue-100 text-black border border-gray-500 rounded-md px-3 py-1 mr-1 mb-1">
                                        {{ option.label }}
                                        <button type="button" @click.stop="remove(option)"
                                            class="ml-2 text-sm text-gray-500 hover:text-gray-700">
                                            ×
                                        </button>
                                    </span>
                                </template>
                            </Multiselect>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="towns">{{ $t("properties-filter.towns") }}</label>
                        <div class="border border-gray-300 p-3">
                            <Multiselect v-model="form.towns" :options="properties.towns" label="label" track-by="value"
                                :placeholder="$t('properties-filter.towns')" :multiple="true" :searchable="false" :taggable="false"
                                :close-on-select="true" :clear-on-select="false" :preserve-search="true"
                                :max-height="250" open-direction="auto" :append-to-body="true" class="w-full  bg-white">

                                <template #tag="{ option, remove }">
                                    <span
                                        class="inline-flex items-center text-sm bg-blue-100 text-black border border-gray-500 rounded-md px-3 py-1 mr-1 mb-1">
                                        {{ option.label }}
                                        <button type="button" @click.stop="remove(option)"
                                            class="ml-2 text-sm text-gray-500 hover:text-gray-700">
                                            ×
                                        </button>
                                    </span>
                                </template>
                            </Multiselect>
                        </div>
                    </div>

                    <div class="flex flex-col">

                        <div class="flex justify-center flex-col   "><label for="zone">{{ $t("properties-filter.zone") }}</label>
                            <div class="border border-gray-300 p-3">
                                <Multiselect v-model="form.zone" :options="properties.zones" label="label"
                                    track-by="value" :placeholder="$t('properties-filter.zone')" :multiple="true" :searchable="false"
                                    :taggable="true" :close-on-select="false" :clear-on-select="false"
                                    :preserve-search="true" :max-height="250" open-direction="auto"
                                    :append-to-body="true" class="w-full  bg-white">

                                    <template #tag="{ option, remove }">
                                        <span
                                            class="inline-flex items-center text-sm bg-blue-100 text-black border border-gray-500 rounded-md px-3 py-1 mr-1 mb-1">
                                            {{ option.label }}
                                            <button type="button" @click.stop="remove(option)"
                                                class="ml-2 text-sm text-gray-500 hover:text-gray-700">
                                                ×
                                            </button>
                                        </span>
                                    </template>
                                </Multiselect>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="container mt-10 mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div class="flex flex-col">
                        <label for="price-form">{{ $t("properties-filter.price-from") }}</label>
                        <select v-model="form.priceFrom" name="price-form" id="price-form"
                            class="border border-gray-300 p-3.5 focus:outline-none">
                            <option value="">All</option>

                            <option v-for="(price, index) in properties.price" :key="index" :value="price">{{
                                price.label }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="bathrooms">{{ $t("properties-filter.bathrooms") }}</label>
                        <select v-model="form.bathrooms" name="bathrooms" id="bathrooms" class="border border-gray-300 p-3.5 focus:outline-none">
                            <option value=""></option>

                            <option v-for="n in 4" :key="n" :value="n">{{ n }}
                            </option>
                            <option value="5+">5+</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="m2-built">{{ $t("properties-filter.m2-built") }}</label>
                        <select v-model="form.built" name="m2-built" id="m2-built" class="border border-gray-300 p-3.5 focus:outline-none">
                            <option value=""></option>
                            <option value="">0-90 m2</option>
                            <option value="">90-120 m2</option>
                            <option value="">120-200 m2</option>
                            <option value="">200+ m2</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="price-to">{{ $t("properties-filter.price-up-to") }}</label>
                        <select v-model="form.priceUpTo" name="price-to" id="price-to" class="border border-gray-300 p-3.5 focus:outline-none">
                            <option value="">All</option>

                            <option v-for="(price, index) in properties.price" :key="index" :value="price">{{
                                price.label }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="bedrooms">{{ $t("properties-filter.bedrooms") }}</label>
                        <select v-model="form.bedrooms" name="bedrooms" id="bedrooms" class="border border-gray-300 p-3.5 focus:outline-none">
                            <option value=""></option>

                            <option v-for="n in 4" :key="n" :value="n">{{ n }}
                            </option>
                            <option value="5+">5+</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="m2-plot">{{ $t("properties-filter.m2-plot") }}</label>
                        <select v-model="form.plot" name="m2-plot" id="m2-plot" class="border border-gray-300 p-3.5 focus:outline-none">
                            <option value=""></option>
                            <option value="">0-1.000 m2</option>
                            <option value="">1.000-2.000 m2</option>
                            <option value="">2.000-5.000 m2</option>
                            <option value="">5.000-10.000 m2</option>
                            <option value="">10.000-20.000 m2</option>
                            <option value="">20.000+ m2</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="new-listing">{{ $t("properties-filter.new-listing") }}</label>
                        <select v-model="form.newListing" name="new-listing" id="new-listing"
                            class="border border-gray-300 p-3.5 focus:outline-none">
                            <option value=""></option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="pool">{{ $t("properties-filter.pool") }}</label>
                        <select v-model="form.pool" name="pool" id="pool" class="border border-gray-300 p-3.5 focus:outline-none">
                            <option value=""></option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="orientation">{{ $t("properties-filter.orientation") }}</label>
                        <select v-model="form.orientation" name="orientation" id="orientation"
                            class="border border-gray-300 p-3.5 focus:outline-none">
                            <option value=""></option>
                            <option v-for="(orientation, index) in properties.oriantation" :key="index"
                                :value="orientation.value">{{ orientation.label }}</option>

                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class=" border-t border-gray-300 my-10 " />
        <div class="flex items-center flex-col my-10  gap-10">
            <div>{{filteredProperties.length + $t("properties-filter.found-property") }}</div>
            <button
                class="bg-gold  text-white px-10 py-3 w-100 hover:text-black hover:bg-gold/80 text-sm text-normal uppercase transition-all duration-300 cursor-pointer">{{ $t("properties-filter.search") }}</button>
        </div>
        <Footer />
    </div>
</template>
<style>
.multiselect__content-wrapper {
    position: absolute !important;
    max-height: 250px;
    max-width: 100%;
    width: 220px;
    padding: 10px;
    border: 1px solid #ccc;
    overflow-y: auto;
    background: white;
    border-radius: 6px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    z-index: 99999;
}

.multiselect__content {
    max-height: inherit;
}


.multiselect__input:focus {
    outline: none;
}
</style>