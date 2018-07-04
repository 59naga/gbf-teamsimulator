import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import locales from '../locales.yaml';

const i18n = i18next.use(LngDetector).init({ fallbackLng: 'en', fallbackNS: 'translation' });

i18n.addResourceBundle('en', 'translation', locales.en);
i18n.addResourceBundle('ja', 'translation', locales.ja);

export default i18n;
