import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import wordsData from '../words/words.json'

export const useTypingStore = defineStore('typing', () => {
  const words = ref([])
  const userInput = ref('')
  const startTime = ref(null)
  const duration = ref(30) 
  const timeLeft = ref(30)
  const isRunning = ref(false)
  const isFinished = ref(false)
  const timerId = ref(null)

 
  const wpm = ref(0)
  const accuracy = ref(0)
  const errors = ref(0)
  const totalTyped = ref(0)

  const generateWords = (count = 100) => {
    const shuffled = [...wordsData]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    words.value = shuffled.slice(0, count)
  }

  generateWords(100)

  const startTest = (testDuration = 30) => {
    duration.value = testDuration
    timeLeft.value = testDuration
    userInput.value = ''
    isRunning.value = true
    isFinished.value = false
    wpm.value = 0
    accuracy.value = 0
    errors.value = 0
    totalTyped.value = 0
    startTime.value = Date.now()


    if (timerId.value) clearInterval(timerId.value)

    timerId.value = setInterval(() => {
      timeLeft.value--
      calculateResults()
      if (timeLeft.value <= 0) {
        endTest()
      }
    }, 1000)
  }

  const endTest = () => {
    isRunning.value = false
    isFinished.value = true
    if (timerId.value) {
      clearInterval(timerId.value)
      timerId.value = null
    }
    calculateResults()
  }

  const resetTest = () => {
    endTest()
    isFinished.value = false
    timeLeft.value = duration.value
    userInput.value = ''
    generateWords(100)
  }

  const calculateResults = () => {
    if (!startTime.value) return

    const timeElapsed = (duration.value - timeLeft.value) / 60 || (1 / 60)
    const typedText = userInput.value
    const originalText = words.value.join(' ')

    let correctChars = 0
    let currentErrors = 0

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === originalText[i]) {
        correctChars++
      } else {
        currentErrors++
      }
    }

    errors.value = currentErrors
    totalTyped.value = typedText.length

    wpm.value = Math.round((typedText.length / 5) / timeElapsed)

    if (typedText.length > 0) {
      accuracy.value = Math.round((correctChars / typedText.length) * 100)
    } else {
      accuracy.value = 0
    }
  }

  const handleInput = (value) => {
    if (!isRunning.value && !isFinished.value) {
      startTest(duration.value)
    }
    userInput.value = value
  }

  return {
    words,
    userInput,
    timeLeft,
    duration,
    isRunning,
    isFinished,
    wpm,
    accuracy,
    errors,
    totalTyped,
    startTest,
    endTest,
    resetTest,
    handleInput,
    generateWords
  }
})

