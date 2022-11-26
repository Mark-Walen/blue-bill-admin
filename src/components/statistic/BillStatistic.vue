<template>
  <div class="weekly-bill-statistic" id="weekly-bill-statistic"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import {ref, onMounted, onUnmounted} from 'vue'

const echartsInstance = ref()

onMounted(() => {
  const chartDom = document.getElementById('weekly-bill-statistic');
  const myChart = echarts.init(chartDom, null, {
    height: 400
  });

  const option = {
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 43, 49, 3, 5],
        type: 'bar',
        stack: 'x'
      },
      {
        data: [5, 4, 3, 5, 10, 43, 49],
        type: 'bar',
        stack: 'x'
      }
    ]
  };
  option && myChart.setOption(option)

  window.onresize = () => myChart.resize()
  echartsInstance.value = myChart
})

onUnmounted(() => {
  echartsInstance.value.dispose()
})
</script>

<style scoped>

</style>