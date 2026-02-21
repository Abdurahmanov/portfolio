<template>
  <section id="about" class="about section">
    <div class="container">
      <h2 v-reveal class="section-title">{{ t.about.title }}</h2>
      <div class="about__grid">
        <div v-reveal="{ delay: '0.1s' }" class="about__text">
          <p class="about__summary">{{ aboutDescription }}</p>
        </div>
        <div v-reveal="{ direction: 'left', delay: '0.2s' }" class="about__langs">
          <h3 class="about__subtitle">{{ t.about.languages }}</h3>
          <ul class="about__lang-list">
            <li v-for="lang in store.languages" :key="lang" class="about__lang-item">
              <span class="about__lang-dot"></span>
              <span>{{ lang }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio';
import { useI18n } from '@/i18n';
const store = usePortfolioStore();
const { t, aboutDescription } = useI18n();
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.about {
  background: var(--color-bg-secondary);

  &__grid {
    display: grid;
    grid-template-columns: 1fr 220px;
    gap: $spacing-3xl;
    align-items: start;

    @media (max-width: $bp-md) {
      grid-template-columns: 1fr;
      gap: $spacing-2xl;
    }
  }

  &__summary {
    font-size: $font-size-lg;
    line-height: 1.8;
    color: var(--color-text-secondary);
  }

  &__subtitle {
    margin-bottom: $spacing-lg;
    font-size: $font-size-sm;
    font-weight: 700;
    color: var(--color-text-primary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__lang-list {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__lang-item {
    display: flex;
    gap: $spacing-sm;
    align-items: center;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    font-weight: 600;
    color: var(--color-text-primary);
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: $border-radius-sm;
  }

  &__lang-dot {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    background: var(--color-accent);
    border-radius: 50%;
  }
}
</style>
