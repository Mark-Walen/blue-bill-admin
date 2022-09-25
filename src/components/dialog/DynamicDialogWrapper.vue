<template>
  <div class="dynamic-dialog-wrapper">
    <el-dialog
        ref="dialogRef"
        v-model="visible"
        class="dynamic-dialog"
        :show-close="false"
        @closed="closedHandler"
        width="600px"
        align-center
        destroy-on-close >
      <template #header="{ close, titleId, titleClass }" style="--el-dialog-padding-primary: 0; padding-bottom: 0; margin-right: 0;">
        <div class="wrapper">
          <bm-bar>
            <span class="font-bold text-caption" :id="titleId">{{ props.options && props.options.title }}</span>
            <div class="space"></div>
            <el-button @click="close">X</el-button>
          </bm-bar>
        </div>
      </template>
      <component :is="props.comp" v-bind="props.cmpProps"></component>
    </el-dialog>
  </div>
</template>

<script setup>
import BmBar from "../BmBar.vue";
import {getCurrentInstance, nextTick, reactive, ref, toRefs} from "vue";

const props = defineProps({
  comp: { type: Object },
  comProps: { type: Object },
  options: { type: Object }
})

const state = reactive({
  visible: true
})

const { visible } = toRefs(state)

const setVisible = (visible) => {
  state.visible = visible
}

const { emit } = getCurrentInstance()

function closedHandler() {
  setVisible(false)
  nextTick(() => {
    emit('closed')
  })
}
</script>

<style lang="stylus" scoped>
.auto-size {
  width: auto;
  height: auto;
  max-width: 100vh;
}

.wrapper
  position relative;
  right var(--el-dialog-padding-primary)
  bottom var(--el-dialog-padding-primary)
  width 110.5%

.dynamic-dialog-wrapper :deep(.el-dialog) {
  --el-dialog-padding-primary 0
}

</style>