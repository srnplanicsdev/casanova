<script setup>
import { ArrowUpRightIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    chip:{
        type:Object,
        required: true
    }
})
</script>
<template>
     <div
                class="group relative rounded-xl border gap-5 border-neutral-700 bg-neutral-800/30 p-10 hover:border-yellow-400 transition">
                <div class="flex  justify-between items-center">
                    <h3 class="text-white text-2xl font-semibold">{{chip.title}}</h3>
                    <div class="bg-yellow-400 rounded-full h-13 w-13  flex justify-center items-center">
                    <ArrowUpRightIcon class=" h-6 w-6 text-neutral-900" />
                </div>
                </div>

                <p class="mt-3 text-neutral-400  text-lg">
                   {{chip.content}}
                </p>
            </div>
</template>