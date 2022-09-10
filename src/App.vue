<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import {useScreenStore} from "./stores/screen";

const width = ref(0)

function onResize() {
  width.value = document.body.clientWidth
}

onMounted(() => {
  window.addEventListener("resize", onResize)
  onResize()
})

onUnmounted(() => {
  window.removeEventListener("resize", onResize)
})
const screen = useScreenStore()
watch(width, () => {
  screen.$patch({ sm: width.value >= 1024 })
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style scoped>
</style>
