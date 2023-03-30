import defineReactivePlugin from '../utils/define-reactive-plugin.js'

const Plugin = defineReactivePlugin({
  isActive: false,
  mode: false
}, {
  __media: void 0,

  set(val) {
    Plugin.mode = val

    if (val === 'auto') {
      if (Plugin.__media === void 0) {
        Plugin.__media = window.matchMedia('(prefers-color-scheme: dark)')
        Plugin.__updateMedia = () => { Plugin.set('auto') }
        Plugin.__media.addListener(Plugin.__updateMedia)
      }

      val = Plugin.__media.matches
    }
    else if (Plugin.__media !== void 0) {
      Plugin.__media.removeListener(Plugin.__updateMedia)
      Plugin.__media = void 0
    }

    Plugin.isActive = val === true

    document.body.classList.remove(`body--${ val === true ? 'light' : 'dark' }`)
    document.body.classList.add(`body--${ val === true ? 'dark' : 'light' }`)
  },
  toggle() {
    Plugin.set(Plugin.isActive === false)
  },

  install({ $bm }) {
    const { dark } = $bm.config
    $bm.dark = this
    if (this.__installed === true && dark === void 0) {
      return
    }
    this.isActive = dark === true
    const initialVal = dark !== void 0 ? dark : false
  }
})

export default Plugin