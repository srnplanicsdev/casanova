<script setup >
import ArrowButton from './ArrowButton.vue';
const props = defineProps({
    content:Object,
    required: true,
})

</script>
<template>   
<div class="text-white py-30 bg-neutral-900/98 px-40">
        <div class=" inline-flex rounded-sm px-2.5 py-1.5 bg-neutral-700">
            {{content.badge}}
        </div>
        <div class=" flex justify-between">
            <span class="text-6xl mt-4">{{content.title}}</span>
            <div class="flex justify-end items-center">
                <ArrowButton v-if="content.btntitle">{{ content.btntitle }}</ArrowButton>
            </div>
        </div>

    </div>
    </template>