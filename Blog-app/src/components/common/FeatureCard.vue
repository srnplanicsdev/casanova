<script setup>
const props = defineProps({
    feature: Object,
    required: true
})
</script>
<template>
    <div class=" bg-neutral-900/98 border h-full border-neutral-700 flex flex-col gap-5 p-6 lg:p-10 rounded-xl">
        <div class="text-white font-medium text-2xl">{{ feature.title }}</div>
        <p class=" text-neutral-400 text-lg">
            {{ feature.context }}
        </p>
    </div>
</template>