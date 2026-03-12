<script setup>
import { StarIcon } from '@heroicons/vue/20/solid';
import ProfileChip from './ProfileChip.vue';
const props = defineProps(
    {
        review: {
            type: Object,
            required: true
        }
    }
)

</script>

<template>
    <div class="gap-10 flex flex-col">
        <div class="flex justify-center ">
        <ProfileChip :person="review" />
    </div>
    <div class="flex flex-col -space-y-6 items-center ">
        <div class="inline-flex  p-2.5 border border-neutral-700 bg-neutral-900 rounded-full z-1">
            <StarIcon class="w-6 h-6 text-yellow-400" v-for="i in 5" :key="i" />
        </div>
        <div class="p-7.5  flex text-center pt-12.5 border border-neutral-700 bg-neutral-800/30 text-white text-lg rounded-xl">
            {{review.content}}
        </div>
    </div>
    </div>
</template>