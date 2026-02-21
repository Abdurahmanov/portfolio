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

export const useAppStore = defineStore('app', () => {
  const theme = ref<Theme>((localStorage.getItem('theme') as Theme) ?? 'light');
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
