import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Toaster', Toaster)

app.mount('#app')
