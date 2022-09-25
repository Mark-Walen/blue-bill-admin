import debounce from "../utils/debounce";
import { reactive } from "vue";
import defineReactivePlugin from "../utils/define-reactive-plugin";

const SIZE_LIST = [ 'sm', 'md', 'lg', 'xl' ]

export default defineReactivePlugin({
    width: 0,
    height: 0,
    name: 'xs',

    sizes: {
        sm: 600,
        md: 1024,
        lg: 1440,
        xl: 1920
    },

    lt: {
        sm: true,
        md: true,
        lg: true,
        xl: true
    },
    gt: {
        xs: false,
        sm: false,
        md: false,
        lg: false
    },

    xs: true,
    sm: false,
    md: false,
    lg: false,
    xl: false
},{
    setSizes: noop,
    setDebounce: noop,
    __update: noop(),
    __installed: false,

    install(app, options) {
        const { $bm } = options
        $bm.screen = this
        app.config.globalProperties.$bm = reactive($bm)
        if (this.__installed === true) {
            if ($bm.config.screen !== void 0) {
                if ($bm.config.screen.bodyClasses === false) {
                    document.body.classList.remove(`screen--${ this.name }`)
                } else {
                    this.__update(true)
                }
            }
            return
        }

        const { visualViewport } = window
        const target = visualViewport || window
        const scrollingElement = document.scrollingElement || document.documentElement
        const getSize = visualViewport === void 0
            ? () => [
                Math.max(window.innerWidth, scrollingElement.clientWidth),
                Math.max(window.innerHeight, scrollingElement.clientHeight)
            ]
            : () => [
                visualViewport.width * visualViewport.scale + window.innerWidth - scrollingElement.clientWidth,
                visualViewport.height * visualViewport.scale + window.innerHeight - scrollingElement.clientHeight
            ]
        const classes = $bm.config.screen !== void 0 && $bm.config.screen.bodyClasses === true
        this.__update = (force) => {
            const [ w, h ] = getSize()
            if (h !== this.height) {
                this.height = h
            }

            if (w !== this.width) {
                this.width = w
            } else if (force !== true) {
                return
            }

            let s = this.sizes

            this.gt.xs = w >= s.sm
            this.gt.sm = w >= s.md
            this.gt.md = w >= s.lg
            this.gt.lg = w >= s.xl
            this.lt.sm = w < s.sm
            this.lt.md = w < s.md
            this.lt.lg = w < s.lg
            this.lt.xl = w < s.xl
            this.xs = this.lt.sm
            this.sm = this.gt.xs === true && this.lt.md === true
            this.md = this.gt.sm === true && this.lt.lg === true
            this.lg = this.gt.md === true && this.lt.xl === true
            this.xl = this.gt.lg

            s = (this.xs === true && 'xs')
                || (this.sm === true && 'sm')
                || (this.md === true && 'md')
                || (this.lg === true && 'lg')
                || 'xl'

            if (s !== this.name) {
                if (classes === true) {
                    document.body.classList.remove(`screen--${ this.name }`)
                    document.body.classList.add(`screen--${ s }`)
                }
                this.name = s
            }
        }

        let updateEvt, updateSizes = {}, updateDebounce = 16
        this.setSizes = sizes => {
            SIZE_LIST.forEach(name => {
                if (sizes[ name ] !== void 0) {
                    updateSizes[ name ] = sizes[ name ]
                }
            })
        }
        this.setDebounce = deb => {
            updateDebounce = deb
        }

        const start = () => {
            const style = getComputedStyle(document.body)
            this.setSizes = sizes => {
                SIZE_LIST.forEach(name => {
                    if (sizes[ name ]) {
                        this.sizes[ name ] = sizes[ name ]
                    }
                })
                this.__update(true)
            }
            this.setDebounce = delay => {
                updateEvt !== void 0 && target.removeEventListener('resize', updateEvt)
                updateEvt = delay > 0
                    ? debounce(this.__update, delay)
                    : this.__update
                target.addEventListener('resize', updateEvt)
            }
            this.setDebounce(updateDebounce)
            if (Object.keys(updateSizes).length > 0) {
                this.setSizes(updateSizes)
                updateSizes = void 0
            } else {
                this.__update()
            }

            classes === true && this.name === 'xs'
            && document.body.classList.add('screen--xs')
        }
        start()
        this.__installed = true
    }
})

function noop() {

}
