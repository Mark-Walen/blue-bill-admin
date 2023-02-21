<template>
  <bm-card>
    名片列表
  </bm-card>
</template>

<script>
import {defineComponent, ref} from "vue";
import BmCard from "../../components/card/BmCard";

export default defineComponent({
  components: {BmCard},
  setup() {

  }
})
</script>

<style lang="stylus" scoped>
.bm-card
  --bm-card-padding 24px
</style>