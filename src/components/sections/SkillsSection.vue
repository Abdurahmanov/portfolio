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
              <component :is="iconMap[skill]" v-if="iconMap[skill]" class="skills__icon" />
              {{ skill }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { useI18n } from '@/i18n';

import IconReact from '~icons/logos/react';
import IconNextjs from '~icons/logos/nextjs-icon';
import IconVuejs from '~icons/logos/vue';
import IconNuxtjs from '~icons/logos/nuxt-icon';
import IconTypescript from '~icons/logos/typescript-icon';
import IconJavascript from '~icons/logos/javascript';
import IconRedux from '~icons/logos/redux';
import IconMobx from '~icons/logos/mobx';
import IconGraphql from '~icons/logos/graphql';
import IconJest from '~icons/logos/jest';
import IconSass from '~icons/logos/sass';
import IconFigma from '~icons/logos/figma';
import IconWebpack from '~icons/logos/webpack';
import IconVitejs from '~icons/logos/vitejs';
import IconCapacitor from '~icons/logos/capacitorjs-icon';
import IconIonic from '~icons/logos/ionic-icon';
import IconStorybook from '~icons/logos/storybook-icon';
import IconPinia from '~icons/logos/pinia';
import IconZustand from '~icons/twemoji/bear';
import IconRest from '~icons/vscode-icons/file-type-rest';
import IconLighthouse from '~icons/logos/lighthouse';
import IconSeo from '~icons/twemoji/magnifying-glass-tilted-right';
import IconAbTesting from '~icons/twemoji/test-tube';
import IconVitest from '~icons/logos/vitest';
import IconCypress from '~icons/logos/cypress-icon';
import IconStyledComponents from '~icons/vscode-icons/file-type-styled';
import IconScrum from '~icons/twemoji/counterclockwise-arrows-button';
import IconKanban from '~icons/twemoji/clipboard';
import IconHighcharts from '~icons/logos/highcharts';

const store = usePortfolioStore();
const { t } = useI18n();

const iconMap: Record<string, Component> = {
  React: IconReact,
  'Next.js': IconNextjs,
  'Vue.js': IconVuejs,
  'Nuxt.js': IconNuxtjs,
  TypeScript: IconTypescript,
  'JavaScript (ES6+)': IconJavascript,
  Redux: IconRedux,
  MobX: IconMobx,
  GraphQL: IconGraphql,
  Jest: IconJest,
  SCSS: IconSass,
  Figma: IconFigma,
  Webpack: IconWebpack,
  Vite: IconVitejs,
  Capacitor: IconCapacitor,
  Ionic: IconIonic,
  Storybook: IconStorybook,
  Pinia: IconPinia,
  Zustand: IconZustand,
  REST: IconRest,
  'Core Web Vitals': IconLighthouse,
  SEO: IconSeo,
  'A/B Testing': IconAbTesting,
  Vitest: IconVitest,
  Cypress: IconCypress,
  'Styled-components': IconStyledComponents,
  Scrum: IconScrum,
  Kanban: IconKanban,
  Highcharts: IconHighcharts,
};

const row1 = computed(() => store.skills.slice(0, Math.ceil(store.skills.length / 2)));
const row2 = computed(() => store.skills.slice(Math.ceil(store.skills.length / 2)));
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
    width: 1.25rem;
    height: 1.25rem;
    font-size: 1.25rem;
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
