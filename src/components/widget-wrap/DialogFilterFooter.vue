<template>
    <bm-card class="bm-filter-controller">
        <bm-card class="reset">
            <el-button class="filter-btn">重置</el-button>
        </bm-card>
        <bm-card class="done">
            <el-button color="var(--bm-theme-color-5)" class="filter-btn" @click="done">完成</el-button>
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

        .filter-btn
            --el-button-hover-bg-color: var(--bm-theme-color-4) !important;

.bm-filter-controller
    --el-button-hover-text-color var(--bm-theme-color-5)
    --el-button-hover-border-color var(--bm-theme-color-5)


</style>