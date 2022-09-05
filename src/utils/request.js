import axios from "axios"
import { userSessionStore } from '@/store/session-store'
import storage from 'store'
import {ACCESS_TOKEN} from "/@/store/session";
import {VueAxios} from "/@/utils/axios";

const request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 6000   // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
        const data = error.response.data
        // TODO pinia store token
        const user = storage.get('currentUser')
        if (error.response.status === 403) {
            this.$notify.error({
                title: 'Forbidden',
                message: data.message
            })
        }
        // TODO bug remain
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            this.$notify.error({
                title: 'Unauthorized',
                message: 'Authorization verification failed'
            })
            if (user) {
                const store = userSessionStore()
                store.Logout().then(() => {
                    setTimeout(() => {
                        location.reload()
                    }, 1500)
                })
            }
        }
    }
}

request.interceptors.request.use(config => {
    const token = storage.get(ACCESS_TOKEN)

    if (token) {
        config.headers[ACCESS_TOKEN] = token
    }
    return config
}, errorHandler)

request.interceptors.response.use(response => {
    return response.data
}, errorHandler)

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, request)
    }
}

export default request

export {
    installer as VueAxios,
    request as axios
}
