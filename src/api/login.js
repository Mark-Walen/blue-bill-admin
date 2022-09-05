import request from '@/utils/request'
import {SESSION} from "/@/store/session";
import dayjs from "dayjs";
import md5 from 'js-md5'
import {sha256} from "js-sha256";

const userApi = {
    Login: '/auth/login',
    Logout: '/auth/logout',
    MakeNonce: '/auth/make-nonce',
    Verify: '/auth/verify',
    ForgetPassword: '/auth/forgte-password',
    twoStepCode: '/auth/2step-code',
    SendSms: '/account/sms',
    SendSmsErr: '/account/sms_err',
    // get my info
    UserInfo: '/user/info',
    UserMenu: '/user/nav'
}

export const toFormData = data => {
    const signedData = sign(data)
    const formData = new FormData()
    Object.keys(signedData).forEach(key => {
        formData.append(key, signedData[key])
    })
    return formData
}

export const getLoginKey = (username, password, authNonce) => {
    const passwordMd5 = md5(password)
    return sha256(JSON.stringify([username, passwordMd5, authNonce]))
}

export const getVerifyKey = (sessionId, token, authNonce) => {
    return sha256(JSON.stringify([sessionId, token, authNonce]))
}

export const getLogoutKey = (sessionId, token) => {
    return sha256(JSON.stringify([sessionId, token]))
}

export const makeSignature = data => {
    const excludes = ['_sign', 'key']
    const payload = Object.keys(data).filter(k => !excludes.includes(k)).map(k => [k, data[k]])
    payload.sort()
    payload.push(['key', SESSION.salt])
    const tmp = payload.map(([k, v]) => `${k}=${v}`).join('&')
    return md5(tmp)
}

export const sign = data => {
    data = data || {}
    const tmp = {
        ...data,
        timestamp: dayjs().unix(),
        session: SESSION.session
    }
    tmp._sign = makeSignature(tmp)
    return tmp
}

export const login = async (username, password) => {
    const api = request()
    const formDataNonce = new FormData()
    formDataNonce.append('auth', username)
    const { data: { data: nonce }} = await api.post(userApi.MakeNonce, formDataNonce)

    const formData = new FormData()
    formData.append('user', username)
    formData.append('key', getLoginKey(username, password, nonce))
    const  { data: { code, session, token } } = await api.post(userApi.Login, formData)
    return { code, session, token }
}

export const verify = async (session, token) => {
    const api = request()
    const formDataNonce = new FormData()
    formDataNonce.append('auth', session)
    const { data: { data: nonce }} = await api.post(userApi.MakeNonce, formDataNonce)

    const formData = new FormData()
    formData.append('session', session)
    formData.append('key', getVerifyKey(session, token, nonce))
    const  { data: { code } } = await api.post(userApi.Verify, formData)
    return code
}

export const getUserInfo = async () => {
    const api = useSessionApi()
    return await api.get(userApi.UserInfo)
}

export const logout = async (session, token) =>{
    const api = request()
    const formData = new FormData()

    formData.append('session', session)
    formData.append('key', getLogoutKey(session, token))
    const { data : { code, msg } } = await api.post(userApi.Logout)
    return { code, msg }
}

export const setSession = (session, token) => {
    SESSION.session = session
    SESSION.salt = token
}

export const useSessionApi = () => {
    const api = request()
    return {
        get: (url, data) => api.get(url, { params: sign(data || {}) }),
        post: (url, data) => api.post(url, toFormData(data))
    }
}
