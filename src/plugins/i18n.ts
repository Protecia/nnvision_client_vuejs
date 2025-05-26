import {createI18n, type I18nOptions} from 'vue-i18n'

const loadLocaleMessages = () => {
  const locales = import.meta.glob<{ default: any }>('../locales/*/*.json', {eager: true});
  const messages: Record<string, any> = {};
  for (const path in locales) {
    // Exemple de path : "../locales/en/chatnav.json"
    const parts = path.split('/');
    // parts[2] correspond à la langue, par exemple "en" ou "fr"
    const lang = parts[2];
    // parts[3] correspond au nom du fichier, par exemple "chatnav.json"
    const fileName = parts[3].replace('.json', '');
    if (!messages[lang]) {
      messages[lang] = {};
    }
    messages[lang][fileName] = locales[path].default;
  }
  return messages;
};

export const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: loadLocaleMessages() as I18nOptions['messages']
})
