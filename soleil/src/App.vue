<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue';
const showOptions = ref(false);
const cookie = ref(localStorage.getItem('cookie'));
const setCookie = () => {
  localStorage.setItem('cookie', 'true');
  cookie.value = 'true';
}

watch(cookie, (newVal) => {
  if (newVal) {
    showOptions.value = true;
  }
})

</script>

<template>

  <div class="scrollbar-gold ">
    <RouterView />
  </div>
  <div class="fixed bottom-4 right-4 w-20 h-20 z-9699">
    <a href="https://wa.me/34622919887/?text=" target="_blank">
      <img src="@/assets/media/images/website/icon-whatsp-property.svg" alt="">
    </a>
  </div>
  <div class="fixed bottom-4 left-4 transition-all duration-800 ease-in-out p-8 w-100 bg-white rounded-xl z-9999"
    v-show="!cookie">
    <div class="flex flex-col gap-5">
      <h1 class="text-lg font-semibold">{{ $t("cookies.title") }}</h1>
      <p class="text-sm">
        {{ $t("cookies.description") }}

      </p>
      <router-link :to="{ name: 'cookies' }">
        <span class="text-gold font-semibold text-sm hover:text-black transition-all duration-300 cursor-pointer">{{
          $t("cookies.more-information") }}</span>
      </router-link>
      <div v-show="showOptions" class="grid grid-cols-2 gap-2 text-xs ease-in-out transition-all duration-900">
        <div class="flex items-center gap-2">
          <input type="checkbox" name="" id="" checked disabled>
          <label for="">{{ $t("cookies.necessary") }}</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="" id="">
          <label for="">{{ $t("cookies.site-preferences") }}</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="" id="">
          <label for="">{{ $t("cookies.analytics") }}</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="" id="">
          <label for="">{{ $t("cookies.marketing") }}</label>
        </div>
      </div>

      <div class="flex flex-col gap-5">
        <button
          class="bg-black hover:bg-white/10 border border-black hover:text-black transition-all duration-300 text-white px-5 py-2 rounded-md text-sm"
          @click="setCookie">{{ $t("cookies.accept-all") }}</button>
        <button
          class="bg-white hover:bg-black border border-black hover:text-white transition-all duration-300 text-black px-5 py-2 rounded-md text-sm"
          @click="showOptions = !showOptions">{{ $t("cookies.customise-cookies") }}</button>
        <button
          class="bg-white hover:bg-black border border-black hover:text-white transition-all duration-300 text-black px-5 py-2 rounded-md text-sm"
          @click="setCookie">{{ $t("cookies.reject-cookies") }}</button>
      </div>
    </div>

  </div>
</template>
