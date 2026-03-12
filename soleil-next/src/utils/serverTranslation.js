import { cookies } from "next/headers";
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';

const messages = { en, es, fr };

export async function getServerTranslation() {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get("lang")?.value;
    const lang = (cookieValue || "EN").toLowerCase();
    
    const t = (key) => {
        const keys = key.split(".");
        let result = messages[lang] || messages.en;

        for (const k of keys) {
            if (result == null) break;
            result = result[k];
        }

        return result ?? key;
    };  

    return { t, lang: lang.toUpperCase() };
}
