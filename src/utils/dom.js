import {useRouter} from "vue-router/dist/vue-router"
import DynamicDialogWrapper from '../components/dialog/DynamicDialogWrapper.vue'
import Screen from "../plugin/Screen"
import Dialog from "../plugin/Dialog";

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
    const show = (props, options) => {
      if (Screen.gt.sm) {
          Dialog.create({
              component: DynamicDialogWrapper,
              componentProps: { comp, comProps: props, options}
          })
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