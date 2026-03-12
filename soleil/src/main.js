import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from './plugins/fontAwesome'
import i18n from "./utils/i18n";

const app = createApp(App)


app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
