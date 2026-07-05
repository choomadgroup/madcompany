import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "@/locales/en";
import { id } from "@/locales/id";

const STORAGE_KEY = "choomad-locale";

function getInitialLocale(): string {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("id")) return "id";

    return "id"; // default: Bahasa Indonesia
}

i18n.use(initReactI18next).init({
    resources: {
        id: { translation: id },
        en: { translation: en }
    },
    lng: getInitialLocale(),
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
