<template>
    <bm-card class="detail-container flex flex-col" ref="detailContainerRef">
        <bm-card class="content-toolbar">
            <collapse-transition>
                <panel-filter :options="filterOptions" :alwaysExpanded="false"></panel-filter>
            </collapse-transition>
        </bm-card>
        <bm-card class="table-container flex-1">
            <el-table ref="billDetailTableRef"
                      :data="billItemData"
                      :highlight-current-row="highlightCurrentRow"
                      :max-height="tableMaxHeight"
                      @row-click="handleCurrentRowClick"
                      style="width: 100%;"
                      table-layout="auto">
                <el-table-column type="selection" :width="48" />
                <el-table-column prop="name" label="商品名称" width="96" />
                <el-table-column prop="money" label="金额 ￥" max-width="128"/>
                <el-table-column prop="payee" label="商家/收款方"

                                 :show-overflow-tooltip="{ enterable: true, placement: 'top', showArrow: true, hideAfter: 200, popperOptions: { strategy: 'fixed' } }" />
                <el-table-column prop="paymentTime" label="交易时间" :width="200"/>
                <el-table-column prop="memo" label="备注"/>
                <template #empty>
                    <div class="flex items-center justify-center">
                        <el-empty description="还没有账单数据哦， 快来添加吧！" />
                    </div>
                </template>
            </el-table>
        </bm-card>
    </bm-card>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import i18n from "../../i18n";
import BmCard from "../../components/card/BmCard";
import en from "element-plus/dist/locale/en.mjs";
import zhCn from "../../i18n/zh-cn";
import PanelFilter from "../../components/widget-wrap/PanelFilter.vue";
import CollapseTransition from "@/components/collapse-transition/collapse-transition";

export default defineComponent({
    components: { CollapseTransition, PanelFilter, BmCard },
    setup() {
        const tableMaxHeight = ref('600')
        const clientHeight = ref('')
        const highlightCurrentRow = ref(false);
        const billItemData = ref([]);
        const lang = ref(i18n.global.locale);
        const locale = computed(() => (lang.value === "zh-cn" ? zhCn : en));
        const currentRow = ref();
        const billDetailTableRef = ref(null);
        const detailContainerRef = ref(null);

        billItemData.value = [
            {
                id: 1,
                name: "食盐",
                money: "2.00",
                billSno: "4200057830202211153414005616",
                payee: "家里购连锁生活超市",
                paymentTime: "2022年11月15日 08:28:38",
                via: "微信零钱",
                memo: "偷吃盐"
            },
            {
                id: 2,
                name: "30元话费",
                money: "3000000000.00",
                billSno: "4200057830202211153414005070",
                payee: "中国移动金融科技有限公司",
                paymentTime: "2022年11月14日 11:19:29",
                via: "建设银行储蓄卡(9465)",
                memo: "可恶的中国移动"
            }
        ];
        for (let i = 0; i < 100; i++) {
            billItemData.value.push({
                id: 2,
                name: "30元话费",
                money: "3000000000.00",
                billSno: "4200057830202211153414005070",
                payee: "中国移动金融科技有限公司",
                paymentTime: "2022年11月14日 11:19:29",
                via: "建设银行储蓄卡(9465)",
                memo: "可恶的中国移动"
            })
        }
        const filterOptions = [{
            field: "ear_tag_search",
            type: "input",
            label: "搜索",
            placeholder: "搜索耳标"
        }, {
            field: "shed_id",
            type: "input",
            label: "牛舍号",
            placeholder: "按牛舍号搜索"
        }];

        onMounted(() => {
            clientHeight.value = `${document.documentElement.clientHeight}` //获取浏览器可视区域高度
            tableMaxHeight.value = clientHeight.value - 96
            window.onresize = function () {
                clientHeight.value = `${document.documentElement.clientHeight}` //获取浏览器可视区域高度
                tableMaxHeight.value = clientHeight.value - 96
            }
        })

        const handleCurrentRowClick = (val) => {
            if (currentRow.value !== val) {
                currentRow.value = val
                highlightCurrentRow.value = true
            } else {
                highlightCurrentRow.value = !highlightCurrentRow.value;
            }
        };
        return {
            highlightCurrentRow,
            billItemData,
            billDetailTableRef,
            detailContainerRef,
            tableMaxHeight,
            lang,
            locale,
            filterOptions,
            handleCurrentRowClick
        };
    }
});
</script>

<style lang="stylus" scoped>
.detail-container
    display flex
    flex-flow column
    height 100%

.operation-group
    width 100%
    height 100%
    display flex
    flex-flow row wrap
</style>