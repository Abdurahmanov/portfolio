<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__copy">© {{ year }} {{ store.personal.name }}. {{ t.footer.copy }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio'
import { useI18n } from '@/i18n'
const store = usePortfolioStore()
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.footer {
  padding: $spacing-xl 0;
  border-top: 1px solid var(--color-border);

  &__inner {
    display: flex;
    justify-content: center;
  }

  &__copy {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
  }
}
</style>
