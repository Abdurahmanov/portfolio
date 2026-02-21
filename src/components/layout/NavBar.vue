<template>
  <header class="navbar" :class="{ navbar_scrolled: isScrolled }">
    <div class="navbar__progress" :style="{ width: `${scrollProgress}%` }"></div>
    <div class="container navbar__inner">
      <button
        class="navbar__burger"
        :class="{ navbar__burger_active: isMenuOpen }"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span><span aria-hidden="true"></span
        ><span aria-hidden="true"></span>
      </button>

      <nav id="mobile-menu" class="navbar__nav" :class="{ navbar__nav_open: isMenuOpen }">
        <button
          v-for="id in navIds"
          :key="id"
          class="navbar__link"
          @click="scrollToSection(`#${id}`)"
        >
          {{ t.nav[id] }}
        </button>
      </nav>

      <div
        class="navbar__overlay"
        :class="{ navbar__overlay_visible: isMenuOpen }"
        @click="closeMenu"
      ></div>

      <div class="navbar__controls">
        <div class="navbar__lang">
          <button
            class="navbar__lang-btn"
            :class="{ active: appStore.locale === 'en' }"
            :aria-current="appStore.locale === 'en' ? 'true' : undefined"
            aria-label="Switch to English"
            @click="appStore.setLocale('en' as Locale)"
          >
            EN
          </button>
          <span class="navbar__lang-sep" aria-hidden="true">/</span>
          <button
            class="navbar__lang-btn"
            :class="{ active: appStore.locale === 'ru' }"
            :aria-current="appStore.locale === 'ru' ? 'true' : undefined"
            aria-label="Switch to Russian"
            @click="appStore.setLocale('ru' as Locale)"
          >
            RU
          </button>
        </div>
        <button class="navbar__theme" aria-label="Toggle theme" @click="appStore.toggleTheme()">
          <span v-if="appStore.theme === 'dark'" class="navbar__theme-sun" aria-hidden="true"
            >☀️</span
          >
          <span v-else aria-hidden="true">🌙</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from '@/i18n'
import type { Locale } from '@/stores/app'

const appStore = useAppStore()
const { t } = useI18n()

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const scrollProgress = ref(0)

const navIds = ['about', 'skills', 'experience', 'education', 'contact'] as const

function handleScroll() {
  isScrolled.value = window.scrollY > 50
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  document.documentElement.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  isMenuOpen.value = false
  document.documentElement.style.overflow = ''
}

function scrollToSection(id: string) {
  closeMenu()
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.documentElement.style.overflow = ''
})
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 201;
  padding: $spacing-md 0;
  transition:
    background $transition-base,
    box-shadow $transition-base;

  &_scrolled {
    background: var(--color-navbar-bg);
    box-shadow: 0 1px 0 var(--color-border);
  }

  &__progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover));
    border-radius: 0 2px 2px 0;
    transition: width 0.1s linear;
  }

  &__inner {
    display: flex;
    gap: $spacing-lg;
    align-items: center;

    @media (min-width: #{$bp-md + 1}) {
      justify-content: space-between;
    }
  }

  &__nav {
    display: flex;
    gap: $spacing-xl;

    @media (max-width: $bp-md) {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 200;
      flex-direction: column;
      gap: 0;
      width: 260px;
      padding: 80px $spacing-xl $spacing-xl;
      background: var(--color-bg-secondary);
      border-right: 1px solid var(--color-border);
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &_open {
        transform: translateX(0);
      }
    }
  }

  &__link {
    padding: 0;
    font-family: inherit;
    font-size: $font-size-sm;
    font-weight: 500;
    color: var(--color-text-secondary);
    letter-spacing: 0.02em;
    cursor: pointer;
    background: none;
    border: none;
    transition: color $transition-fast;

    &:hover {
      color: var(--color-accent);
    }

    @media (max-width: $bp-md) {
      padding: $spacing-md 0;
      font-size: $font-size-base;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }
  }

  &__overlay {
    display: none;

    @media (max-width: $bp-md) {
      position: fixed;
      inset: 0;
      z-index: 199;
      display: block;
      pointer-events: none;
      background: rgb(0 0 0 / 50%);
      opacity: 0;
      transition: opacity 0.3s ease;

      &_visible {
        pointer-events: all;
        opacity: 1;
      }
    }
  }

  &__controls {
    display: flex;
    flex-shrink: 0;
    gap: $spacing-md;
    align-items: center;

    @media (max-width: $bp-md) {
      margin-left: auto;
    }
  }

  &__lang {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  &__lang-sep {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
  }

  &__lang-btn {
    padding: 2px 4px;
    font-family: inherit;
    font-size: $font-size-sm;
    font-weight: 600;
    color: var(--color-text-muted);
    cursor: pointer;
    background: none;
    border: none;
    border-radius: 4px;
    transition: all $transition-fast;

    &.active {
      color: var(--color-accent);
    }

    &:hover {
      color: var(--color-accent);
    }
  }

  &__theme {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    font-size: 1rem;
    color: var(--color-text-primary);
    cursor: pointer;
    background: none;
    border: 1px solid var(--color-border);
    border-radius: $border-radius-sm;
    transition:
      border-color $transition-fast,
      color $transition-fast;

    &:hover {
      color: var(--color-accent);
      border-color: var(--color-accent);
    }
  }

  &__theme-sun {
    opacity: 0.85;
    filter: grayscale(1) brightness(1.2);
  }

  &__burger {
    display: none;

    @media (max-width: $bp-md) {
      position: relative;
      z-index: 201;
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 4px;
      cursor: pointer;
      background: none;
      border: none;
    }

    span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--color-text-primary);
      border-radius: 2px;
      transition:
        transform $transition-base,
        opacity $transition-base;
    }

    &_active {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }
}
</style>
