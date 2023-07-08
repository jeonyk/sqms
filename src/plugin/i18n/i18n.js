import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "@/plugin/i18n/lang/en/en.js";
import ko from "@/plugin/i18n/lang/ko/ko.js";
import store from "@/store/"



Vue.use(VueI18n);

const messages = {
  ko: ko,
  en: en
}

// console.log("@@ messages: %o",messages);

export const i18n = new VueI18n({
  locale: store.getters['auth/getLoacale'],                         // set default locale
  fallbackLocale: "ko",                 // set default fallback locale
  messages: messages                    // set default locale messages
});



const loadedLanguages = ["ko"];

export function loadLanaguageAsync(lang) {
  if (i18n.locale === lang) {
    return Promise.resolve(lang);
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve();
  }
}