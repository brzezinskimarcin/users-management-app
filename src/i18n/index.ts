import { createI18n } from 'vue-i18n';

type Translations = Record<string, string>;

function loadLocaleMessages() {
  const locales = import.meta.glob<{ default: Translations }>('./*.json', { eager: true });
  return Object.entries(locales).reduce<Record<string, Translations>>((messages, [path, translations]) => {
    const language = path.slice(2, -5);
    messages[language] = translations.default;
    return messages;
  }, {});
}

export const i18n = createI18n({
  locale: 'en-gb',
  fallbackLocale: 'en-gb',
  messages: loadLocaleMessages(),
  legacy: false,
});
