import './assets/main.css'
import './assets/shadcn.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@/lib/utils' // Adjust the path if necessary

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();


app.use(pinia);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
