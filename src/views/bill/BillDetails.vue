<template>
    <bm-card class="detail-container flex flex-col">
      <bm-card class="content-toolbar">
        <collapse-transition>
          <panel-filter :options="filterOptions" :alwaysExpanded="false"></panel-filter>
        </collapse-transition>
      </bm-card>
      <bm-card class="table-container flex-1 p-lg">
        <el-auto-resizer>
          <template #default="{ height, width }">
            <el-table-v2 :width="width"
                         :height="height"
                         :columns="columns"
                         :data="billItemData"
                         table-layout="auto"
                         :sort-by="{prop: 'paymentTime', order: 'descending'}"></el-table-v2>
          </template>
        </el-auto-resizer>
      </bm-card>
    </bm-card>
</template>

<script>
import { computed, defineComponent, h, ref } from "vue";
import i18n from "../../i18n";
import BmCard from "../../components/card/BmCard";
import en from "element-plus/dist/locale/en.mjs";
import zhCn from "../../i18n/zh-cn";
import PanelFilter from "../../components/widget-wrap/PanelFilter.vue";
import CollapseTransition from "@/components/collapse-transition/collapse-transition";

export default defineComponent({
  components: { CollapseTransition, PanelFilter, BmCard },
  setup() {
    const currentPage = ref(1);
    const pageSize = ref(18);
    const billItemData = ref([]);
    const total = ref(0);
    const lang = ref(i18n.global.locale);
    const locale = computed(() => (lang.value === "zh-cn" ? zhCn : en));
    const columns = [
      {
        key: "id",
        dataKey: "id",
        title: "ID",
        minWidth: 88
      },
      {
        key: "name",
        dataKey: "name",
        title: "商品名称",
        minWidth: 184
      },
      {
        key: "money",
        dataKey: "money",
        title: "金额（￥）",
        minWidth: 120,
        sortable: true,
        cellRenderer: ({ cellData }) => h(
          'span',
          {},
          { default: () => Number(cellData).toFixed(2) }
        )
      },
      {
        key: "paymentTime",
        dataKey: "paymentTime",
        title: "交易时间",
        minWidth: 192,
        sortable: true
      },
      {
        key: "payee",
        dataKey: "payee",
        title: "商户名称 / 收款方",
        minWidth: 216
      },
      {
        key: "memo",
        dataKey: "memo",
        title: "备注",
        minWidth: 200
      }
    ];
    billItemData.value = [
      {
        id: 1,
        name: "食盐",
        money: "2",
        billSno: "4200057830202211153414005616",
        payee: "家里购连锁生活超市",
        paymentTime: "2022年11月15日 08:28:38",
        via: "微信零钱",
        memo: "偷吃盐"
      },
      {
        id: 2,
        name: "30元话费",
        money: "30",
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
        money: "30",
        billSno: "4200057830202211153414005070",
        payee: "中国移动金融科技有限公司",
        paymentTime: "2022年11月14日 11:19:29",
        via: "建设银行储蓄卡(9465)",
        memo: "可恶的中国移动"
      })
    }
    const detailContainer = {
      height: 48 * (billItemData.value.length+3) + "px"
    };
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
    const showBillItem = (id) => {
      console.log(id);
    };
    const editBillItem = (id) => {
      console.log(id);
    };
    const deleteBillItem = (id) => {
      console.log(id);
    };
    const handleSizeChange = (size) => {
      console.log(pageSize.value);
    };
    const handleCurrentChange = (page) => {
      console.log(currentPage.value);
    };
    return {
      currentPage,
      pageSize,
      columns,
      billItemData,
      total,
      lang,
      locale,
      filterOptions,
      showBillItem,
      editBillItem,
      deleteBillItem,
      handleSizeChange,
      handleCurrentChange,
      detailContainer
    };
  }
});
</script>

<style lang="stylus" scoped>
.detail-container
  display flex
  flex-flow column
  height: v-bind('detailContainer.height')
  max-height 100%
  .content-toolbar
    margin-bottom 8px

.operation-group
  width 100%
  height 100%
  display flex
  flex-flow row wrap
</style>