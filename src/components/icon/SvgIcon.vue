<template>
  <svg :class="svgClass" :style="{ width: size + 'px', height: size + 'px', color: color }" @click="emit('on-click')" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import {computed, defineComponent} from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: 'bm-icon'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 32
  },
  color: {
    type: String,
    default: "#000"
  }
})

const emit = defineEmits(['on-click'])
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `${props.prefix}__` + props.name
  } else {
    return props.prefix
  }
})
</script>

<style scoped>
svg[class^=bm-icon] {
  fill: currentColor;
  overflow: hidden;
}
</style>