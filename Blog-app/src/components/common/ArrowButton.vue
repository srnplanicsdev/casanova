<script setup>
import { ArrowUpRightIcon } from '@heroicons/vue/20/solid'

defineProps({
    icon: {
        type: [Object, String] 
    }
})
</script>

<template>
    <button class="inline-flex items-center bg-neutral-900 text-lg  gap-2 px-6 py-4 border border-neutral-700 rounded-xl
           text-neutral-300 hover:border-yellow-400 hover:text-yellow-400 transition">
        <slot />
        <component v-if="icon" :is="icon" class="h-5 w-5 text-yellow-400"/>
        <ArrowUpRightIcon v-else class="h-5 w-5 text-yellow-400" />
    </button>
</template>
