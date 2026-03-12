<script setup>
import router from '@/router';

</script>
<template>
  <div class=" my-10 flex justify-center">
    <div
      class=" container bg-[url('@/assets/media/images/website/bg-testimonios-home.jpg')] bg-cover bg-left bg-no-repeat max-h-full">
      <div class=" mt-6 p-12">
        <div class="p-4 p-lg-5 my-3 my-xl-4">
          <img src="@/assets/media/images/website/icon-literal.svg" alt="literal" />

          <h3 class="my-8">
            <div class="text-gold text-base ">{{ $t("testimonials") }}</div>
            <span class="text-black text-5xl font-dm-serif-display mt-2"> {{ $t("testimonial.title") }}
              <em>{{ $t("testimonial.title-span") }}</em> {{ $t("testimonial.say") }}</span>
          </h3>

          <button @click="router.push({ name: 'testimonials' })"
            class="mt-4 px-12 py-4 bg-transparent border border-black hover:bg-black hover:text-white text-black ">
            {{ $t("testimonial.read") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>