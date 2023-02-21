<template>
  <svg :class="svgClass" :style="iconStyle" @click="emit('on-click')" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: 'bm-icon'
  },
  name: {
    type: String,
    required: true
  },
  width: {
    type: Number
  },
  height: {
    type: Number
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
const iconStyle = computed(() => {
  let w = props.width, h = props.height
  if (w && h) {
    return {
      width: w + 'px',
      height: h + 'px',
      color: props.color
    }
  } else if (w && h == null) {
    return {
      width: w + 'px',
      color: props.color
    }
  } else if (w == null && h) {
    return {
      height: h + 'px',
      color: props.color
    }
  }
  return {
    width: props.size + 'px',
    height: props.size + 'px',
    color: props.color
  }
})
</script>

<style scoped>
svg[class^=bm-icon] {
  fill: currentColor;
  overflow: hidden;
}
</style>