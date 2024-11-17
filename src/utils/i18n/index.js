import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLang from "./locales/en.json"
import arLang from "./locales/ar.json"

const resources = {
    en: {
        translation: enLang
    },
    ar: {
        translation: arLang
    }
}

i18n.use(initReactI18next).init({
    lng: localStorage.getItem("appLanguage") || "en", /* en | ar */
    resources,
    fallbackLng: "en",
    interpolation: {
        escapedValue: true
    }
})

export default i18n;