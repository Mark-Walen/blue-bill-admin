<template>
  <bm-card class="bm-statistic" style="width: 100%;display: inline-flex;">
    <el-tabs v-model="activeDateType" style="width: 50%; height: 400px">
      <el-tab-pane label="周" name="0">
        <bill-statistic></bill-statistic>
      </el-tab-pane>
    </el-tabs>
    <bm-card class="daily-statistic" style="width: 50%;">
      今日账单<hr/>
      123
    </bm-card>
  </bm-card>
</template>

<script setup>
import BmCard from "../../components/card/BmCard";
import BillStatistic from "../../components/statistic/BillStatistic.vue";
import {reactive, ref} from "vue";
const activeDateType = ref('0')
const state = reactive({
  dateTypeList: [
    {
      id: 0,
      name: '周'
    },
    {
      id: 1,
      name: '月'
    },
    {
      id: 2,
      name: '年'
    },
  ]
})
</script>

<style lang="stylus" scoped>
.bm-statistic
  --bm-card-padding 24px
  .daily-statistic
    --bm-card-padding 16px 0 0 24px
</style>