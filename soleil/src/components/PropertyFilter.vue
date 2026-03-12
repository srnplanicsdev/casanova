<script setup>
import { ref, computed, watch } from "vue";
import Multiselect from "vue-multiselect";
import { useRouter, useRoute } from "vue-router";
import { properties, API } from "../../dummy-data/API";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  properties: {
    type: Array,
    required: true
  }
})
const form = ref({
  status: [],
  towns: [],
  types: [],
  bedrooms: "",
  bathrooms: "",
  priceFrom: "",
  priceUpTo: "",
  reference: "",
  pool: false,
});
watch(
  () => route.query.status,
  (status) => {
    form.value.status = status ? [status] : [];
  },
  { immediate: true }
);

const filteredProperties = computed(() => {
  if (!props.properties || !props.properties.length) return []
  return  props.properties.filter(property => {
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
    return true
  })
})

const emit = defineEmits(["filter"]);
const resetFilters = () => {
  Object.assign(form.value, {
    status: [],
    towns: [],
    types: [],
    bedrooms: "",
    bathrooms: "",
    priceFrom: "",
    priceUpTo: "",
    reference: "",
    pool: false,
  });
};

const submitSearch = async () => {
  if (route.path !== "/properties") {
    await router.push({ name: "properties" });
  }

  console.log(filteredProperties.value)

  emit("filter", filteredProperties.value);
};

</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4 relative z-10">

    <form @submit.prevent="submitSearch" class="p-6">
      <div class="pb-2 lg:pb-2">
        <div class="flex flex-wrap justify-start pt-4 lg:pt-0 pb-0 gap-2">
          <div class="inline-flex">
            <label
              class="min-w-[95%] block relative cursor-pointer text-center transition-all duration-300 ease-in-out rounded-4xl backdrop-blur-sm opacity-70 hover:opacity-100 bg-white text-[#535353]"
              :class="form.status.includes('New Build')
                ? ' bg-gold!  opacity-100'
                : ''
                ">
              <span
                class="inline-block text-center px-8 py-3 uppercase tracking-[1.4px] transition-all duration-300 ease-in-out text-sm font-normal text-gray-900"
                :class="form.status.includes('New Build') ? ' text-white!' : ''">
                {{ $t("properties-filter.new-build") }}
              </span>

              <input type="checkbox" v-model="form.status" value="New Build" class="hidden" />

              <span
                class="absolute top-1/2 left-0 -translate-y-1/2 p-[12px_12px_11px] w-fit min-w-full max-w-full"></span>
            </label>
          </div>
          <div class="inline-flex">
            <label
              class="min-w-[95%] block relative cursor-pointer text-center text-[#535353] bg-white rounded-4xl backdrop-blur-sm opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out"
              :class="form.status.includes('Resale') ? 'bg-gold!  opacity-100' : ''
                ">
              <span
                class="inline-block text-center px-8 py-3 uppercase tracking-[1.4px] transition-all duration-300 ease-in-out text-sm font-normal text-gray-900"
                :class="form.status.includes('Resale') ? ' text-white!' : ''">
                {{ $t("properties-filter.resale") }}
              </span>

              <input type="checkbox" v-model="form.status" value="Resale" class="hidden" />

              <span
                class="absolute top-1/2 left-0 -translate-y-1/2 p-[12px_12px_11px] w-fit min-w-full max-w-full"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mb-2 py-2 px-3 md:divide-x md:divide-gray-300
 bg-white">
        <div class="flex justify-center items-center">
          <Multiselect v-model="form.towns" :options="properties.towns" label="label" track-by="value"
            :placeholder="$t('properties-filter.towns')" :multiple="true" :searchable="true" :taggable="true"
            :close-on-select="false" :clear-on-select="false" :preserve-search="true" :max-height="250"
            open-direction="auto" :append-to-body="false" class="w-full bg-white">
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

        <div class="flex justify-center items-center">
          <Multiselect v-model="form.types" :options="properties.type" label="label" track-by="value"
            :placeholder="$t('properties-filter.types')" :multiple="true" :searchable="false" :taggable="true"
            :close-on-select="false" :clear-on-select="false" :preserve-search="true" :max-height="220"
            open-direction="auto" :append-to-body="true" class="w-full bg-white">
            <template #tag="{ option, remove }">
              <span @click.stop="remove(option)"
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

        <select v-model="form.bedrooms" class="w-full p-2 appearance-none focus:outline-none border-0">
          <option value=""> {{ $t('properties-filter.bedrooms') }}</option>
          <option v-for="n in 4" :key="n" :value="n">{{ n }}</option>
          <option value="5">+5</option>
        </select>

        <select v-model="form.bathrooms" class="w-full p-2 appearance-none focus:outline-none border-0">
          <option value="">{{ $t('properties-filter.bathrooms') }}</option>
          <option v-for="n in 4" :key="n" :value="n">{{ n }}</option>
          <option value="5">+5</option>
        </select>
        <select v-model.number="form.priceFrom" class="w-full p-2 appearance-none focus:outline-none border-0">
          <option value="">{{ $t('properties-filter.price-from') }}</option>
          <option v-for="price in properties.price" :key="price.value" :value="price.value">
            {{ price.label.toLocaleString() }}
          </option>
        </select>
        <select v-model.number="form.priceUpTo" class="w-full p-2 appearance-none focus:outline-none border-0">
          <option value="">{{ $t('properties-filter.price-up-to') }}</option>
          <option v-for="price in properties.price" :disabled="form.priceFrom && price.value < form.priceFrom"
            :key="price.value" :value="price.value">
            {{ price.label.toLocaleString() }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 items-center bg-white min-h-16">
        <input type="text" v-model="form.reference" :placeholder="$t('properties-filter.reference')"
          class="w-full p-2 h-full focus:outline-none border-0 border-gray-300 text-sm" />
        <label class="flex items-center space-x-2 px-2">
          <label class="group flex items-start cursor-pointer">
            <input type="checkbox" v-model="form.pool" class="sr-only" />
            <span
              class="flex h-6.5 w-6.5 min-w-6.5 items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-gold group-has-checked:border-gold transition duration-300 ease-in-out">
              <svg class="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </label>
          <span class="text-sm text-gray-700">{{ $t('properties-filter.pool') }}</span>
        </label>
        <button type="button" @click="resetFilters" class="w-full p-2 h-full text-gray-700 text-sm underline">
          {{ $t("properties-filter.clean") }}
        </button>
        <button type="button" @click="router.push({ name: 'search' })"
          class="w-full p-2 h-full text-gray-700 text-sm underline">
          {{ $t("properties-filter.advanced-filter") }}
        </button>
        <div class="flex items-center h-full p-0 m-0 col-span-2">
          <button type="submit"
            class="w-full p-2 h-full capitalize tracking-[3px] text-white text-sm font-semibold flex items-center justify-center bg-gold">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            {{ $t("properties-filter.search") }}
          </button>
        </div>

      </div>
    </form>
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

.multiselect__input:focus-visible {
  outline: none !important;
}
</style>
