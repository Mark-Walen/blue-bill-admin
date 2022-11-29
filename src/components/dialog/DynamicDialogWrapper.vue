<template>
  <div class="dynamic-dialog-wrapper">
    <el-dialog
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
            <el-button @click="close" link class="btn__dialog-close">
              <span class="focus-helper"></span>
              <svg-icon @click="close" :size="18" name="close"></svg-icon>
            </el-button>
          </bm-bar>
        </div>
      </template>
      <component :is="props.comp" v-bind="props.comProps"></component>
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

.dynamic-dialog-wrapper :deep(.el-dialog)
  --el-dialog-padding-primary 0

.dynamic-dialog-wrapper :deep(.el-dialog__header)
  padding-bottom 0
  margin-right: 0
  .btn__dialog-close
    margin-left 2px


.btn__dialog-close
  padding 0.285em
  position relative
  min-height 2em
  width auto
  height auto
  line-height 1.715em
  .focus-helper
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    pointer-events none
    border-radius inherit
    opacity: 0
    transition background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.5, 1)
    outline 0
  .focus-helper:after
    background-color #fff

  .focus-helper:before
    background-color #000

.focus-helper:before,
.focus-helper:after
  content ""
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  border-radius inherit
  opacity: 0
  transition background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 0.8, 0.5, 1)

.btn__dialog-close:hover
  .focus-helper
    background currentColor
    opacity 0.5
  .focus-helper:before
    opacity .1
  .focus-helper:after
    opacity .4

</style>