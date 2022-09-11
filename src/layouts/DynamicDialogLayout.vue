<template>
  <bm-card class="column w-screen h-screen">
    <bm-tool-bar-with-go-back>
      <span class="title-text">{{ optionsRef && optionsRef.title }}</span>
    </bm-tool-bar-with-go-back>
    <component :is="compRef" v-bind="compPropsRef || {}" v-if="compRef" />
    <bm-card v-else>not allowed</bm-card>
  </bm-card>
</template>
<script>
import BmCard from "../components/BmCard.vue";
import BmToolBarWithGoBack from "../components/toolbar/BmToolbarWithGoBack.vue";
import {defineComponent, onMounted, ref, watch} from "vue";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router/dist/vue-router";
import {findContext, removeUnused} from "../utils/dom";

export default defineComponent({
  name: 'DynamicDialogPage',
  components: {
    BmToolBarWithGoBack,
    BmCard
  },
  setup () {
    const compRef = ref(null)
    const compPropsRef = ref(null)
    const optionsRef = ref(null)
    const router = useRouter()
    const route = useRoute()
    const setComponent = () => {
      removeUnused(route.query._route)
      const [comp, compProps, options = {}] = findContext(route.query._route) || [null, null, null, null]
      compRef.value = comp

      const done = async (data) => {
        let res = null
        if (compProps && compProps.done) {
          res = compProps.done(data)
        }
        router.go(-1)
        return res
      }
      compPropsRef.value = {...(compProps || {}), done}

      optionsRef.value = options
    }
    watch(() => route.query._route, () => setComponent())
    onMounted(() => setComponent())

    onBeforeRouteLeave((to, from, next) => {
      next()
      removeUnused()
    })

    return { compRef, compPropsRef, optionsRef }
  }
})
</script>
<style>
.title-text {
  width: 100%;
  margin-right: 35px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
