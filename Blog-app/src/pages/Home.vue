<script setup>
import BlogPost from '@/components/home/BlogPost.vue';
import Features from '@/components/home/Features.vue';
import Footer from '@/components/home/Footer.vue';
import Hero from '@/components/home/Hero.vue';
import Resources from '@/components/home/Resources.vue';
import Testimonials from '@/components/home/Testimonials.vue';

const components = [Hero, Features, BlogPost, Resources, Testimonials, Footer]
</script>
<template>
  <main>
    <component v-for="(comp, index) in components" :key="index" :is="comp"/>
  </main>
</template>
