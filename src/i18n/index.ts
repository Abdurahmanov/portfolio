import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

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
      description:
        'Senior Frontend Developer with 10 years of experience building scalable web applications using React/Next.js and Vue/Nuxt.js. Expertise in Core Web Vitals optimization, micro-frontends, and data-driven development through A/B testing. Strong problem-solving skills, experience in mentoring, and a deep understanding of Agile development processes.',
      languages: 'Languages',
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
      description:
        'Senior Frontend Developer с 10-летним опытом создания масштабируемых веб-приложений на React/Next.js и Vue/Nuxt.js. Специализируюсь на оптимизации Core Web Vitals, микрофронтендах и разработке на основе данных через A/B тестирование. Сильные навыки решения задач, опыт менторинга и глубокое понимание Agile-процессов.',
      languages: 'Языки',
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
} as const

export type Messages = typeof messages.en

export function useI18n() {
  const appStore = useAppStore()
  const locale = computed(() => appStore.locale)
  const t = computed(() => messages[appStore.locale])
  return { t, locale }
}
