import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia()

export const webApi = new Api();

app.use(pinia)
app.use(router)

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {Api} from "@/web-api/web-api";

const vuetify = createVuetify({
    components,
    directives,
})

app.mount('#app')
