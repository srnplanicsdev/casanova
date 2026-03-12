<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';
import { useFavoriteStore } from '@/stores/favorite';
import PropertyCard from '@/components/PropertyCard.vue';
import NodePropertyCard from '@/components/NodePropertyCard.vue';
const openModal = ref(false);
const isDialogOpen = ref(false);
const store = useFavoriteStore();

const removeFavorites = () => {
    store.clearFavorites();
    isDialogOpen.value = false;
}
</script>
<template>
    <Navbar />
    <div class="pt-30 flex flex-col items-center justify-center px-4">
        <span class="text-2xl md:text-3xl text-gray-800 font-semibold font-dm-serif-display text-center">{{
            $t("favorites") }}</span>
        <div class="text-lg md:text-xl text-gold font-normal font-work-sans uppercase text-center">{{
            $t("favorites-page.found") }} {{
                store.favorites.length }}
            {{ $t("properties") }}</div>

        <div class="flex flex-col sm:flex-row gap-4 lg:gap-5 mt-10 w-full sm:w-auto">
            <button
                class="bg-white uppercase w-full sm:w-64 md:w-80 text-red-500 border hover:bg-red-500 hover:text-white border-red-500 py-3 md:py-4 px-10"
                @click="isDialogOpen = true" :disabled="store.favorites.length === 0">{{
                    $t("favorites-page.remove-all-favorites") }}
            </button>
            <div class="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4"
                v-if="isDialogOpen">
                <div class="bg-white w-full sm:w-100 max-w-lg rounded-2xl shadow-lg" @click.stop>
                    <div class="flex flex-col bg-gold/10 px-6 py-3 ">

                        <div class="text-xl font-normal flex justify-center">{{
                            $t("favorites-page.remove-all-favorites") }}?</div>
                        <div class="flex justify-center gap-5 mt-10">
                            <button @click="isDialogOpen = false"
                                class=" bg-blue-500 rounded-md  px-5 font-light text-white text-xl py-2"><font-awesome-icon
                                    icon="fa-solid fa-xmark" />{{ $t("favorites-page.cancel") }}</button>
                            <button @click="removeFavorites"
                                class=" bg-red-500 rounded-md  px-5 font-light  text-white text-xl py-2"><font-awesome-icon
                                    icon="fa-solid fa-check" />{{ $t("favorites-page.confirm") }}</button>
                        </div>
                    </div>

                </div>
            </div>
            <button @click="openModal = true"
                class="bg-gold uppercase w-full sm:w-64 md:w-80 text-white border hover:bg-gold/80 hover:text-black border-gold py-3 md:py-4 px-10">{{
                    $t("favorites-page.send-properties") }}</button>
        </div>
        <div v-if="openModal" @click="openModal = false"
            class="fixed inset-0 backdrop-blur-sm  bg-black/50 flex items-center justify-center z-50 p-4">
            <div class="bg-white w-full sm:w-125 max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto  transform from-top-0 to-bottom-0 transition-all duration-300 ease-in-out"
                @click.stop>
                <div class="flex justify-between bg-gold/10 px-6 py-3 items-center">

                    <div class="text-xl font-normal">{{ $t("favorites-page.send-properties") }}</div>
                    <button @click="openModal = false" class=" font-light text-2xl py-2"><font-awesome-icon
                            icon="fa-solid fa-xmark" /></button>
                </div>
                <div class="p-6">
                    <div class="mt-2">
                        <label for="name" class="text-gray-400 uppercase text-sm">{{ $t("about-card.name") +
                            "*" }}</label>
                        <input type="text" name="name" class="border border-gray-300 rounded w-full p-2"
                            :placeholder="$t('about-card.name')">
                    </div>
                    <div class="mt-2">
                        <label for="email" class="text-gray-400 uppercase text-sm">{{ $t("about-card.email") +
                            "*" }}</label>
                        <input type="email" name="email" class="border border-gray-300 rounded w-full p-2"
                            :placeholder="$t('about-card.email')">
                    </div>
                    <div class="mt-2">
                        <label for="message" class="text-gray-400 uppercase text-sm">{{
                            $t("about-card.message") }}</label>
                        <textarea name="message" id="" cols="30" rows="3" :placeholder="$t('about-card.message')"
                            class="border border-gray-300 rounded w-full p-2"></textarea>
                    </div>
                    <div class="mt-4">
                        <label class="group flex  items-start cursor-pointer">
                            <input type="checkbox" class="sr-only" />
                            <span
                                class="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-black group-has-checked:border-black transition duration-300 ease-in-out">
                                <svg class="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                            <p class="text-xs text-start w-full ps-3 text-gray-700 ">
                                {{ $t("about-card.about-the-policy") }}<span class="underline font-medium">{{
                                    $t("about-card.privacy-policy") }}</span>.
                                {{ $t("about-card.information") }}
                            </p>
                        </label>
                    </div>
                    <div class="mt-4">
                        <textarea class=" w-full appearance-none text-xs bg-gray-50 border border-gray-200" rows="2"
                            readonly>{{ $t("about-card.policy") }}</textarea>
                    </div>
                </div>
                <div class="flex justify-end  bg-gold/10 px-6 py-3">
                    <button
                        class="bg-gold uppercase w-40 text-white border hover:bg-gold/80 hover:text-black border-gold py-4 px-5">{{
                            $t("favorites-page.send") }}</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="store.favorites.length > 0">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 container mx-auto px-4">
            <div v-for="favorite in store.favorites" :key="favorite.id">
                <router-link :to="{ name: 'property', params: { id: favorite._id } }">
                    <NodePropertyCard :cardData="favorite" />
                </router-link>
            </div>
        </div>
    </div>
    <div v-else class="my-20 md:my-50 flex items-center justify-center px-4">
        <span class="text-xl md:text-2xl text-gray-800 font-light font-work-sans text-center">{{
            $t("favorites-page.no-properties-found")
        }}</span>
    </div>
    <Footer />
</template>