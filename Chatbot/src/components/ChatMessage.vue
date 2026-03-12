<template>
  <div :class="['my-2 flex', role === 'user' ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'max-w-[70%] px-4 py-2 rounded-2xl text-sm wrap-break-word',
        role === 'user'
          ? 'bg-blue-500 text-white rounded-br-md'
          : 'bg-gray-200 text-gray-800 rounded-bl-md',
      ]"
    >
      <p class="m-0">{{ content }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  role: String,
  content: {
    type: String,
    default: ' How May I help you',
    required: true,
  },
})
</script>
