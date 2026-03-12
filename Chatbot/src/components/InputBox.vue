<template>
  <form @submit.prevent="submit" class="flex items-center rounded-2xl mt-2 p-2">
    <input
      v-model="text"
      placeholder="Type your message..."
      class="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      class="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      :disabled="!text.trim()"
    >
      Send
    </button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const text = ref('')
const emit = defineEmits(['send'])
const submit = async () => {
  if (text.value.trim() === '') return
  emit('send', text.value)
  text.value = ''
}
</script>
