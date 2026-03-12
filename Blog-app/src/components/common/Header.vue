<script setup>
import { ArrowUpRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/20/solid';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const navButtons = [
    {
        name: 'home',
        content: "Home"
    },
    {
        name: 'news',
        content: "News"
    },
    {
        name: 'podcast',
        content: "Podcasts"
    },
    {
        name: 'resource',
        content: "Resources"
    }

]
</script>
<template>
    <header>
        <div class="bg-neutral-900 flex justify-center p-5 text-center px-6">
            <span class="text-neutral-400 text-sm md:text-base">Subscribe to our Newsletter For New & latest Blogs and
                Resources</span>
            <ArrowUpRightIcon class=" h-5 md:h-6 w-5 md:w-6 text-yellow-400 shrink-0 ml-2" />
        </div>
        <nav
            class="flex items-center justify-between px-6 lg:px-41 bg-neutral-900 border-y border-neutral-700/50 text-white relative z-50">
            <div class="py-5 flex items-center ">
                <img src="@/assets/Group.png" alt="" class="w-10 lg:w-12 h-10 lg:h-12">
                <span class=" text-base lg:text-lg font-bold ps-2">FutureTech</span>
            </div>

            <div class="hidden md:flex">
                <RouterLink v-for="navbtn in navButtons" :key="navbtn.name" :to="{ name: navbtn.name }"
                    class=" border border-transparent text-neutral-400 px-3 lg:px-5 py-3"
                    active-class="text-white bg-neutral-950/60 border-neutral-700  rounded-lg ">
                    {{ navbtn.content }}
                </RouterLink>
            </div>


            <div class="flex md:hidden">
                <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-neutral-400 p-2">
                    <Bars3Icon v-if="!isMobileMenuOpen" class="h-8 w-8" />
                    <XMarkIcon v-else class="h-8 w-8" />
                </button>
            </div>

            <div class="hidden md:block">
                <button
                    class="bg-yellow-400 rounded-lg font-medium text-neutral-900 px-3 lg:px-5 py-2 lg:py-3 text-sm lg:text-base">
                    Contact Us
                </button>
            </div>
        </nav>

        <div v-if="isMobileMenuOpen"
            class="md:hidden bg-neutral-900 border-b border-neutral-700 px-6 py-4 flex flex-col gap-2">
            <RouterLink v-for="navbtn in navButtons" :key="navbtn.name" :to="{ name: navbtn.name }"
                @click="isMobileMenuOpen = false"
                class="block text-neutral-400 py-3 border-b border-neutral-800 last:border-0"
                active-class="text-white font-medium">
                {{ navbtn.content }}
            </RouterLink>
            <button class="mt-4 bg-yellow-400 rounded-lg font-medium text-neutral-900 px-5 py-3 text-center">
                Contact Us
            </button>
        </div>
    </header>

</template>