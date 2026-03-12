'use client';

import { LanguageProvider } from "../context/LanguageContext";

export default function LanguageProviderWrapper({ children, initialLang }) {
    return <LanguageProvider initialLang={initialLang}>{children}</LanguageProvider>;
}
