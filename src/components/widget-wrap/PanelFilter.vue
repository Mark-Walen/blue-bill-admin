<template>
  <bm-card>
    <bm-card class="row justify-between items-start flex-nowrap ">
      商品名称：<el-input
        :input-style="`width: 240px`"
        placeholder="商品名称"
    />
      交易单号：<el-input
        :input-style="`width: 240px`"
        placeholder="交易单号" />
      <el-select-v2
        v-model="value"
        :options="options"
        placeholder="商户名称"
        style="width: 240px"
        allow-create
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        clearable
        :reserve-keyword="false"
    />
      <el-select-v2
        v-model="value"
        filterable
        :options="options"
        placeholder="账单类别"
        style="width: 240px"
        multiple
    />
      <el-select-v2
        v-model="value"
        filterable
        :options="options"
        placeholder="交易方式"
        style="width: 240px"
        multiple
    />
      <el-button>清空</el-button>
      <el-button>筛选</el-button>
    </bm-card>
  </bm-card>
</template>

<script setup>
import { ref } from "vue";
import BmCard from "../card/BmCard";

const props = defineProps({
  options: {},
  value: {},
  onChanged: {},
  alwaysExpanded: { default: true },
  done: { type: Function },
  onExpansionStateChanged: { type: Function },
  immediate: Boolean
})

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const value = ref([])
const name = ref("")
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))

const value2 = ref('')

</script>

<style scoped>

</style>