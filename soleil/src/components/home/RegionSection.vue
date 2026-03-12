<script setup>
import RegionCard from '../RegionCard.vue';

const props = defineProps({
    regions: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <section class="container mx-auto px-4 py-12">
        <h2
            class="text-3xl md:text-4xl lg:text-5xl font-dm-serif-display font-semibold italic text-center text-gray-800 mb-10">
            {{ $t("regions.regions") }} <span class="text-gold">{{ $t("regions.discover") }}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            <RegionCard v-for="region in regions.slice(0, 3)" :key="region._id" :region="region" />
        </div>
    </section>
</template>