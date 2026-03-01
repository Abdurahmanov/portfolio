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

      <div v-reveal="{ delay: '0.3s' }" class="about__travels">
        <div class="about__travels-header">
          <h3 class="about__subtitle">{{ t.about.travelsTitle }}</h3>
          <p class="about__travels-desc">{{ t.about.travelsDescription }}</p>
        </div>

        <div class="about__gallery" role="region" :aria-label="t.about.carouselLabel" tabindex="0">
          <div
            v-for="(photo, i) in photos"
            :ref="(el) => setItemRef(el, i)"
            :key="i"
            class="about__gallery-item"
            role="group"
            :aria-label="`${i + 1} / ${photos.length}: ${photo.alt}`"
          >
            <img
              class="about__gallery-placeholder"
              :src="photo.placeholder"
              alt=""
              aria-hidden="true"
            />
            <picture v-if="visibleSet[i]">
              <source
                :srcset="photo.srcset"
                sizes="(max-width: 640px) 85vw, 350px"
                type="image/webp"
              />
              <img
                class="about__gallery-real"
                :class="{ 'about__gallery-real--loaded': loadedSet[i] }"
                :src="photo.src"
                :alt="photo.alt"
                width="400"
                height="711"
                @load="loadedSet[i] = true"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted, onBeforeUnmount } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { useI18n } from '@/i18n';
import { travelPlaceholders } from '@/assets/travel-placeholders';

const store = usePortfolioStore();
const { t, aboutDescriptionBefore, pagespeedUrl } = useI18n();

const photos = computed(() =>
  ['travel1', 'travel2', 'travel3'].map((name, i) => ({
    src: `/images/${name}-800w.webp`,
    srcset: `/images/${name}-400w.webp 400w, /images/${name}-800w.webp 800w`,
    placeholder: travelPlaceholders[name],
    alt: t.value.about.photoAlts[i],
  })),
);

const loadedSet = reactive<boolean[]>([false, false, false]);

const visibleSet = reactive<boolean[]>([false, false, false]);

const itemIndexMap = new Map<HTMLElement, number>();

const setItemRef = (el: unknown, i: number) => {
  if (el instanceof HTMLElement) {
    itemIndexMap.set(el, i);
  }
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const i = itemIndexMap.get(entry.target as HTMLElement);
        if (i === undefined) {
          return;
        }
        if (entry.isIntersecting) {
          visibleSet[i] = true;
          observer!.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '100px' },
  );

  itemIndexMap.forEach((_, el) => observer!.observe(el));
});

onBeforeUnmount(() => {
  observer?.disconnect();
  itemIndexMap.clear();
});
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

  &__travels {
    padding-top: $spacing-2xl;
    margin-top: $spacing-3xl;
    border-top: 1px solid var(--color-border);
  }

  &__travels-header {
    margin-bottom: $spacing-xl;
    text-align: center;
  }

  &__travels-desc {
    max-width: 600px;
    margin: 0 auto;
    font-size: $font-size-base;
    line-height: 1.6;
    color: var(--color-text-secondary);
  }

  &__gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-md;
    outline: none;

    &:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 3px;
      border-radius: $border-radius-sm;
    }

    @media (max-width: $bp-md) {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  &__gallery-item {
    position: relative;

    aspect-ratio: 9 / 16;
    overflow: hidden;
    border-radius: $border-radius-md;

    picture {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: block;
    }

    @media (max-width: $bp-md) {
      flex: 0 0 55%;
    }

    @media (max-width: $bp-sm) {
      flex: 0 0 85%;
      scroll-snap-align: start;
    }
  }

  &__gallery-placeholder {
    width: 100%;
    image-rendering: pixelated;
  }

  &__gallery-real {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition:
      opacity 0.6s ease,
      transform $transition-base;

    &--loaded {
      opacity: 1;
    }
  }

  @media (hover: hover) {
    &__gallery-item:hover &__gallery-real--loaded {
      transform: scale(1.05);
    }
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
