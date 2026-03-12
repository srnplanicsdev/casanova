<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useTypingStore } from '../stores/typing'
import { storeToRefs } from 'pinia'

const store = useTypingStore()
const {
  words,
  userInput,
  timeLeft,
  duration,
  isRunning,
  isFinished,
  wpm,
  accuracy,
  errors
} = storeToRefs(store)

const typingInput = ref(null)
const currentWordIndex = ref(0)
const currentCharIndex = ref(0)
const currentWordRef = ref(null)

const onInput = (e) => {
  const val = e.target.value
  if (!isRunning.value && !isFinished.value) {
    store.startTest(duration.value)
  }

  if (isFinished.value) return
  userInput.value = val

  const allTyped = val.split(' ')
  currentWordIndex.value = allTyped.length - 1
  currentCharIndex.value = allTyped[currentWordIndex.value].length
  store.handleInput(val)
}

const handleSpace = () => {
  if (isFinished.value) return

  if (currentCharIndex.value > 0) {
    userInput.value += ' '
    currentWordIndex.value++
    currentCharIndex.value = 0
    store.handleInput(userInput.value)
  }
}

const getCharClass = (wordIndex, charIndex) => {
  if (wordIndex > currentWordIndex.value) return 'text-sub'

  const typedWords = userInput.value.split(' ')
  const typedWord = typedWords[wordIndex]

  if (wordIndex < currentWordIndex.value) {
    if (!typedWord) return 'text-error'
    const char = words.value[wordIndex][charIndex]
    return typedWord[charIndex] === char ? 'text-text' : 'text-error'
  }

  if (wordIndex === currentWordIndex.value) {
    if (charIndex >= currentCharIndex.value) return 'text-sub'
    const char = words.value[wordIndex][charIndex]
    return typedWord[charIndex] === char ? 'text-text' : 'text-error'
  }
}

const isWordIncorrect = (wordIndex) => {
  if (wordIndex >= currentWordIndex.value) return false
  const typedWords = userInput.value.split(' ')
  const typedWord = typedWords[wordIndex]
  const originalWord = words.value[wordIndex]
  return typedWord !== originalWord
}

const setDuration = (time) => {
  store.resetTest()
  duration.value = time
  timeLeft.value = time
  currentWordIndex.value = 0
  currentCharIndex.value = 0
}

const restart = () => {
  store.resetTest()
  currentWordIndex.value = 0
  currentCharIndex.value = 0
  setTimeout(focusInput, 0)
}

const focusInput = () => {
  typingInput.value?.focus()
}

const handleGlobalKeydown = (e) => {
  if (e.key === 'Tab') {
    e.preventDefault()
    restart()
  }
  if (!isFinished.value) {
    focusInput()
  }
}

onMounted(() => {
  store.generateWords(100)
  window.addEventListener('keydown', handleGlobalKeydown)
  focusInput()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

const contentStyle = computed(() => {
  return {}
})

watch(isFinished, (finished) => {
  if (!finished) {
    setTimeout(focusInput, 0)
  }
})
</script>
<template>
  <div class="max-w-5xl mx-auto px-4 w-full min-h-screen flex flex-col justify-center py-10">
    <div class="mb-8 flex justify-between items-end transition-all duration-500"
      :class="{ 'opacity-0': !isRunning && !isFinished }">
      <div class="flex gap-8">
        <div class="flex flex-col">
          <span class="text-sub text-sm font-medium uppercase tracking-widest">Time</span>
          <span class="text-brand text-4xl font-mono">{{ timeLeft }}s</span>
        </div>
        <div class="flex flex-col" v-if="isRunning || isFinished">
          <span class="text-sub text-sm font-medium uppercase tracking-widest">WPM</span>
          <span class="text-brand text-4xl font-mono">{{ wpm }}</span>
        </div>
        <div class="flex flex-col" v-if="isRunning || isFinished">
          <span class="text-sub text-sm font-medium uppercase tracking-widest">Acc</span>
          <span class="text-brand text-4xl font-mono">{{ accuracy }}%</span>
        </div>
      </div>

      <div class="flex gap-4 mb-1">
        <button v-for="time in [15, 30, 60]" :key="time" @click="setDuration(time)"
          class="text-sm px-3 py-1 rounded transition-colors"
          :class="duration === time ? 'text-brand bg-brand/10' : 'text-sub hover:text-text'">
          {{ time }}
        </button>
      </div>
    </div>

    <div v-if="!isFinished"
      class="relative text-2xl leading-relaxed md:text-3xl font-mono tracking-tight cursor-text select-none min-h-40"
      @click="focusInput">
      <input ref="typingInput" type="text" class="absolute opacity-0 pointer-events-none" :value="userInput"
        @input="onInput" @keydown.space.prevent="handleSpace" autofocus />

      <div class="flex flex-wrap gap-x-[0.6em] gap-y-2 transition-transform duration-300" :style="contentStyle">
        <div v-for="(word, wordIndex) in words" :key="wordIndex"
          :ref="el => { if (wordIndex === currentWordIndex) currentWordRef = el }" class="relative flex" :class="{
            'text-error border-b-2 border-error/30': isWordIncorrect(wordIndex),
            'text-sub': wordIndex > currentWordIndex
          }">
          <span v-for="(char, charIndex) in word" :key="charIndex" class="relative"
            :class="getCharClass(wordIndex, charIndex)">
            <div v-if="isRunning && wordIndex === currentWordIndex && charIndex === currentCharIndex"
              class="absolute -left-0.5 top-1 w-0.5 h-[1.2em] bg-brand animate-pulse shadow-[0_0_8px_rgba(226,183,20,0.6)]">
            </div>
            {{ char }}
          </span>
          <div v-if="isRunning && wordIndex === currentWordIndex && currentCharIndex === word.length"
            class="absolute right-[-0.3em] top-1 w-0.5 h-[1.2em] bg-brand animate-pulse shadow-[0_0_8px_rgba(226,183,20,0.6)]">
          </div>
        </div>
      </div>
    </div>

    <div v-else
      class="glass-panel p-10 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
      <h2 class="text-sub text-xl mb-8 font-medium">Test Results</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div class="flex flex-col gap-2">
          <span class="text-sub text-sm uppercase tracking-widest font-semibold">Words Per Minute</span>
          <span class="text-brand text-7xl font-bold font-mono">{{ wpm }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sub text-sm uppercase tracking-widest font-semibold">Accuracy</span>
          <span class="text-text text-7xl font-bold font-mono">{{ accuracy }}%</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sub text-sm uppercase tracking-widest font-semibold">Errors</span>
          <span class="text-error text-7xl font-bold font-mono">{{ errors }}</span>
        </div>
      </div>

      <div class="flex gap-4">
        <button @click="restart"
          class="bg-brand text-bg px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
            <path d="M21 3v5h-5"></path>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
            <path d="M3 21v-5h5"></path>
          </svg>
          Try Again
        </button>
        <button @click="isFinished = false"
          class="text-sub px-8 py-4 rounded-xl font-bold hover:text-text transition-colors">
          Close
        </button>
      </div>
    </div>

    <div class="mt-12 text-center transition-opacity duration-500" :class="{ 'opacity-0': isRunning }">
      <p class="text-sub text-sm flex items-center justify-center gap-4">
        <span><kbd class="bg-sub/20 px-2 py-1 rounded text-xs">TAB</kbd> to restart</span>
        <span>•</span>
        <span>Type to start</span>
      </p>
    </div>
  </div>
</template>


<style scoped>
.animate-in {
  animation: animate-in 0.5s ease-out;
}

@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>