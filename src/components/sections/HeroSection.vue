<template>
  <section
    id="home"
    class="hero"
    :style="`--mx:${mouseX}%;--my:${mouseY}%`"
    @mousemove="onMouseMove"
  >
    <div class="hero__bg-gradient" aria-hidden="true"></div>
    <div class="hero__mouse-light" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__left hero__fade-in">
        <div class="hero__photo">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="100" fill="transparent" />
            <circle cx="100" cy="82" r="40" fill="var(--color-text-muted)" opacity="0.4" />
            <ellipse
              cx="100"
              cy="190"
              rx="62"
              ry="48"
              fill="var(--color-text-muted)"
              opacity="0.4"
            />
          </svg>
        </div>
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
          {{ t.hero.currentJob }}
        </div>
      </div>
      <div class="hero__right">
        <p class="hero__greeting hero__anime hero__anime_2">{{ t.hero.greeting }}</p>
        <h1 class="hero__name hero__anime hero__anime_3 text-gradient">
          {{ locale === 'ru' ? store.personal.nameRu : store.personal.name }}
        </h1>
        <h2 class="hero__role hero__anime hero__anime_4">
          {{ locale === 'ru' ? store.personal.titleRu : store.personal.title }}
        </h2>
        <p class="hero__loc hero__anime hero__anime_5">
          <span aria-hidden="true">📍</span>
          {{ locale === 'ru' ? store.personal.locationRu : store.personal.location }}
        </p>
        <div class="hero__cta hero__anime hero__anime_6">
          <button class="btn btn_primary" @click="scrollTo('#contact')">{{ t.hero.cta }}</button>
          <button class="btn btn_ghost" @click="scrollTo('#experience')">
            {{ t.hero.ctaAlt }}
          </button>
          <a href="/resume.pdf" download class="btn btn_ghost"
            ><span aria-hidden="true">⬇</span> {{ t.hero.downloadCV }}</a
          >
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

const mouseX = ref(50)
const mouseY = ref(50)

function onMouseMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  mouseX.value = ((e.clientX - rect.left) / rect.width) * 100
  mouseY.value = ((e.clientY - rect.top) / rect.height) * 100
}

function scrollTo(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;

  &__bg-gradient {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(ellipse 80% 60% at 50% -10%, var(--color-accent-glow), transparent);
  }

  &__mouse-light {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(
        200px circle at var(--mx, 50%) var(--my, 50%),
        var(--color-mouse-glow),
        transparent 100%
      ),
      radial-gradient(
        700px circle at var(--mx, 50%) var(--my, 50%),
        var(--color-accent-subtle),
        transparent 70%
      );
  }

  &__inner {
    position: relative;
    z-index: 1;
    display: flex;
    gap: $spacing-4xl;
    align-items: center;
    padding-top: 80px;
    padding-bottom: $spacing-3xl;

    @media (max-width: $bp-lg) {
      gap: $spacing-2xl;
    }

    @media (max-width: $bp-md) {
      flex-direction: column;
      gap: $spacing-xl;
      text-align: center;
    }
  }

  &__left {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: $spacing-md;
    align-items: center;
    width: 290px;

    @media (max-width: $bp-md) {
      flex-shrink: 1;
      width: auto;
    }
  }

  &__photo {
    width: 220px;
    height: 220px;
    overflow: hidden;
    background: var(--color-bg-card);
    border: 3px solid var(--color-glass-border);
    border-radius: 50%;
    box-shadow: var(--color-shadow);
    transition:
      transform $transition-base,
      box-shadow $transition-base;

    &:hover {
      box-shadow: 0 10px 40px var(--color-accent-subtle);
      transform: translateY(-5px) scale(1.02);
    }

    @media (max-width: $bp-lg) {
      width: 180px;
      height: 180px;
    }

    @media (max-width: $bp-md) {
      width: 140px;
      height: 140px;
      margin: 0 auto;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__badge {
    display: inline-flex;
    gap: $spacing-sm;
    align-items: center;
    padding: 5px $spacing-md;
    font-size: $font-size-xs;
    font-weight: 500;
    color: var(--color-text-secondary);
    white-space: nowrap;
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: 100px;
  }

  &__badge-dot {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    background: #3fb950;
    border-radius: 50%;
    animation: blink 2s infinite;
  }

  &__right {
    width: 100%;
    min-width: 0;
    max-width: 625px;

    @media (max-width: $bp-md) {
      order: -1;
    }
  }

  &__greeting {
    min-height: 1.6em;
    margin-bottom: $spacing-xs;
    font-size: $font-size-lg;
    font-weight: 500;
    color: var(--color-accent);
  }

  &__name {
    min-height: 1.1em;
    margin-bottom: $spacing-sm;
    font-size: clamp(2rem, 5vw, $font-size-5xl);
    font-weight: 800;
    line-height: 1.1;
    color: var(--color-text-primary);
    overflow-wrap: break-word;
  }

  &__role {
    min-height: 1.2em;
    margin-bottom: $spacing-sm;
    font-size: clamp($font-size-lg, 2.5vw, $font-size-2xl);
    font-weight: 500;
    color: var(--color-text-secondary);
  }

  &__loc {
    min-height: 1.5em;
    margin-bottom: $spacing-xl;
    font-size: $font-size-sm;
    color: var(--color-text-muted);
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-md;

    @media (max-width: $bp-md) {
      justify-content: center;
    }
  }

  &__fade-in {
    opacity: 0;
    animation: hero-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  &__anime {
    opacity: 0;
    animation: hero-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;

    @for $i from 1 through 6 {
      &_#{$i} {
        animation-delay: #{($i - 1) * 0.1}s;
      }
    }
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

@keyframes hero-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: $spacing-sm $spacing-xl;
  font-family: inherit;
  font-size: $font-size-base;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: $border-radius-sm;
  transition: all $transition-base;
  min-height: 44px;

  &_primary {
    color: #fff;
    background: var(--color-accent);

    &:hover {
      color: #fff;
      background: var(--color-accent-hover);
      box-shadow: 0 4px 12px var(--color-accent-border);
      transform: translateY(-2px);
    }
  }

  &_ghost {
    color: var(--color-text-primary);
    background: transparent;
    border-color: var(--color-border);

    &:hover {
      color: var(--color-accent);
      border-color: var(--color-accent);
      box-shadow: 0 4px 12px var(--color-accent-subtle);
      transform: translateY(-2px);
    }
  }
}
</style>
