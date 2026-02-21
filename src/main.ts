import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/main.scss'
import App from '@/App.vue'
import { vReveal } from '@/directives/vReveal'

const app = createApp(App)

app.use(createPinia())
app.directive('reveal', vReveal)
app.mount('#app')
