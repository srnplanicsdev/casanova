<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useLanguage } from "@/utils/useLanguage";
import { useFavoriteStore } from "@/stores/favorite";
import { useI18n } from "vue-i18n";

const router = useRouter();
const route = useRoute();
const store = useFavoriteStore();
const { t } = useI18n();

const propertiesDropdown = computed(() => [
  { label: t("view-all-properties"), name: "properties" },
  { label: t("new-build"), name: "properties", query: { status: "New Build" } },
  { label: t("resale"), name: "properties", query: { status: "Resale" } }
]);

const leftNavLinks = computed(() => [
  { label: t("home"), name: "home" },
  { label: t("properties"), dropdown: propertiesDropdown.value },
  { label: t("about-us"), name: "about-us" },
  { label: t("sell-with-us"), name: "sell-your-property" },
]);

const rightNavLinks = computed(() => [
  { label: t("services"), name: "services" },
  { label: t("testimonials"), name: "testimonials" },
  { label: t("contact"), name: "contact" },
]);


const { languages, currentLangCode, currentLanguage, setLanguage } = useLanguage();

const isMobileMenuOpen = ref(false);
const isPropertiesOpen = ref(false);
const isLanguageOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function toggleLanguage() {
  isLanguageOpen.value = !isLanguageOpen.value;
}

function selectLanguage(code) {
  setLanguage(code);
  isLanguageOpen.value = false;
}

function routeToHome() {
  if (route.path === "/") return;
  router.push({ name: "home" });
}

const getFlagUrl = (code) => new URL(`../assets/website/flags-rounded/${code}.svg`, import.meta.url).href;
</script>

<template>
  <header
    class="sticky top-0 left-0 z-40 w-full h-24 bg-white font-work-sans font-medium text-sm tracking-[1.4px] shadow-sm">
    <div class="xl:block absolute top-2 left-1/2 flex items-center -translate-x-1/2 cursor-pointer">
      <img src="@/assets/img/sde-no_bg-web.png" @click="routeToHome" alt="Soleildespagne"
        class="h-20 object-contain hidden xl:block" />
    </div>

    <div class="h-full w-full">
      <div class="flex items-center justify-between xl:justify-center h-full px-4 container mx-auto">
        <div class="xl:hidden">
          <img src="@/assets/img/sde-no_bg-web.png" @click="routeToHome" alt="Soleildespagne"
            class="h-16 object-contain" />
        </div>
        <button @click="toggleMobileMenu" class="xl:hidden p-2 text-gray-700 hover:text-gold focus:outline-none">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>


        <div class="hidden xl:flex justify-between w-full max-w-330 items-center space-x-4">
          <nav class="flex space-x-6 gap-4 items-center">
            <template v-for="link in leftNavLinks" :key="link.name">
              <div v-if="link.dropdown" class="relative group" @mouseenter="isPropertiesOpen = true"
                @mouseleave="isPropertiesOpen = false">
                <button class="text-gray-700 hover:text-gold uppercase flex items-center gap-1">
                  {{ link.label }}
                  <font-awesome-icon icon="fa-solid fa-chevron-down" class="text-xs transition-transform duration-300"
                    :class="{ 'rotate-180': isPropertiesOpen }" />
                </button>
                <div class="absolute left-0 pt-2 w-56 z-9999" v-show="isPropertiesOpen">
                  <ul class="bg-gold border border-gold rounded-md shadow-lg overflow-hidden">
                    <li v-for="item in link.dropdown" :key="item.name">
                      <router-link :to="{ name: item.name, query: item.query }"
                        class="block px-4 py-3 text-white transition-all duration-300 hover:bg-white hover:text-gold uppercase font-semibold text-xs">
                        {{ item.label }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <router-link v-else :to="{ name: link.name }" class="text-gray-700 uppercase hover:text-gold"
                active-class="text-gold! ">{{ link.label }}</router-link>
            </template>
          </nav>

          <div class="flex gap-8 items-center">
            <router-link v-for="link in rightNavLinks" :key="link.name" :to="{ name: link.name }"
              class="text-gray-700 uppercase hover:text-gold" active-class="text-gold!">
              {{ link.label }}
            </router-link>

            <router-link :to="{ name: 'favorites' }" class="relative inline-block hover:scale-110 transition-transform">
              <img src="@/assets/website/icon-favorites-header.svg" alt="favorites" class="inline-block h-6 w-6" />
              <span
                class="absolute -top-1 -right-1 inline-flex h-4 w-4 rounded-full bg-red-500 text-[10px] text-white justify-center items-center">{{
                  store.favorites.length }}</span>
            </router-link>

            <div class="relative inline-block">
              <button @click="toggleLanguage"
                class="p-1 rounded-full focus:outline-none hover:shadow-md transition-all">
                <img :src="getFlagUrl(currentLanguage.flag)" :alt="currentLanguage.name"
                  class="h-6 w-6 object-cover rounded-full" />
              </button>
              <ul v-show="isLanguageOpen"
                class="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <li v-for="lang in languages" :key="lang.code">
                  <button @click="selectLanguage(lang.code)"
                    class="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left">
                    <img :src="getFlagUrl(lang.flag)" :alt="lang.name" class="h-5 w-5 mr-2 rounded-full" />
                    {{ lang.name }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>


    <transition name="fade">
      <div v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 overflow-y-auto xl:hidden">
        <nav class="flex flex-col gap-6 text-center">
          <template v-for="link in leftNavLinks" :key="link.name">
            <div v-if="link.dropdown" class="flex flex-col gap-4">
              <span class="text-gold font-bold uppercase border-b pb-2">{{ link.label }}</span>
              <router-link v-for="item in link.dropdown" :key="item.name" :to="{ name: item.name, query: item.query }"
                @click="isMobileMenuOpen = false" class="text-xl font-semibold text-gray-800">
                {{ item.label }}
              </router-link>
            </div>
            <router-link v-else :to="{ name: link.name }" @click="isMobileMenuOpen = false"
              class="text-xl font-semibold text-gray-800 hover:text-gold">{{ link.label }}</router-link>
          </template>
          <hr class="border-gray-200" />
          <router-link v-for="link in rightNavLinks" :key="link.name" :to="{name:link.name}" @click="isMobileMenuOpen = false"
            class="text-xl font-semibold text-gray-800 hover:text-gold">
            {{ link.label }}
          </router-link>
        </nav>
        <div class="mt-8 flex justify-center gap-6 ">
          <router-link :to="{ name: 'favorites' }" @click="isMobileMenuOpen = false"
            class="flex items-center gap-2 text-gray-800">
            <span class="text-xl font-semibold">{{$t("favorites")}}</span>
            <span class="bg-red-500 text-white rounded-full px-2 text-xs">{{ store.favorites.length }}</span>
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
