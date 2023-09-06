<template>
    <div class="bill-statistic" id="bill-statistic"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onUnmounted, toRefs, reactive, watch } from "vue";
import useBm from "@/composables/use-bm";
import { getLastMonthDays, getLastNDaysOrMonth } from "@/utils/date";

const echartsInstance = ref();
const props = defineProps({
    duration: {
        type: Number,
        required: true
    },
    title: {
        type: Object
    },
    legend: {
        type: Object
    }
});

const getXAxisData = (duration) => {
    let dates = []
    if (typeof duration === "undefined" || duration == null) {
        duration = 7
    }

    if (duration === 7 || duration === 30) {
        dates = getLastNDaysOrMonth(duration, "MM-DD", "days")
    } else if (duration === 12) {
        dates = getLastNDaysOrMonth(duration, "MM", "months")
    }
    return dates
}

const getDataSlice = (arr, len) => {
    const rawArr = Array.from(arr)
    if (typeof arr === "undefined" || typeof len === "undefined" || arr == null || len <= 0)
        return null;

    if (len > rawArr.length)
        len = rawArr.length
    return arr.slice(0, len)
}

const incomeData = ref([0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const outcomeData = ref([24.16, 32.30, 58.57, 1.38, 0, 39.10, 24.3, 16, 14.5, 27.86, 32, 26.5, 39.3, 17.6, 52.9])
const dataLength = ref(props.duration || 7)
const xAxisData = ref(getXAxisData(dataLength.value))
const title = {
    textStyle: {
        fontSize: 20
    },
    top: 12,
    left: 0
};
let legendOrient, top;
if (typeof props.legend != "undefined") {
    legendOrient = props.legend.orient || "horizontal";
    if (props.legend.hasOwnProperty("top")) top = props.legend.top;
}
if (typeof props.title != "undefined") {
    title.text = props.title.text || "";
    if (props.title.hasOwnProperty("text") && props.title.text !== "") {
        title.text = props.title.text;
    }
    if (props.title.hasOwnProperty("left") && props.title.left !== "") {
        title.left = props.title.left;
    }
}
const option = reactive({
    title,
    grid: {
        x: 48,
        x2: 20,
        y: 80,
        y2: 32
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        top: top,
        right: "128",
        orient: legendOrient,
        data: ["支出", "收入"]
    },
    xAxis: {
        data: xAxisData.value
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
            name: "支出",
            data: getDataSlice(outcomeData.value, dataLength.value),
            type: "line",
            smooth: "0.1",
            color: "rgb(229, 53, 61)",
            areaStyle: {
                color: "rgb(229, 53, 61, 0.2)"
            }
        },
        {
            name: "收入",
            data: getDataSlice(incomeData.value, dataLength.value),
            type: "line",
            smooth: "0.1",
            color: "#41c662",
            areaStyle: {
                color: "rgba(65, 198, 98, 0.2)"
            }
        }
    ]
});

onMounted(() => {
    const chartDom = document.getElementById("bill-statistic");
    const myChart = echarts.init(chartDom, null, {
        height: "auto"
    });

    const $bm = useBm();
    option && myChart.setOption(option);

    window.onresize = () => {
        option.legend.orient = $bm.screen.gt.xs ? "horizontal" : "vertical";
        option.legend.top = $bm.screen.gt.xs ? "14" : "2";
        myChart.setOption(option);
        myChart.resize();
    };
    echartsInstance.value = myChart;
});

onUnmounted(() => {
    echartsInstance.value.dispose();
});

const updateSeriesData = (name) => {
    if (typeof name === "undefined" || name == null) return null

    if (name === "支出") {
        return getDataSlice(outcomeData.value, dataLength.value)
    } else if (name === "收入") {
        return getDataSlice(incomeData.value, dataLength.value)
    } else {
        return null
    }
}

watch(
    () => props.duration,
    (newVal, oldValue) => {
        dataLength.value = newVal || 7;
        option.xAxis.data = getXAxisData(dataLength.value);
        console.log(option.xAxis.data);
        option.series.forEach(series => {
            series.data = updateSeriesData(series.name)
        })
        echartsInstance.value.setOption(option)
    }
);
</script>

<style scoped>

</style>