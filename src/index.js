import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import global_es from './config/i18n/es/global.json';
import global_en from './config/i18n/en/global.json';
import global_it from './config/i18n/it/global.json';
import global_cn from './config/i18n/cn/global.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
    it: {
      global: global_it,
    },
    cn: {
      global: global_cn,
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
