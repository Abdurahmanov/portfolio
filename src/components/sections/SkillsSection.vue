<template>
  <section id="skills" class="skills section">
    <div class="container">
      <h2 v-reveal class="section-title">{{ t.skills.title }}</h2>
    </div>
    <div v-reveal="{ delay: '0.15s', direction: 'fade' }" class="skills__marquee-wrap">
      <div
        v-for="dir in ['fwd', 'rev']"
        :key="dir"
        :class="['skills__track', `skills__track_${dir}`]"
      >
        <div class="skills__row">
          <template v-for="i in 2" :key="i">
            <span
              v-for="skill in dir === 'fwd' ? row1 : row2"
              :key="skill + (i === 2 ? '_dup' : '')"
              class="skills__tag glass-card"
              :aria-hidden="i === 2"
            >
              <i v-if="iconMap[skill]" :class="['skills__icon', iconMap[skill]]"></i>
              <span v-else-if="emojiMap[skill]" class="skills__emoji" aria-hidden="true">
                {{ emojiMap[skill] }}
              </span>
              {{ skill }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { useI18n } from '@/i18n'

const store = usePortfolioStore()
const { t } = useI18n()

const iconMap: Record<string, string> = {
  React: 'devicon-react-original colored',
  'Next.js': 'devicon-nextjs-plain',
  'Vue.js': 'devicon-vuejs-plain colored',
  'Nuxt.js': 'devicon-nuxtjs-plain colored',
  TypeScript: 'devicon-typescript-plain colored',
  'JavaScript (ES6+)': 'devicon-javascript-plain colored',
  Redux: 'devicon-redux-original colored',
  MobX: 'devicon-mobx-plain colored',
  GraphQL: 'devicon-graphql-plain colored',
  Jest: 'devicon-jest-plain colored',
  SCSS: 'devicon-sass-original colored',
  Figma: 'devicon-figma-plain colored',
  Webpack: 'devicon-webpack-plain colored',
  Vite: 'devicon-vitejs-plain colored',
  Capacitor: 'devicon-capacitor-plain colored',
  Ionic: 'devicon-ionic-original colored',
  Storybook: 'devicon-storybook-plain colored',
}

const emojiMap: Record<string, string> = {
  Pinia: '🍍',
  Zustand: '🐻',
  REST: '🌐',
  'Core Web Vitals': '⚡',
  SEO: '🔍',
  'A/B Testing': '🧪',
  Vitest: '⚡',
  Cypress: '🤖',
  'Styled-components': '💅',
  Scrum: '🔄',
  Kanban: '📋',
  Highcharts: '📊',
}

const row1 = computed(() => store.skills.slice(0, Math.ceil(store.skills.length / 2)))
const row2 = computed(() => store.skills.slice(Math.ceil(store.skills.length / 2)))
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.skills {
  overflow: hidden;

  &__marquee-wrap {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin-top: $spacing-xl;
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  }

  &__track {
    overflow: hidden;

    &_fwd .skills__row {
      animation: marquee-forward 35s linear infinite;
    }

    &_rev .skills__row {
      animation: marquee-reverse 28s linear infinite;
    }
  }

  &__row {
    display: flex;
    gap: $spacing-md;
    width: max-content;
  }

  &__tag {
    display: inline-flex;
    gap: $spacing-sm;
    align-items: center;
    padding: $spacing-sm $spacing-xl;
    font-size: $font-size-base;
    font-weight: 500;
    color: var(--color-text-secondary);
    white-space: nowrap;
    cursor: default;
    user-select: none;
    border-radius: 100px;
    transition:
      border-color $transition-fast,
      color $transition-fast;

    &:hover {
      color: var(--color-text-primary);
      border-color: var(--color-accent);
    }
  }

  &__icon {
    font-size: 1.25rem;
  }

  &__emoji {
    font-size: 1.1rem;
    font-style: normal;
  }
}

@keyframes marquee-forward {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-reverse {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
