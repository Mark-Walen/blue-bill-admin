import defineReactivePlugin from '@/utils/define-reactive-plugin.js'
import { injectProp } from '@/utils/inject-obj-prop.js'
// no extension on purpose for next one:
import materialIcons from '@/icon-set/material-icons'

const Plugin = defineReactivePlugin({
  iconMapFn: null,
  __icons: {}
}, {
  set (setObject) {
    const def = { ...setObject, rtl: setObject.rtl === true }
    def.set = Plugin.set
    Object.assign(Plugin.__icons, def)
  },

  install ({ $bm, iconSet }) {

      if ($bm.config.iconMapFn !== void 0) {
        this.iconMapFn = $bm.config.iconMapFn
      }

      $bm.iconSet = this.__icons

      injectProp($bm, 'iconMapFn', () => this.iconMapFn, val => { this.iconMapFn = val })

      if (this.__installed === true) {
        iconSet !== void 0 && this.set(iconSet)
      }
      else {
        this.set(iconSet || materialIcons)
      }
  }
})

export default Plugin