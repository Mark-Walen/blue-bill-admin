<template>
    <bm-card class="bm-filter scrollbar p-2">
        <bm-card class="bm-filter-group">
            <bm-card class="bm-filter-group-title">快捷筛选</bm-card>
            <bm-card class="bm-filter-group-items">
                <el-check-tag class="bm-filter-group-item" size="large">薪酬</el-check-tag>
                <el-check-tag class="bm-filter-group-item" size="large">购物</el-check-tag>
                <el-check-tag class="bm-filter-group-item" size="large">餐饮</el-check-tag>
                <el-check-tag class="bm-filter-group-item" size="large">出行</el-check-tag>
                <el-check-tag class="bm-filter-group-item" size="large">薪酬</el-check-tag>
                <el-check-tag class="bm-filter-group-item" size="large">购物</el-check-tag>
                <el-check-tag class="bm-filter-group-item" size="large">餐饮</el-check-tag>
                <el-check-tag class="bm-filter-group-item" size="large">出行</el-check-tag>
            </bm-card>
        </bm-card>
        <bm-card class="bm-filter-group">
            <bm-card class="bm-filter-group-title">金额</bm-card>
            <bm-card class="bm-filter-group-items">
                <el-input class="bm-filter-group-item" placeholder="最低金额" />
                ---
                <el-input class="bm-filter-group-item" placeholder="最高金额" />
            </bm-card>
        </bm-card>
        <bm-card class="bm-filter-group has-subgroup">
            <bm-card class="bm-filter-group-title">
                <bm-card class="text">分类</bm-card>
                <bm-card class="icon" @click="toggleSubgroupHandler(groupExpanded)">
                    <svg-icon v-if="!groupExpanded" name="caret-up" :width="24" :height="24"></svg-icon>
                    <svg-icon v-else name="caret-down" :width="24" :height="24"></svg-icon>
                </bm-card>
            </bm-card>
            <bm-card class="bm-filter-group-items" v-if="!groupExpanded">
                <bm-card class="bm-filter-sub-group">
                    <bm-card class="bm-filter-group-title">收入</bm-card>
                    <el-check-tag class="bm-filter-group-item" size="large">全部收入</el-check-tag>
                    <el-check-tag class="bm-filter-group-item" size="large">退款</el-check-tag>
                    <el-check-tag class="bm-filter-group-item" size="large">薪酬</el-check-tag>
                </bm-card>
                <bm-card class="bm-filter-sub-group">
                    <bm-card class="bm-filter-group-title">支出</bm-card>
                    <el-check-tag class="bm-filter-group-item" size="large">全部支出</el-check-tag>
                    <el-check-tag class="bm-filter-group-item" size="large">购物</el-check-tag>
                    <el-check-tag class="bm-filter-group-item" size="large">餐饮</el-check-tag>
                    <el-check-tag class="bm-filter-group-item" size="large">其他支出</el-check-tag>
                    <el-check-tag class="bm-filter-group-item" size="large">出行</el-check-tag>
                    <el-check-tag class="bm-filter-group-item" size="large">房租房贷</el-check-tag>
                </bm-card>
                <bm-card class="bm-filter-sub-group">
                    <bm-card class="bm-filter-group-title">本人资金往来</bm-card>
                    <el-check-tag class="bm-filter-group-item" size="large">全部往来</el-check-tag>
                    <el-check-tag class="bm-filter-group-item" size="large">转账给自己</el-check-tag>
                </bm-card>
            </bm-card>
        </bm-card>
    </bm-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import BmCard from "../card/BmCard";

export default defineComponent({
    name: "DialogFilter",
    components: {
        BmCard
    },
    setup() {
        const groupExpanded = ref(false)
        const toggleSubgroupHandler = (value) => {
          groupExpanded.value = !value
        }

        return {
            groupExpanded,
            toggleSubgroupHandler
        }
    }
});
</script>

<style lang="stylus" scoped>
.p-2
    padding 8px

.bm-filter
    position: relative
    //max-height 432px
    height 400px
    overflow-y scroll

.scrollbar::-webkit-scrollbar-thumb:hover
    background #40a0ff

.bm-filter-group
    margin-bottom 8px

.bm-filter-group-title
    font-size 16px
    line-height 24px
    font-weight bold
    letter-spacing 0.025em

.bm-filter-group.has-subgroup
    transition height linear 0.3s

.bm-filter-group.has-subgroup .bm-filter-group-title
    display flex
    justify-content space-between
    .icon
        cursor pointer

.bm-filter-group-items
    display flex
    flex-wrap wrap
    padding-left 4px

    .bm-filter-group-item
        width 104px
        font-size 14px
        line-height 20px
        text-align center
        margin-top 6px
        margin-bottom 6px
        margin-right 12px


.bm-filter-sub-group
    .bm-filter-group-title
        font-size 12px
        line-height 16px
        margin 8px auto
</style>