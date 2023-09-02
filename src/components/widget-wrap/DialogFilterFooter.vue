<template>
    <bm-card class="bm-filter-controller">
        <bm-card class="reset">
            <el-button>重置</el-button>
        </bm-card>
        <bm-card class="done">
            <el-button @click="done">完成</el-button>
        </bm-card>
    </bm-card>
</template>

<script>
import { defineComponent, getCurrentInstance, nextTick } from "vue";
import BmCard from "../card/BmCard";

export default defineComponent({
    name: "DialogFilterFooter",
    components: {
        BmCard
    },
    setup(){
        const { emit } = getCurrentInstance()
        const done = () => {
            // console.log(124);
            nextTick(() => {
                emit("done", 123);
            });
        }
        return {
            done
        }
    }
});
</script>

<style lang="stylus" scoped>
.bm-filter-controller
    display flex
    justify-content flex-end

    .reset
    .done
        margin 8px 8px
    .done
        margin-right 12px


</style>