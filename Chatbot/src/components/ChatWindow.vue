<template>
  <div class="flex flex-col h-full min-h-0">
    <div ref="scrollContainer" class="flex-1 min-h-0 overflow-y-auto p-4 space-y-2">
      <ChatMessage v-for="(msg, i) in messages" :key="i" :role="msg.role" :content="msg.content" />
    </div>
    <div class="shrink-0 border-t">
      <InputBox @send="sendMessage" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useChatStore } from '../stores/chat'
import { storeToRefs } from 'pinia'
import ChatMessage from './ChatMessage.vue'
import InputBox from './InputBox.vue'

const scrollContainer = ref(null)

const chatStore = useChatStore()
const { messages } = storeToRefs(chatStore)

const sendMessage = (text) => {
  chatStore.sendMessage(text)
}

watch(
  () => messages.value.length,
  async () => {
    await nextTick()
    const el = scrollContainer.value
    if (!el) return
    el.scrollTop = el.scrollHeight
  },
)
onMounted(() => {
  chatStore.init()
})
</script>
