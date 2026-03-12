import { createI18n } from "vue-i18n";
import en from "@/translation/en.json";
import es from "@/translation/es.json";
import fr from "@/translation/fr.json";
import { useLanguage } from "./useLanguage";


const currentLanguage = useLanguage().getLanguage;
const messages = {
    en,
    es,
    fr,
};

const i18n = createI18n({
    legacy: false,
    locale: useLanguage().getLanguage.value,
    fallbackLocale: "en",
    messages,
});


export default i18n;