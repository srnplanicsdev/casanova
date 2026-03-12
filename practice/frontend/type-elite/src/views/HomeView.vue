<script setup>
import { useTypeStore } from "@/stores/type";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref,  watch } from "vue";

const store = useTypeStore();
const {
  words,
  timeLeft,
  accuracy,
  wpm,
  error,
  isFinished,
  isRunning,
  duration,
  userInput,
} = storeToRefs(store);
const typingInput = ref(null);
const currentWordIndex = ref(0);
const currentCharIndex = ref(0);
const currentWordRef = ref(null);

const onInput = (e) => {
  const val = e.target.value;
  if (!isRunning.value && !isFinished.value) store.startTest(duration.value);
  if (isFinished.value) return;
  userInput.value = val;
  const allTyped = val.split(" ");
  currentWordIndex.value = allTyped.length - 1;
  currentCharIndex.value = allTyped[currentWordIndex.value].length;
  store.handleInput(val);
};

const handleSpace = () => {
  if (isFinished.value) return
  if (currentCharIndex.value > 0) {
    userInput.value += ' '
    currentWordIndex.value++
    currentCharIndex.value = 0
    store.handleInput(userInput.value)
  }
}

const isWordIncorrect = (wordIndex) => {
  if (wordIndex >= currentCharIndex.value) return false
  const typeWords = userInput.value.split(" ")
  const typeWord = typeWords[wordIndex]
  const originalWord = words.value[wordIndex]
  return typeWord !== originalWord
}

const setDuration = (time) => {
  userInput.value = ''
  wpm.value=0
  accuracy.value=0
  duration.value = time
  timeLeft.value = time
  currentCharIndex.value = 0
  currentWordIndex.value = 0

}

const restart = () => {
  store.resetTest()
  currentCharIndex.value = 0
  currentWordIndex.value = 0
  setTimeout(focusInput, 0)
}
const focusInput = () => {
  typingInput.value?.focus()
}
const handleGlobelKeydown = (e) => {
  if (e.key === "Tab") {
    e.preventDefault()
    restart()
  }
  if (!isFinished.value) {
    focusInput()
  }
}

const getCharClass = (wordIndex, charIndex) => {
  if (wordIndex > currentWordIndex.value) return 'text-zinc-600'

  const typedWords = userInput.value.split(' ')
  const typedWord = typedWords[wordIndex]

  if (wordIndex < currentWordIndex.value) {
    if (!typedWord) return 'text-red-600/30'
    const char = words.value[wordIndex][charIndex]
    return typedWord[charIndex] === char ? 'text-stone-300' : 'text-red-600/30'
  }

  if (wordIndex === currentWordIndex.value) {
    if (charIndex >= currentCharIndex.value) return 'text-zinc-600'
    const char = words.value[wordIndex][charIndex]
    return typedWord[charIndex] === char ? 'text-stone-300' : 'text-red-600/30'
  }
}
const close = () => {
  isFinished.value = false
  userInput.value=""
}

onMounted(() => {
  store.generateWords(100)
  window.addEventListener("keydown", handleGlobelKeydown)
  focusInput()
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobelKeydown)
})

watch(isFinished, (finish) => {
  if (!finish) {
    setTimeout(focusInput, 0)
  }
})

</script>

<template>
  <div class="bg-neutral-900">
  <main class="max-w-5xl mx-auto px-4 w-full min-h-screen flex flex-col justify-center py-10">
     <div class="mb-8 flex justify-between items-end transition-all duration-500"
      :class="{ 'opacity-50': !isRunning && !isFinished }">
      <div class="flex gap-8">
        <div class="flex flex-col">
          <span class="text-zinc-600 text-sm font-medium uppercase tracking-widest">Time</span>
          <span class="text-yellow-400 text-4xl font-mono">{{ timeLeft }}s</span>
        </div>
        <div class="flex flex-col" v-if="isRunning || isFinished">
          <span class="text-zinc-600 text-sm font-medium uppercase tracking-widest">WPM</span>
          <span class="text-yellow-400 text-4xl font-mono">{{ wpm }}</span>
        </div>
        <div class="flex flex-col" v-if="isRunning || isFinished">
          <span class="text-zinc-600 text-sm font-medium uppercase tracking-widest">Acc</span>
          <span class="text-yellow-400 text-4xl font-mono">{{ accuracy }}%</span>
        </div>
      </div>

      <div class="flex gap-4 mb-1">
        <button v-for="time in [15, 30, 60]" :key="time" @click="setDuration(time)"
          class="text-sm px-3 py-1 rounded transition-colors"
          :class="duration === time ? 'text-yellow-400 bg-brand/10' : 'text-zinc-600 hover:text-stone-300'">
          {{ time }}
        </button>
      </div>
    </div>
    <div v-if="!isFinished" class="relative text-2xl leading-relaxed md:text-3xl font-mono tracking-tight cursor-text select-none min-h-40" @click="focusInput">
      <div>
        <input ref="typingInput" type="text" class="absolute opacity-0 pointer-events-none" :value="userInput" @keydown.space.prevent="handleSpace"
          @input="onInput" autofocus />
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-4 transition-transform duration-200 ">
        <div v-for="(word, wordIndex) in words" :key="wordIndex" :ref="el=>{if(wordIndex===currentWordIndex)currentWordRef = el}" class=" relative flex " :class="{
            'text-red-900 border-b-2 border-red-600/30': isWordIncorrect(wordIndex),
            'text-zinc-600': wordIndex > currentWordIndex}" >
          <span v-for="(char, charIndex) in word" :key="charIndex" class="relative" :class="getCharClass(wordIndex, charIndex)">
            <div v-if="isRunning && wordIndex ===currentWordIndex && charIndex === currentCharIndex" class=" absolute -left-0.5 top-1 w-0.5 h-5 animate-pulse ">
            </div>
              {{ char }}
          </span>
          <div v-if="isRunning && wordIndex ===currentWordIndex && currentCharIndex === word.length" class=" absolute -left-0.5 top-1 w-0.5 h-5 animate-pulse ">
            </div>
        </div>
      </div>
    </div>
    
     <div v-else
      class="glass-panel p-10 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl ">
      <h2 class="text-zinc-600 text-xl mb-8 font-medium">Test Results</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div class="flex flex-col gap-2">
          <span class="text-zinc-600 text-sm uppercase tracking-widest font-semibold">Words Per Minute</span>
          <span class="text-yellow-400 text-7xl font-bold font-mono">{{ wpm }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-zinc-600 text-sm uppercase tracking-widest font-semibold">Accuracy</span>
          <span class="text-stone-300 text-7xl font-bold font-mono">{{ accuracy }}%</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-zinc-600 text-sm uppercase tracking-widest font-semibold">Errors</span>
          <span class="text-red-600/30 text-7xl font-bold font-mono">{{ error }}</span>
        </div>
      </div>

      <div class="flex gap-4">
        <button @click="restart"
          class="bg-yellow-400 text-bg px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
          Try Again
        </button>
        <button @click="close"
          class="text-zinc-600 px-8 py-4 rounded-xl font-bold hover:text-stone-300 transition-colors">
          Close
        </button>
      </div>
    </div>
  </main>
  </div>
</template>
