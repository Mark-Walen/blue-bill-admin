import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import route from './router'
import '@/assets/css/index.stylus'

createApp(App)
.use(createPinia())
.use(ElementPlus, {
    locale: zhCn
})
.use(route)
.mount('#app')
