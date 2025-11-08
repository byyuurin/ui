import 'uno.css'

import ui from '@byyuurin/ui/vue-plugin'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

const router = createRouter({
  routes,
  history: createWebHistory(),
})

createApp(App).use(ui).use(router).mount('#app')
