<template>
  <NavBar />
  <HomePage />
  <FooterBar />
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import NavBar from '@/components/layout/NavBar.vue';
import FooterBar from '@/components/layout/FooterBar.vue';
import HomePage from '@/views/HomePage.vue';

// Theme initialization is handled reactively by the watcher in useAppStore
useAppStore();
</script>
