<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

const isDark = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme !== null) {
    isDark.value = savedTheme === 'true'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme(isDark.value)
})
const applyTheme = (dark) => {
  document.documentElement.classList.toggle('dark', dark)
}
const toggleDark = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value)
  applyTheme(isDark.value)
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white">
    
    <RouterView v-slot="{ Component }">
      <Transition name="slide-fade" appear mode="out-in">
        <component :is="Component" :isDark="isDark" @toggleDark="toggleDark" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>