<template>
  <section id="education" class="edu section">
    <div class="container">
      <h2 v-reveal class="section-title">{{ t.education.title }}</h2>
      <div class="edu__grid">
        <div
          v-for="(edu, index) in store.education"
          :key="index"
          v-reveal="{ delay: `${index * 0.15}s` }"
          class="edu__card glass-card glass-card_interactive"
        >
          <div class="edu__icon" aria-hidden="true">🎓</div>
          <div>
            <h3 class="edu__inst">{{ edu.institution[locale] }}</h3>
            <p class="edu__deg">{{ edu.degree[locale] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio'
import { useI18n } from '@/i18n'

const store = usePortfolioStore()
const { t, locale } = useI18n()
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.edu {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;

    @media (max-width: $bp-md) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    display: flex;
    gap: $spacing-lg;
    align-items: flex-start;
    padding: $spacing-xl;
  }

  &__icon {
    flex-shrink: 0;
    font-size: 2rem;
  }

  &__inst {
    margin-bottom: $spacing-xs;
    font-size: $font-size-base;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  &__deg {
    font-size: $font-size-sm;
    color: var(--color-text-secondary);
  }
}
</style>
