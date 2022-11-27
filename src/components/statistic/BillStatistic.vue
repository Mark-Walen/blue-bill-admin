<template>
  <div class="bill-statistic" id="bill-statistic"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import {ref, onMounted, onUnmounted} from 'vue'

const echartsInstance = ref()
const props = defineProps({
  xAxisData: {
    type: Array,
    required: true
  },
  title: {
    type: Object
  }
})

onMounted(() => {
  const chartDom = document.getElementById('bill-statistic');
  const myChart = echarts.init(chartDom, null, {
    height: 480
  });

  const title = {}
  if (typeof props.title != "undefined" && props.title.hasOwnProperty('text')) {
    title.text = props.title.text | ''
    if (title.text !== '') {
      title.left = props.title.left | 'center'
    } else {
      delete title.text
    }
  }

  const option = {
    title,
    xAxis: {
      data: props.xAxisData
    },
    yAxis: {},
    series: [
      {
        data: [24.16, 32.30, 58.57, 1.38, 0, 39.10, 24.3],
        type: 'bar',
        stack: 'x'
      },
      {
        data: [0, 0, 0, 0, -20, 0, 0],
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