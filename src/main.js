import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VScrollLock from 'v-scroll-lock'
import "vue-progressive-image/dist/style.css"; 

import './assets/style.css'

createApp(App).use(VScrollLock).use(router).mount('#app')