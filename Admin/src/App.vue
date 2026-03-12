<script setup>
import { RouterView } from 'vue-router'
import Sitebar from './components/Sitebar.vue';
</script>

<template>
    <div class="flex bg-gray-800 h-screen w-full backdrop-blur-2xl bg-opacity-50 z-10 overflow-hidden">
      <Sitebar />
      <RouterView />
    </div>

</template>