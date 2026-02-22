<template>
  <section id="about" class="about section">
    <div class="container">
      <h2 v-reveal class="section-title">{{ t.about.title }}</h2>
      <div class="about__grid">
        <div v-reveal="{ delay: '0.1s' }" class="about__text">
          <p class="about__summary">
            {{ aboutDescriptionBefore
            }}<a
              :href="pagespeedUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="about__cwv-link text-gradient"
              :aria-label="t.about.cwvAriaLabel"
              aria-describedby="cwv-tooltip"
              >{{ t.about.cwvPhrase
              }}<span id="cwv-tooltip" class="about__cwv-tooltip" role="tooltip">{{
                t.about.cwvTooltip
              }}</span></a
            >{{ t.about.descriptionAfter }}
          </p>
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
const { t, aboutDescriptionBefore, pagespeedUrl } = useI18n();
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

.about__cwv-link {
  position: relative;
  display: inline-block;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  cursor: pointer;
  transition: text-decoration-color $transition-fast;

  &:hover,
  &:focus-visible {
    text-decoration-color: currentcolor;

    .about__cwv-tooltip {
      pointer-events: auto;
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
}

.about__cwv-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  width: max-content;
  max-width: 260px;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-sm;
  font-weight: 500;
  color: var(--color-text-primary);
  -webkit-text-fill-color: var(--color-text-primary);
  white-space: normal;
  pointer-events: none;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: $border-radius-sm;
  opacity: 0;
  backdrop-filter: blur(12px);
  transform: translateX(-50%) translateY(4px);
  transition:
    opacity $transition-fast,
    transform $transition-fast;

  &::after {
    position: absolute;
    top: 100%;
    left: 50%;
    content: '';
    border: 6px solid transparent;
    border-top-color: var(--color-border);
    transform: translateX(-50%);
  }
}
</style>
