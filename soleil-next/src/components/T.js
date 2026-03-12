'use client';
import { useLanguage } from "../utils/useLanguage";

/**
 * A lightweight client-side translation component for use in Server Components.
 * This allows a Server Component to remain a Server Component while still
 * rendering translated strings that react to client-side language changes.
 */
export default function T({ k }) {
    const { t } = useLanguage();
    return <>{t(k)}</>;
}
