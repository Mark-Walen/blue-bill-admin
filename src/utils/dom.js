import {useRouter} from "vue-router/dist/vue-router";
import DynamicDialogWrapper from '../components/DynamicDialogWrapper.vue'
import {ElCard, ElButton, ElDialog} from "element-plus";
import {createApp, h} from "vue";
import {createPinia} from "pinia";

const _g = { routePathId: 0}

export const contexts = []
export const getRouteHeadId = () => _g.routePathId

export const dialogTemporary = {
    firstSource: ''
}

export const removeUnused = (routeId, toPath) => {
    if (contexts.length === 1 && toPath === dialogTemporary.firstSource) {
        dialogTemporary.firstSource = ''
        contexts.length = 0
        return
    }
    while (contexts.length && contexts[contexts.length -1][3] > routeId) {
        contexts.pop()
    }
}

export const findContext = (routeId) => contexts.find(context => Number(context[3] === Number(routeId)))

export const useResponsiveDialog = (comp) => {
    const router = useRouter()
    const tempPinia = createPinia()
    const show = (props, options, store) => {
      if (!store.hasOwnProperty('sm')) {
          return
      }
      if (store.sm) {
          // console.log(store.sm)
          let app = createApp({
              name: 'BmDynamicDialog',
              setup: () => () => h(DynamicDialogWrapper, {
                  comp,
                  compProps: props,
                  options
              })
          })
          app.use(tempPinia).use(ElCard).use(ElButton).use(ElDialog)
          const el = document.createElement('div')
          const target = document.body
          target.appendChild(el)
          app.mount(el)
      } else {
          if (!dialogTemporary.firstSource) {
              dialogTemporary.firstSource = router.currentRoute.value.fullPath
          }
          const routeId = getRouteHeadId()
          _g.routePathId++
          contexts.push([comp, props, options, routeId])
          router.push({
              path: '/mobile-dialog',
              query: {
                  _route: routeId
              }
          })
      }
    }
    return { show }
}