import Dialog from "@/plugin/Dialog"
import Screen from '@/plugin/Screen'
import Dark from "@/plugin/Dark"
import IconSet from "@/plugin/icon-set"

const autoInstalledPlugins = [
  Screen,
  Dialog,
  Dark,
  IconSet
]

function isObject (v) {
  return v !== null && typeof v === 'object' && Array.isArray(v) !== true
}

function installPlugins (pluginOpts, pluginList) {
  pluginList.forEach(Plugin => {
    Plugin.install(pluginOpts)
    Plugin.__installed = true
  })
}

function prepareApp (app, uiOpts, pluginOpts) {
  app.config.globalProperties.$bm = pluginOpts.$bm
  app.provide('_bm_', pluginOpts.$bm)

  installPlugins(pluginOpts, autoInstalledPlugins)

  uiOpts.components !== void 0 && Object.values(uiOpts.components).forEach(c => {
    if (isObject(c) === true && c.name !== void 0) {
      app.component(c.name, c)
    }
  })

  uiOpts.directives !== void 0 && Object.values(uiOpts.directives).forEach(d => {
    if (isObject(d) === true && d.name !== void 0) {
      app.directive(d.name, d)
    }
  })

  uiOpts.plugins !== void 0 && installPlugins(
    pluginOpts,
    Object.values(uiOpts.plugins).filter(
      p => typeof p.install === 'function' && autoInstalledPlugins.includes(p) === false
    )
  )
}

export default function(parentApp, opts = {}) {
  const $bm = { version: '0.0.1'}
  $bm.config = opts.config || {}

  prepareApp(parentApp, opts,{
    parentApp,
    $bm,
    lang: opts.lang
  })
}
