import { createI18n } from "vue-i18n"
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-CN' // TODO FIX: zh-CN to zh-cn when upload
import enLocale from './en'
import zhLocale from './zh-cn'

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale,
    },
}

const i18n = createI18n({
    globalInjection: true,
    locale: localStorage.getItem('language') || 'zh-cn', // 设置语种
    messages, // 设置全局当地语言包,
    fallbackLocale: 'zh-cn',
    numberFormats:{ //设置 数字本地化
        'en': {
            currency: { //添加 $
                style: 'currency', currency: 'USD'
            }
        },
        'zh-cn': {
            currency: { //添加 ￥
                style: 'currency', currency: 'JPY', currencyDisplay: 'symbol'
            }
        }
    },
    dateTimeFormats:{//设置 日期时间本地化
        'en': {
            short: {
                year: 'numeric', month: 'short', day: 'numeric'
            },
            long: {
                year: 'numeric', month: 'short', day: 'numeric',
                weekday: 'short', hour: 'numeric', minute: 'numeric'
            }
        },
        'zh-cn': {
            short: {
                year: 'numeric', month: 'short', day: 'numeric'
            },
            long: {
                year: 'numeric', month: 'short', day: 'numeric',
                weekday: 'short', hour: 'numeric', minute: 'numeric'
            }
        }
    }
})

export default i18n