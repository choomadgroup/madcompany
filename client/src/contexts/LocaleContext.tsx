import i18n from "@/i18n";
import { type Translations } from "@/locales/en";
import { en } from "@/locales/en";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Locale = "id" | "en";

export const localeNames: Record<Locale, string> = {
    id: "Bahasa Indonesia",
    en: "English"
};

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Translations;
    localeNames: typeof localeNames;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = "choomad-locale";

function isValidLocale(value: string): value is Locale {
    return value === "id" || value === "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(
        isValidLocale(i18n.language) ? i18n.language : "id"
    );

    useEffect(() => {
        const handler = (lng: string) => {
            if (isValidLocale(lng)) setLocaleState(lng);
        };
        i18n.on("languageChanged", handler);
        return () => i18n.off("languageChanged", handler);
    }, []);

    const setLocale = (newLocale: Locale) => {
        i18n.changeLanguage(newLocale);
        localStorage.setItem(STORAGE_KEY, newLocale);
    };

    const t = (i18n.getResourceBundle(locale, "translation") ?? en) as Translations;

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t, localeNames }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error("useLocale must be used within a LocaleProvider");
    }
    return context;
}
