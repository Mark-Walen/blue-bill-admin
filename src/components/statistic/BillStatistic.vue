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
  },
  legend: {
    type: Object
  }
})

onMounted(() => {
  const chartDom = document.getElementById('bill-statistic');
  const myChart = echarts.init(chartDom, null, {
    height: "auto"
  });

  const title = {
    textStyle: {
      fontSize: 20
    },
    top: 12,
    left: 0
  }
  const { orient: legendOrient, top } = props.legend
  if (typeof props.title != "undefined") {
    title.text = props.title.text || ''
    if (props.title.hasOwnProperty('text') && props.title.text !== '') {
      title.text = props.title.text
    }
    if (props.title.hasOwnProperty('left') && props.title.left !== '') {
      title.left = props.title.left
    }
  }

  const option = {
    title,
    grid: {
      x: 48,
      x2: 20,
      y: 80,
      y2: 32
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: top,
      right: '128',
      orient: legendOrient,
      data: ['支出', '收入']
    },
    xAxis: {
      data: props.xAxisData
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: [4, 8],
          dashOffset: 8
        }
      }
    },
    series: [
      {
        name: '支出',
        data: [24.16, 32.30, 58.57, 1.38, 0, 39.10, 24.3, 16, 14.5, 27.86, 32, 26.5, 39.3, 17.6, 52.9],
        type: 'line',
        smooth: '0.1',
        color: 'rgb(229, 53, 61)',
        areaStyle: {
          color: 'rgb(229, 53, 61, 0.2)'
        }
      },
      {
        name: '收入',
        data: [0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        type: 'line',
        smooth: '0.1',
        color: '#41c662',
        areaStyle: {
          color: 'rgba(65, 198, 98, 0.2)'
        }
      }
    ]
  }
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