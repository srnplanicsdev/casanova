<script setup>
import ChatWindow from '@/components/ChatWindow.vue'
</script>

<template>
  <main class="h-150 flex justify-center">
    <div class="flex flex-col w-full max-w-4xl bg-gray-100 rounded-2xl shadow-lg min-h-0">
      <header class="shrink-0 border-b px-4 py-3 flex items-center">
        <div class="rounded-full bg-gray-800 p-2 mr-3">
          <img src="@/assets/logo.svg" class="h-6 w-6" alt="Logo" />
        </div>
        <h1 class="text-xl font-semibold text-gray-800">Chatbot</h1>
      </header>

      <div class="flex-1 min-h-0">
        <ChatWindow />
      </div>
    </div>
  </main>
</template>
