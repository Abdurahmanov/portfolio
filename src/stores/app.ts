import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export type Theme = 'dark' | 'light';

export type Locale = 'en' | 'ru';

function getInitialLocale(): Locale {
  const params = new URLSearchParams(window.location.search);
  const langQuery = params.get('lang');
  if (langQuery === 'en' || langQuery === 'ru') {
    return langQuery as Locale;
  }
  return (localStorage.getItem('locale') as Locale) ?? 'en';
}

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('theme') as Theme;
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export const useAppStore = defineStore('app', () => {
  const theme = ref<Theme>(getInitialTheme());
  const locale = ref<Locale>(getInitialLocale());

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  }

  function setLocale(newLocale: Locale) {
    locale.value = newLocale;
  }

  watch(
    theme,
    (newTheme) => {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      const themeColor = newTheme === 'dark' ? '#0d1117' : '#ffffff';
      let meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'theme-color');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', themeColor);
    },
    { immediate: true },
  );

  watch(
    locale,
    (newLocale) => {
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;

      const url = new URL(window.location.href);
      if (newLocale === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', newLocale);
      }
      window.history.replaceState({}, '', url.toString());
    },
    { immediate: true },
  );

  return { theme, locale, toggleTheme, setLocale };
});
