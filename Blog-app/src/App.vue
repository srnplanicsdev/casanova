<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ArrowUpRightIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import Header from './components/common/Header.vue';
const nav = ref("")


</script>


<template>
  <nav>
    <Header/>

    
  </nav>
<RouterView></RouterView>
</template>
