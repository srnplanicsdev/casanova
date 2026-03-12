<script setup>
const props = defineProps({
  cardData: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="py-15 px-6 flex flex-col gap-6">
    <div v-if="cardData.image">
      <img :src="cardData.image" class="h-10 w-10" :alt="cardData.title">
    </div>
    <div v-else>
      <span class="font-dm-serif-display font-semibold text-lg text-gold">{{ cardData.id }}</span>
    </div>
    <div class=" italic font-semibold text-gray-800 font-dm-serif-display text-2xl w-full border-b border-gray-300">
      {{ cardData.title }}
    </div>
    <p class=" font-work-sans font-light text-base mt-3">
      {{ cardData.description }}
    </p>
  </div>

</template>