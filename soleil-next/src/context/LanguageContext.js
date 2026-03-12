'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import en from '../utils/translations/en.json';
import es from '../utils/translations/es.json';
import fr from '../utils/translations/fr.json';

const LanguageContext = createContext();

const languages = [
    { name: "English", code: "EN", flag: "en" },
    { name: "Español", code: "ES", flag: "es" },
    { name: "Français", code: "FR", flag: "fr" },
];

const messages = { en, es, fr };

export function LanguageProvider({ children, initialLang }) {
    const [currentLangCode, setCurrentLangCode] = useState(initialLang || "EN");
    const [isInitialized, setIsInitialized] = useState(false);

    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    const getCookie = (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedLang = getCookie("lang") || localStorage.getItem("lang") || "EN";
            setCurrentLangCode(savedLang);
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (isInitialized && typeof window !== "undefined") {
            localStorage.setItem("lang", currentLangCode);
            setCookie("lang", currentLangCode, 365);
        }
    }, [currentLangCode, isInitialized]);

    const getLanguage = useMemo(() => currentLangCode.toLowerCase(), [currentLangCode]);

    const currentLanguage = useMemo(() =>
        languages.find(l => l.code === currentLangCode) || languages[0],
        [currentLangCode]
    );

    const t = useCallback((key) => {
        const keys = key.split(".");
        let result = messages[getLanguage] || messages.en;

        for (const k of keys) {
            if (result == null) break;
            result = result[k];
        }

        return result ?? key;
    }, [getLanguage]);

    const setLanguage = useCallback((code) => {
        setCurrentLangCode(code);
        setCookie("lang", code, 365);
    }, []);

    const value = useMemo(() => ({
        languages,
        currentLangCode,
        currentLanguage,
        getLanguage,
        setLanguage,
        t,
        isInitialized
    }), [currentLangCode, currentLanguage, getLanguage, setLanguage, t, isInitialized]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguageContext() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguageContext must be used within a LanguageProvider');
    }
    return context;
}
