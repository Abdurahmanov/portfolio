import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/800.css';
import '@fontsource/outfit/900.css';

import '@/styles/main.scss';
import App from '@/App.vue';
import { vReveal } from '@/directives/vReveal';

const app = createApp(App);

app.use(createPinia());
app.directive('reveal', vReveal);
app.mount('#app');
