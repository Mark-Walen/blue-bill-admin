import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/css/main.css'
import 'tailwindcss/tailwind.css'
import Screen from "./plugin/Screen";
import Dialog from "./plugin/Dialog";
import 'virtual:svg-icons-register'
import SvgIcon from "./components/icon/SvgIcon.vue";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
}).use(Screen, {
    $bm: {
        config: {
            screen: {
                bodyClasses: ['bluemonster']
            }
        },
        screen: {}
    }
}).use(Dialog)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
