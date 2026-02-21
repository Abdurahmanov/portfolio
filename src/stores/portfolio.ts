import { defineStore } from 'pinia';

export const usePortfolioStore = defineStore('portfolio', () => {
  const personal = {
    name: 'Artur Abdurakhmanov',
    nameRu: 'Артур Абдурахманов',
    title: 'Senior Frontend Developer',
    titleRu: 'Senior Frontend Developer',
    location: 'The Randstad, Netherlands',
    locationRu: 'Рандстад, Нидерланды',
    email: 'hello@abdurakhmanov.art',
    linkedin: 'https://www.linkedin.com/in/abdurakhmanov-artur/',
  };

  const skills = [
    'React',
    'Next.js',
    'Vue.js',
    'Nuxt.js',
    'TypeScript',
    'JavaScript (ES6+)',
    'Pinia',
    'Redux',
    'Zustand',
    'MobX',
    'GraphQL',
    'REST',
    'Core Web Vitals',
    'SEO',
    'A/B Testing',
    'Jest',
    'Vitest',
    'Cypress',
    'SCSS',
    'Styled-components',
    'Storybook',
    'Figma',
    'Webpack',
    'Vite',
    'Scrum',
    'Kanban',
    'Highcharts',
    'Capacitor',
    'Ionic',
  ];

  const experience = [
    {
      company: 'Jumbo Supermarkten',
      role: {
        en: 'Senior Frontend Developer',
        ru: 'Senior Frontend Developer',
      },
      location: {
        en: 'Veghel, Netherlands',
        ru: 'Вегел, Нидерланды',
      },
      period: {
        en: 'October 2022 – Present',
        ru: 'Октябрь 2022 – н.в.',
      },
      highlights: {
        en: [
          'Spearheaded A/B testing initiatives on product pages to validate hypotheses, directly impacting conversion rates and user engagement.',
          'Led migration from Nuxt2/Vue2 to Nuxt3/Vue3, enhancing performance, security, and maintainability.',
          'Developed micro-frontends for Product Domain.',
          'Optimized Core Web Vitals, significantly improving user experience.',
          'Built hybrid web apps using Capacitor and Ionic.',
          'Mentored junior developers and conducted regular code reviews.',
          'Actively participated in Scrum processes for efficient project delivery.',
        ],
        ru: [
          'Разработка A/B-тестов на страницах товаров для проверки гипотез и повышения конверсии.',
          'Руководство миграцией с Nuxt2/Vue2 на Nuxt3/Vue3: улучшена производительность, безопасность и поддерживаемость.',
          'Разработка микрофронтендов для продуктового домена.',
          'Оптимизация Core Web Vitals, существенное улучшение пользовательского опыта.',
          'Создание гибридных веб-приложений с использованием Capacitor и Ionic.',
          'Менторство junior-разработчиков и регулярное проведение код-ревью.',
          'Активное участие в Scrum-процессах для эффективной доставки проектов.',
        ],
      },
    },
    {
      company: 'Mail.ru Group',
      role: {
        en: 'Senior Frontend Developer',
        ru: 'Senior Frontend Developer',
      },
      location: {
        en: 'Moscow, Russia',
        ru: 'Москва, Россия',
      },
      period: {
        en: 'March 2019 – October 2022',
        ru: 'Март 2019 – Октябрь 2022',
      },
      highlights: {
        en: [
          'Developed Razvitie.ru, a financial marketplace using React, TypeScript, Next.js, Apollo GraphQL.',
          'Built an HR platform for employee management (React, Redux, RxJS).',
          'Developed a big data tourism platform visualizing heatmaps and population trends (React, Highcharts, GraphQL).',
          'Improved Core Web Vitals, wrote unit and E2E tests, and created a Storybook component library.',
        ],
        ru: [
          'Разработка Razvitie.ru — финансового маркетплейса на React, TypeScript, Next.js, Apollo GraphQL.',
          'Создание HR-платформы для управления сотрудниками (React, Redux, RxJS).',
          'Разработка big data платформы для туризма с визуализацией тепловых карт (React, Highcharts, GraphQL).',
          'Улучшение Core Web Vitals, написание unit- и E2E-тестов, создание библиотеки компонентов в Storybook.',
        ],
      },
    },
    {
      company: 'Nexign / Smoothie.digital / IdPowers',
      role: {
        en: 'Frontend Developer',
        ru: 'Frontend разработчик',
      },
      location: {
        en: 'Moscow & Volgograd, Russia',
        ru: 'Москва и Волгоград, Россия',
      },
      period: {
        en: 'August 2015 – March 2019',
        ru: 'Август 2015 – Март 2019',
      },
      highlights: {
        en: [
          'Worked at Nexign, Smoothie.digital, and IdPowers, building web platforms and websites for telecommunications and e-commerce.',
          'Used React, MobX, TypeScript, Vue.js, JavaScript, SCSS, jQuery, and Less to create functional interfaces.',
        ],
        ru: [
          'Работа в Nexign, Smoothie.digital и IdPowers: разработка веб-платформ для телекоммуникаций и e-commerce.',
          'Использование React, MobX, TypeScript, Vue.js, JavaScript, SCSS, jQuery и Less для создания функциональных интерфейсов.',
        ],
      },
    },
  ];

  const education = [
    {
      institution: {
        en: 'Volgograd State Technical University',
        ru: 'Волгоградский государственный технический университет',
      },
      degree: {
        en: "Bachelor's Degree in Computer Engineering",
        ru: 'Бакалавр по направлению «Вычислительная техника»',
      },
    },
    {
      institution: {
        en: 'Frolovo Industrial and Economic College',
        ru: 'Фроловский промышленно-экономический техникум',
      },
      degree: {
        en: 'Computer Engineering',
        ru: 'Вычислительная техника',
      },
    },
  ];

  const languages = ['English', 'Русский'];

  return { personal, skills, experience, education, languages };
});
