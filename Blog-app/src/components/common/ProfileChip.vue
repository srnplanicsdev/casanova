<script setup>
const props = defineProps({
    person: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <div class="flex items-center gap-4">
        <img :src="person.img" alt="" class="h-20 w-20 rounded-full" />
        <div class="text-white">
            <div class="text-xl font-semibold">{{ person.name }}</div>
            <div class="text-neutral-400 text-lg">{{ person.profession }}</div>
        </div>
    </div>
</template>