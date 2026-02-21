<template>
  <section id="experience" class="experience section">
    <div class="container">
      <h2 v-reveal class="section-title">{{ t.experience.title }}</h2>
      <div class="exp__timeline">
        <div v-for="(job, index) in store.experience" :key="index" class="exp__item">
          <div class="exp__marker">
            <div class="exp__dot"></div>
            <div v-if="index < store.experience.length - 1" class="exp__line"></div>
          </div>
          <div
            v-reveal="{ direction: index % 2 === 0 ? 'right' : 'left', delay: '0.1s' }"
            class="exp__card glass-card"
          >
            <div
              class="exp__header"
              role="button"
              tabindex="0"
              :aria-expanded="expanded.has(index)"
              :aria-controls="`exp-body-${index}`"
              @click="toggle(index)"
              @keydown.enter="toggle(index)"
              @keydown.space.prevent="toggle(index)"
            >
              <div>
                <h3 class="exp__company">{{ job.company }}</h3>
                <p class="exp__role">{{ job.role[locale] }}</p>
              </div>
              <div class="exp__header-right">
                <div class="exp__meta">
                  <span class="exp__period">{{ job.period[locale] }}</span>
                  <span class="exp__loc">{{ job.location[locale] }}</span>
                </div>
                <button
                  class="exp__toggle"
                  :class="{ exp__toggle_open: expanded.has(index) }"
                  aria-hidden="true"
                  tabindex="-1"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              :id="`exp-body-${index}`"
              class="exp__body"
              :class="{ exp__body_open: expanded.has(index) }"
            >
              <ul class="exp__list">
                <li
                  v-for="(highlight, highlightIndex) in job.highlights[locale]"
                  :key="highlightIndex"
                  class="exp__li"
                >
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { useI18n } from '@/i18n'

const store = usePortfolioStore()
const { t, locale } = useI18n()

const expanded = ref<Set<number>>(new Set([0]))

function toggle(jobIndex: number) {
  if (expanded.value.has(jobIndex)) {
    expanded.value.delete(jobIndex)
  } else {
    expanded.value.add(jobIndex)
  }
  expanded.value = new Set(expanded.value)
}
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.experience {
  background: var(--color-bg-secondary);
}

.exp {
  &__timeline {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: $spacing-lg;
    padding-bottom: $spacing-2xl;

    @media (max-width: $bp-sm) {
      grid-template-columns: 20px 1fr;
      gap: $spacing-sm;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4px;
  }

  &__dot {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    background: var(--color-accent);
    border: 2px solid var(--color-bg);
    border-radius: 50%;
    box-shadow: 0 0 0 2px var(--color-accent);
  }

  &__line {
    flex: 1;
    width: 2px;
    margin-top: $spacing-sm;
    background: var(--color-border);
  }

  &__card {
    padding: $spacing-xl;

    @media (max-width: $bp-sm) {
      padding: $spacing-md;
    }
  }

  &__header {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-md;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: $spacing-lg;

    @media (max-width: $bp-md) {
      margin-bottom: 0;
      cursor: pointer;
    }
  }

  &__header-right {
    display: flex;
    gap: $spacing-sm;
    align-items: flex-start;
  }

  &__company {
    margin-bottom: $spacing-xs;
    font-size: $font-size-xl;
    font-weight: 700;
    color: var(--color-text-primary);
    overflow-wrap: break-word;

    @media (max-width: $bp-sm) {
      font-size: $font-size-base;
    }
  }

  &__role {
    font-size: $font-size-base;
    font-weight: 500;
    color: var(--color-accent);
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    align-items: flex-end;

    @media (max-width: $bp-sm) {
      align-items: flex-start;
    }
  }

  &__period {
    font-size: $font-size-sm;
    font-weight: 500;
    color: var(--color-text-secondary);
    white-space: nowrap;

    @media (max-width: $bp-sm) {
      white-space: normal;
    }
  }

  &__loc {
    font-size: $font-size-xs;
    color: var(--color-text-muted);
  }

  &__toggle {
    display: none;

    @media (max-width: $bp-md) {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      padding: 2px;
      margin-top: 2px;
      color: var(--color-text-muted);
      cursor: pointer;
      background: none;
      border: none;
      transition:
        transform $transition-base,
        color $transition-fast;

      &_open {
        color: var(--color-accent);
        transform: rotate(180deg);
      }
    }
  }

  &__body {
    @media (max-width: $bp-md) {
      display: grid;
      grid-template-rows: 0fr;
      margin-top: 0;
      transition:
        grid-template-rows 0.3s ease,
        margin-top 0.3s ease;

      &_open {
        grid-template-rows: 1fr;
        margin-top: $spacing-lg;
      }

      > ul {
        overflow: hidden;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__li {
    position: relative;
    padding-left: $spacing-md;
    font-size: $font-size-sm;
    line-height: 1.7;
    color: var(--color-text-secondary);

    &::before {
      position: absolute;
      left: 0;
      color: var(--color-accent);
      content: '▸';
    }
  }
}
</style>
