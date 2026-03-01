import { computed } from 'vue';
import { useAppStore } from '@/stores/app';

export const messages = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hello, I'm",
      currentJob: 'Currently at Jumbo Supermarkten',
      cta: 'Get in Touch',
      ctaAlt: 'View Experience',
      downloadCV: 'Download CV',
    },
    about: {
      title: 'About Me',
      descriptionBefore:
        'Senior Frontend Developer with {years} years of experience building scalable web applications using React/Next.js and Vue/Nuxt.js. Expertise in ',
      cwvPhrase: 'Core Web Vitals optimization',
      cwvTooltip: 'Check CWV of this website 😉',
      cwvAriaLabel: 'Core Web Vitals optimization (opens PageSpeed Insights in a new tab)',
      descriptionAfter:
        ', micro-frontends, and data-driven development through A/B testing. Strong problem-solving skills, experience in mentoring, and a deep understanding of Agile development processes.',
      languages: 'Languages',
      travelsTitle: 'Travel & Photography',
      travelsDescription:
        'Apart from coding, I love exploring the world and capturing beautiful moments. Traveling gives me inspiration and broadens my perspective.',
      photoAlts: ['Bern, Switzerland', 'Nice, France', 'Osaka, Japan'],
      carouselLabel: 'Travel photo gallery',
    },
    skills: { title: 'Skills' },
    experience: { title: 'Experience', present: 'Present' },
    education: { title: 'Education' },
    contact: {
      title: 'Get in Touch',
      description: 'Open to new opportunities and interesting projects. Feel free to reach out!',
      linkedinLabel: 'LinkedIn Profile',
    },
    footer: { copy: 'All rights reserved.' },
  },
  ru: {
    nav: {
      about: 'О себе',
      skills: 'Навыки',
      experience: 'Опыт',
      education: 'Образование',
      contact: 'Контакты',
    },
    hero: {
      greeting: 'Привет, меня зовут',
      currentJob: 'Сейчас работаю в Jumbo Supermarkten',
      cta: 'Написать мне',
      ctaAlt: 'Мой опыт',
      downloadCV: 'Скачать резюме',
    },
    about: {
      title: 'О себе',
      descriptionBefore:
        'Senior Frontend Developer с {years}-летним опытом создания масштабируемых веб-приложений на React/Next.js и Vue/Nuxt.js. Специализируюсь на ',
      cwvPhrase: 'оптимизации Core Web Vitals',
      cwvAriaLabel: 'оптимизация Core Web Vitals (открывает PageSpeed Insights в новой вкладке)',
      cwvTooltip: 'Проверить CWV этого сайта 😉',
      descriptionAfter:
        ', микрофронтендах и разработке на основе данных через A/B тестирование. Сильные навыки решения задач, опыт менторинга и глубокое понимание Agile-процессов.',
      languages: 'Языки',
      travelsTitle: 'Путешествия и Фотография',
      travelsDescription:
        'В свободное от кода время я обожаю путешествовать и запечатлевать красивые моменты. Путешествия дарят мне вдохновение и расширяют кругозор.',
      photoAlts: ['Берн, Швейцария', 'Ницца, Франция', 'Осака, Япония'],
      carouselLabel: 'Галерея фотографий путешествий',
    },
    skills: { title: 'Навыки' },
    experience: { title: 'Опыт работы', present: 'н.в.' },
    education: { title: 'Образование' },
    contact: {
      title: 'Связаться',
      description: 'Открыт для новых возможностей и интересных проектов. Напишите мне!',
      linkedinLabel: 'Профиль LinkedIn',
    },
    footer: { copy: 'Все права защищены.' },
  },
} as const;

export type Messages = typeof messages.en;

function calcYearsOfExperience(): number {
  const start = new Date(2015, 7, 1);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const hasPassedAnniversary =
    now.getMonth() > start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());
  if (!hasPassedAnniversary) {
    years -= 1;
  }
  return years;
}

export function useI18n() {
  const appStore = useAppStore();
  const locale = computed(() => appStore.locale);
  const t = computed(() => messages[appStore.locale]);
  const yearsOfExperience = computed(() => calcYearsOfExperience());
  const PAGESPEED_URL =
    'https://pagespeed.web.dev/analysis/https-abdurakhmanov-art/6kkjgckbhl?form_factor=desktop';

  const aboutDescriptionBefore = computed(() =>
    t.value.about.descriptionBefore.replace('{years}', String(yearsOfExperience.value)),
  );

  return {
    t,
    locale,
    yearsOfExperience,
    pagespeedUrl: PAGESPEED_URL,
    aboutDescriptionBefore,
  };
}
