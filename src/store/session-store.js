import {defineStore} from "pinia"
import { login, logout, verify, setSession, getUserInfo } from "/@/api/login";
import storage from "store";

export const userSessionStore = defineStore('session', {
    state: () => ({
        authenticated: storage.get('authenticated') || false,
        currentUser: storage.get('currentUser') || '',
        userRole: null,
        sessions: storage.get('sessions') || {}
    }),
    getters: {
        isLoggedIn: state => state.authenticated,
        sessionNames: state => Object.keys(state.sessions),
        hasMultipleSessions() {
            return this.sessionNames.length > 1
        }
    },
    actions: {
        async Login(username, password) {
            const { code, session, token } = await login(username, password)
            if (code === 200) {
                this.sessions = { [username]: { session, token }}
                const expire = new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                this.saveSessions()
                this.setAuthentication(true, expire)
                this.onSessionInitialized(session, token)
                await this.fetchUserRole()
                this.currentUser = username
                return true
            }
            return false
        },
        async Recover () {
            const user = this.sessions[this.currentUser]
            if (!user) {
                storage.remove('authenticated')
                this.authenticated = false
                return false
            }
            const { session, token } = user
            const code = await verify(session, token)
            if (code === 200) {
                this.onSessionInitialized(session, token)
                await this.fetchUserRole()
                return true
            } else {
                storage.remove('authenticated')
                this.authenticated = false
            }
            return false
        },
        async Logout () {
            const user = this.sessions[this.currentUser]
            if (!user) {
                this.authenticated = false
                return false
            }
            const { session, token } = user
            const { code } = await logout(session, token)
            if (code === 200) {
                this.clear()
            }
        },
        async fetchUserRole () {
            if (this.authenticated) {
                const { data: { code, data: { role }}} = await getUserInfo()
                if (code === 200) {
                    this.userRole = role
                }
            }
        },
        saveSessions () {
            storage.set('sessions', this.sessions)
        },
        saveCurrentSessionName (username, expire) {
            storage.set('sessions', username, expire)
        },
        setAuthentication (authenticated, expire) {
            storage.set('authenticated', authenticated, expire)
        },
        async addNewSession (username, password) {
            const { code, session, token } = await login(username, password)
            if (code === 200) {
                this.sessions[username] = { session, token }
                const expire = new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                this.saveSessions()
                this.saveCurrentSessionName(username, expire)
                this.setAuthentication(true, expire)
                return true
            }
            return false
        },
        deleteSession (username) {
            delete this.sessions[username]
            this.saveSessions()
        },
        deleteSessions (usernames) {
            usernames.forEach(username => {
                this.deleteSession(username)
            })
        },
        getNextSession () {
            return this.sessionNames.find(name => name !== this.currentUser)
        },
        onSessionInitialized (session, token) {
            setSession(session, token)
            // TODO get notification from message box
        },
        switchUser (username) {
            if (username === this.currentUser) return
            this.saveCurrentSessionName(username)
            location.reload()
        },
        clear () {
            storage.remove('sessions')
            storage.remove('currentUser')
            storage.remove('authenticated')
            this.$reset()
        }
    }
})
