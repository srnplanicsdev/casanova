import { ref, computed, watch } from "vue";
import i18n from "@/utils/i18n"; // 👈 import i18n

const currentLangCode = ref(localStorage.getItem("lang") || "EN");
const getLanguage = ref(currentLangCode.value.toLowerCase());

const languages = [
  { name: "English", code: "EN", flag: "en" },
  { name: "Español", code: "ES", flag: "es" },
  { name: "Français", code: "FR", flag: "fr" },
];

watch(currentLangCode, (val) => {
  localStorage.setItem("lang", val);
  const lang = val.toLowerCase();

  getLanguage.value = lang;
  i18n.global.locale.value = lang;
});

export function useLanguage() {
  const currentLanguage = computed(() =>
    languages.find(l => l.code === currentLangCode.value)
  );

  const setLanguage = (code) => {
    currentLangCode.value = code;
  };

  return {
    languages,
    currentLangCode,
    currentLanguage,
    setLanguage,
    getLanguage,
  };
}
