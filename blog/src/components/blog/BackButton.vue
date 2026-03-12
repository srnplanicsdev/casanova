<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';

</script>
<template>
  <button
    @click="$router.back"
    class="inline-flex  items-center dark:text-white  px-4 py-2 text-gray-700 font-semibold dark:hover:dark:text-white dark:hover:dark:bg-transparent hover:bg-gray-50 hover:text-gray-900"
    
  >
   <ChevronLeftIcon class="w-6 h-6"/>
    Back
  </button>
</template>
