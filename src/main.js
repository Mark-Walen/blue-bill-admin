import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from "@/i18n";

import './assets/css/main.css'
import './style.css'
import Bm from './plugin/Bm'
import 'virtual:svg-icons-register'
import SvgIcon from "./components/icon/SvgIcon.vue";

const app = createApp(App)

app.use(createPinia())
app.use(router).use(Bm, {
    config: {
        screen: {
            bodyClasses: ['bluemonster']
        }
    },
    dark: {
        isActive: false
    }
}).use(i18n)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
