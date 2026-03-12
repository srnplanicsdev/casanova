<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Find us'
  },
  address: {
    type: String,
    default: 'C. Ifach, 18, 03590 Altea, Alicante'
  },
  height: {
    type: String,
    default: '600px'
  }
})


const mapSrc = computed(() => {
  const encodedAddress = encodeURIComponent(props.address)
  return `https://www.google.com/maps?q=${encodedAddress}&output=embed`
})
</script>

<template>
  <section class="w-full bg-white">
    <div class="w-full" :style="{ height }">
      <iframe class="w-full h-full border-0" :src="mapSrc" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
    </div>
  </section>
</template>
