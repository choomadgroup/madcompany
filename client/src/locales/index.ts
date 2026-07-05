import { en, type Translations } from "./en";
import { id } from "./id";

export type Locale = "id" | "en";
export type { Translations } from "./en";

export const locales: Record<Locale, Translations> = { id, en };

export const localeNames: Record<Locale, string> = {
    id: "Bahasa Indonesia",
    en: "English"
};

export function getTranslations(locale: Locale): Translations {
    return locales[locale] ?? id;
}

export { en, id };
