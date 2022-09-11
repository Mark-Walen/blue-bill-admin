<template>
  <div :class="classes" role="toolbar">
    <slot></slot>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "BmBar",
  props: {
    dark: {
      type: Boolean,
      default: false  // TODO If dark mode is enabled, please change it to null
    },
    dense: Boolean
  },
  setup (props, { slots }) {
    const classes = computed(() =>
      'bm-bar row flex-nowrap items-center'
        + ` bm-bar--${ props.dense === true ? 'dense' : 'standard' }`
        + ` bm-bar--${ props.dark === true ? 'dark' : 'light' }`
    )
    return { classes }
  }
})
</script>

<style scoped>
.bm-bar {
  background: rgba(0, 0, 0, 0.2);
}

.bm-bar > .bm-icon {
  margin-left: 2px;
}

.bm-bar > div, .bm-bar > div + .bm-icon {
  margin-left: 8px;
}

.bm-bar > .bm-btn {
  margin-left: 2px;
}

.bm-bar > .bm-icon:first-child, .bm-bar > .bm-btn:first-child, .bm-bar > div:first-child {
  margin-left: 0;
}

.bm-bar--standard {
  padding: 0 12px;
  height: 32px;
  font-size: 18px;
}

.bm-bar--standard > div {
  font-size: 16px;
}

.bm-bar--standard .bm-btn {
  font-size: 11px;
}

.bm-bar--dense {
  padding: 0 8px;
  height: 24px;
  font-size: 14px;
}

.bm-bar--dense .bm-btn {
  font-size: 8px;
}

.bm-bar--dark {
  background: rgba(255, 255, 255, 0.15);
}
</style>