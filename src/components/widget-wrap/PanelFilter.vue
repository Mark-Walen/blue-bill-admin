<template>
  <bm-card>
    <bm-card class="row items-start flex-nowrap panel-filter">
      <div class="panel-filter-item">
        商品名称：<el-input
          :input-style="`width: 192px`"
          placeholder="商品名称"
      />
      </div>
      <el-select-v2
        v-model="value"
        :options="options"
        placeholder="商户名称"
        style="width: 200px"
        allow-create
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        clearable
        :reserve-keyword="false"
        class="panel-filter-item"
    />
      <div class="operation-groups panel-filter-item">
        <el-button>清空</el-button>
        <el-button>筛选</el-button>
      </div>
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

<style lang="stylus" scoped>
.panel-filter-item
  margin 0 16px
</style>