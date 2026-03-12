<script setup>
import ArrowButton from './ArrowButton.vue';
const props = defineProps({
    content: Object,
    required: true,
})

</script>
<template>
    <div class="text-white py-10 lg:py-30 bg-neutral-900/98 px-6 lg:px-40">
        <div class=" inline-flex rounded-sm px-2.5 py-1.5 bg-neutral-700 text-sm md:text-base">
            {{ content.badge }}
        </div>
        <div class=" flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4">
            <span class="text-3xl md:text-4xl lg:text-6xl">{{ content.title }}</span>
            <div class="flex justify-end items-center shrink-0">
                <ArrowButton v-if="content.btntitle">{{ content.btntitle }}</ArrowButton>
            </div>
        </div>

    </div>
</template>