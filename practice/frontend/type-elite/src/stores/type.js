import { ref } from "vue";
import { defineStore } from "pinia";
import wordsData from "@/words/words.json";

export const useTypeStore = defineStore("type", () => {
  const userInput = ref("");
  const isFinished = ref(false);
  const startTime = ref(null);
  const duration = ref(30);
  const timeLeft = ref(30);
  const isRunning = ref(false);
  const timerId = ref(null);
  const wpm = ref(0);
  const accuracy = ref(0);
  const error = ref(0);
  const totalTyped = ref(0);
  const words = ref([]);

  const generateWords = (count = 100) => {
    const shuffle = [...wordsData];
    for (let i = shuffle.length; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j] , shuffle[i]];
    }
    words.value = shuffle.slice(0, count);
  };


  const startTest = ( testDuration = 30 ) => {
    duration.value = testDuration;
    timeLeft.value = testDuration;
    userInput.value = "";
    isFinished.value = false;
    isRunning.value = true;
    wpm.value = 0;
    accuracy.value = 0;
    error.value = 0;
    totalTyped.value = 0;
    startTime.value = Date.now();

    if (timerId.value) clearInterval(timerId.value);
    timerId.value = setInterval(() => {
      timeLeft.value--;
      calculateResult();
      if (timeLeft.value <= 0) {
        endTest()
      }
    }, 1000);
  };

  const endTest = () => {
    isRunning.value = false;
    isFinished.value = true;
    if (timerId.value) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
    calculateResult();
  };

  const resetTest = () => {
    endTest();
    isFinished.value = false;
    timeLeft.value = duration.value;
    userInput.value = "";
    generateWords(100);
  };

  const calculateResult = () => {
    if (!startTime.value) return;
    const timeElapes = (duration.value - timeLeft.value) / 60 ||( 1/60);
    const typedText = userInput.value;
    const originalText = words.value.join(" ");


    let correctChar = 0;
    let currentError = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === originalText[i]) {
        correctChar++;
      } else {
        currentError++;
      }
    }
    error.value = currentError;
    totalTyped.value = typedText.length;
    wpm.value = Math.round((typedText.length / 5) / timeElapes);
    if (typedText.length > 0) {
      accuracy.value = Math.round((correctChar / typedText.length) * 100);
    } else {
      accuracy.value = 0;
    }
  };
  const handleInput = (value) => {
    if (!isRunning.value && !isFinished.value) {
      startTest(duration.value);
    }
    userInput.value = value;
  };
  return {
    userInput,
    duration,
    wpm,
    accuracy,
    error,
    totalTyped,
    timeLeft,
    isFinished,
    isRunning,
    words,
    generateWords,
    handleInput,
    startTest,
    resetTest,
    endTest,
  };
});
