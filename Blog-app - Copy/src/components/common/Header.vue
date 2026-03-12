<script setup>
import { ArrowUpRightIcon } from '@heroicons/vue/20/solid';
import { RouterLink } from 'vue-router';

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
        <div class="bg-neutral-900 flex justify-center p-5">
            <span class="text-neutral-400">Subscribe to our Newsletter For New & latest Blogs and Resources</span>
            <ArrowUpRightIcon class=" h-6 w-6 text-yellow-400" />
        </div>
        <nav class="flex items-center justify-between px-41 bg-neutral-900 opacity-98 text-white">
            <div class="p-5  flex items-center ">
                <img src="@/assets/Group.png" alt="" class="w-12 h-12">
                <span class=" text-lg font-bold ps-2">FutureTech</span>
            </div>
            <div>
                <RouterLink v-for="navbtn in navButtons" :key="navbtn.name" :to="{ name: navbtn.name }"
                    class=" border border-transparent text-neutral-400 px-5 py-3"
                    active-class="text-white bg-neutral-950/60 border-neutral-700! border rounded-lg ">
                    {{ navbtn.content }}
                </RouterLink>
            </div>
            <div>
                <button class="bg-yellow-400 rounded-lg font-medium text-neutral-900 px-5 py-3 ">
                    Contact Us
                </button>
            </div>
        </nav>
    </header>

</template>