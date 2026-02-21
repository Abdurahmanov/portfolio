<template>
  <section id="contact" class="contact section">
    <div class="container contact__inner">
      <h2 v-reveal class="section-title">{{ t.contact.title }}</h2>
      <p v-reveal="{ delay: '0.1s' }" class="contact__desc">{{ t.contact.description }}</p>
      <div v-reveal="{ delay: '0.2s' }" class="contact__links">
        <a
          v-if="store.personal.email"
          :href="`mailto:${store.personal.email}`"
          class="contact__link"
        >
          <span class="contact__icon" aria-hidden="true">✉</span
          ><span>{{ store.personal.email }}</span>
        </a>
        <a
          :href="store.personal.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="contact__link"
        >
          <span class="contact__icon" aria-hidden="true">in</span
          ><span>{{ t.contact.linkedinLabel }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio'
import { useI18n } from '@/i18n'
const store = usePortfolioStore()
const { t } = useI18n()
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.contact {
  background: var(--color-bg-secondary);

  &__desc {
    margin-bottom: $spacing-2xl;
    font-size: $font-size-lg;
    line-height: 1.7;
    color: var(--color-text-secondary);
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__link {
    box-sizing: border-box;
    display: inline-flex;
    gap: $spacing-md;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    padding: $spacing-md $spacing-xl;
    font-size: $font-size-base;
    font-weight: 500;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    border-radius: $border-radius-sm;
    transition: all $transition-base;

    span:not(.contact__icon) {
      min-width: 0;
      word-break: break-all;
      overflow-wrap: break-word;
    }

    &:hover {
      color: var(--color-accent);
      border-color: var(--color-accent);
    }
  }

  &__icon {
    width: 24px;
    font-size: $font-size-lg;
    font-style: normal;
    font-weight: 700;
    color: var(--color-accent);
    text-align: center;
  }
}
</style>
