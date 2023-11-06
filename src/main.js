import '@/assets/main.css'
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'
// import App from '@/App.vue'
// import store from '@/store'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store' // Import your Vuex store

createApp(App).use(store).use(ElementPlus).mount('#app')
