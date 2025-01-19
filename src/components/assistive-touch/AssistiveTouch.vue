<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, useTemplateRef } from "vue";

const props = defineProps({
  position: {
    top: 100,
    left: 100
  }
});

const position = reactive({
  top: 100,
  left: 100
});
const startPos = reactive({
  x: 0,
  y: 0
});
const resizeObserver = ref(null)
const snapTimeout = ref(null)
const animationFrame = ref(null)
const root = useTemplateRef("root")
const menu = useTemplateRef("menu")
const showMenu = ref(false)
const isDragging = ref(false)
const isActive = ref(false)

// Methods
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const handleClick = (event) => {
  if (event.cancelable) {
    event.preventDefault()
  }

  if (isDragging.value) {
    return false
  }
}

const hiddenMenu = (event) => {
  if (showMenu.value) {
    showMenu.value = false
  }
}

const animateSnap = (targetLeft) => {
  const duration = 400
  const start = performance.now()
  const initialLeft = position.left

  const cubicBezier = (t) =>
    3 * t * (1 - t) ** 2 * 0.42 + 3 * t ** 2 * (1 - t) * 0.58 + t ** 3
  const step = (timestamp) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1); // Normalize progress (0 to 1)
    const easedProgress = cubicBezier(progress)

    // Update the position using the Bézier curve
    position.left =
      initialLeft + (targetLeft - initialLeft) * easedProgress;

    if (progress < 1) {
      animationFrame.value = requestAnimationFrame(step); // Continue animation
    } else {
      cancelAnimationFrame(animationFrame.value); // Ensure animation stops
    }
  }
  
  animationFrame.value = requestAnimationFrame(step)
}

const snapToBoundary = (snapPreference) => {
  if (showMenu.value) {
    return false
  }
  isActive.value = false
  const middle = window.innerWidth / 2
  const style = window.getComputedStyle(root.value)
  const width = parseFloat(style.width)
  let targetLeft
  if (snapPreference === 'left') {
    targetLeft = 0
  } else if (snapPreference === 'right') {
    targetLeft = window.innerWidth - width
  } else {
    targetLeft = position.left < middle ? 0 : window.innerWidth - width
  }
  animateSnap(targetLeft)
  return true
}

const cancelSnap = () => {
  if (snapTimeout.value) clearTimeout(snapTimeout.value)
  if (animationFrame) cancelAnimationFrame(animationFrame.value)
  isActive.value = true
}

const initiateSnap = (event) => {
  cancelSnap()
  snapTimeout.value = setTimeout(() => {
    snapToBoundary()
  }, 1500)
}

const startDrag = (event) => {
  if (event.cancelable) {
    event.preventDefault()
  }
  cancelSnap()
  startPos.x = event.clientX - position.left
  startPos.y = event.clientY - position.top
  document.addEventListener("mousemove", drag)
  document.addEventListener("mouseup", stopDrag)
}

const drag = (event) => {
  if (event.cancelable) {
    event.preventDefault()
  }
  if (Math.pow(event.clientX - startPos.x, 2) + Math.pow(event.clientY - startPos.y, 2) >= 4) {
    isDragging.value = true
  }
  const style = window.getComputedStyle(root.value)
  if (isDragging.value) {
    position.left = Math.max(
      0,
      Math.min(event.clientX - startPos.x, window.innerWidth - parseFloat(style.width)))
    position.top = Math.max(
      0,
      Math.min(event.clientY - startPos.y, window.innerHeight - parseFloat(style.height)))
  }
}

const stopDrag = (event) => {
  if (!isDragging.value) {
    toggleMenu()
  }
  document.removeEventListener("mousemove", drag)
  document.removeEventListener("mouseup", stopDrag)
  isDragging.value = false
}

const resize = () => {
  if (!isDragging.value) {
    const style = window.getComputedStyle(root.value)
    const width = parseFloat(style.width)
    const height = parseFloat(style.height)
    position.left = Math.max(-width/2, Math.min(position.left, window.innerWidth - width/2))
    position.top = Math.max(-height/2, Math.min(position.top, window.innerHeight - height/2))
  }
}

onMounted(() => {
  document.addEventListener("click", hiddenMenu)

  if (typeof window.ResizeObserver !== 'undefined') {
    resizeObserver.value = new window.ResizeObserver(() => resize())
    resizeObserver.value.observe(document.body)
  }
  snapToBoundary('right')
})

onBeforeUnmount(() => {
  document.removeEventListener("click", hiddenMenu)
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
})
</script>

<template>
  <div
    :class="['assistive-touch', {'assistive-touch-active': isActive}]"
    ref="root"
    :style="{ top: position.top + 'px', left: position.left + 'px' }"
    @mousedown="startDrag"
    @mouseenter="cancelSnap"
    @mouseleave="initiateSnap"
    @click.stop="handleClick"
  >
    <div class="assistive-icon">
      <slot name="assistive-icon">⚙️</slot>
    </div>
    <div v-if="showMenu" ref="menu" class="assistive-menu">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.assistive-touch
  position fixed
  z-index 9999
  width 2.5rem
  height 2.5rem
  background-color rgba(0, 0, 0, 0.5)
  border-radius 50%
  display flex
  justify-content center
  align-items center
  cursor grab

  .assistive-icon
    color white
    font-size 1.5rem

  .assistive-menu
    position absolute
    width max-content
    top 3rem
    left -0.5rem
    background-color #333
    padding 0.25rem
    box-shadow 0 0 0.25rem rgba(0, 0, 0, 0.5)
    z-index 9998

.assistive-touch-active
  background-color rgba(0, 0, 0, 0.7)
</style>