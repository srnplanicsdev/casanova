<script setup>
import { Menu, X, HomeIcon, UserIcon, CogIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { motion } from 'motion-v';
const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}
const routers = [
  {
    name: "home",
    title: "Home",
    icon: HomeIcon,
  },
  {
    name: "profile",
    title: "Profile",
    icon: UserIcon,
  },
  {
    name: "settings",
    title: "Settings",
    icon: CogIcon,
  },
];
</script>
<template>
  <div class="flex h-screen ">
    <motion.div class="bg-gray-900 overflow-y-auto overflow-x-hidden p-2 text-gray-200 shrink-0"
      :animate="{ width: isSidebarOpen ? '16rem' : '5rem' }" :transition="{ duration: 0.3 }">
      <div class="p-4 flex items-center">
        <button @click="toggleSidebar" class="text-gray-400 hover:text-white">
          <Menu />
        </button>
        <motion.h1 class="ml-3 text-xl font-bold"
          :animate="{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -10 }" :transition="{ duration: 0.5 }">
          Dashboard
        </motion.h1>
      </div>
      <nav class="mt-4">
        <div v-for="router in routers" :key="router.name">
          <router-link :to="{ name: router.name }"
            class="flex items-center py-2 px-4 h-10 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
            <div class="flex items-center">
              <component :is="router.icon" class="w-5 h-5 mr-2" />
              <motion.span v-if="isSidebarOpen" :initial="{ opacity: 0, x: -10 }" :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.5 }">{{ router.title }}</motion.span>
            </div>
          </router-link>
        </div>
      </nav>
    </motion.div>
  </div>
</template>