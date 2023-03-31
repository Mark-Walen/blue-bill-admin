<template>
  <bm-card class="detail-container">
    <bm-card class="content-toolbar">
      <panel-filter :options="filterOptions" :alwaysExpanded="false"></panel-filter>
    </bm-card>
    <bm-card class="table-container w-full h-full">
      <el-table :data="billItemData" table-layout="auto" :default-sort="{prop: 'paymentTime', order: 'descending'}">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="88" />
        <el-table-column prop="name" min-width="184" label="商品名称" />
        <el-table-column min-width="120" sortable label="金额（￥）">
          <template #default="scope">{{ parseFloat(scope.row.money).toFixed(2) }}</template>
        </el-table-column>
        <el-table-column prop="paymentTime" min-width="192" sortable label="交易时间" />
        <el-table-column prop="payee" show-overflow-tooltip min-width="216" label="商户名称 / 收款方"/>
        <el-table-column prop="memo" min-width="200" label="备注" />
        <el-table-column fixed="right" label="操作" min-width="112" >
          <template #default="scope">
            <el-row class="operation-group">
              <el-col :span="8"><el-button link type="primary" size="small" @click="showBillItem(scope.row.id)">详情</el-button></el-col>
              <el-col :span="8"><el-button link type="warning" size="small" @click="editBillItem(scope.row.id)">修改</el-button></el-col>
              <el-col :span="8"><el-button link type="danger" size="small" @click="deleteBillItem(scope.row.id)">删除</el-button></el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </bm-card>
    <bm-card class="pagination-container">
      <el-config-provider :locale="locale">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[18, 36, 54]"
            :small="false"
            :disabled="false"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </el-config-provider>
    </bm-card>
  </bm-card>
</template>

<script>
import {computed, defineComponent, ref} from "vue"
import i18n from "../../i18n"
import BmCard from "../../components/card/BmCard"
import en from 'element-plus/dist/locale/en.mjs'
import zhCn from '../../i18n/zh-cn'
import PanelFilter from "../../components/widget-wrap/PanelFilter.vue";

export default defineComponent({
  components: { PanelFilter, BmCard },
  setup() {
    const currentPage = ref(1)
    const pageSize = ref(18)
    const billItemData = ref([])
    const total = ref(0)
    const lang = ref(i18n.global.locale)
    const locale = computed(() => (lang.value === 'zh-cn' ? zhCn : en))
    billItemData.value = [
      {
        id: 1,
        name: '食盐',
        money: '2',
        billSno: '4200057830202211153414005616',
        payee: '家里购连锁生活超市',
        paymentTime: '2022年11月15日 08:28:38',
        via: '微信零钱',
        memo: '偷吃盐'
      },
      {
        id: 2,
        name: '30元话费',
        money: '30',
        billSno: '4200057830202211153414005070',
        payee: '中国移动金融科技有限公司',
        paymentTime: '2022年11月14日 11:19:29',
        via: '建设银行储蓄卡(9465)',
        memo: '可恶的中国移动'
      },
    ]
    total.value = billItemData.value.length
    const filterOptions = [{
      field: 'ear_tag_search',
      type: 'input',
      label: '搜索',
      placeholder: '搜索耳标'
    }, {
      field: 'shed_id',
      type: 'input',
      label: '牛舍号',
      placeholder: '按牛舍号搜索'
    }]
    const showBillItem = (id) => {
      console.log(id)
    }
    const editBillItem = (id) => {
      console.log(id)
    }
    const deleteBillItem = (id) => {
      console.log(id)
    }
    const handleSizeChange = (size) => {
      console.log(pageSize.value)
    }
    const handleCurrentChange = (page) => {
      console.log(currentPage.value)
    }
    return {
      currentPage,
      pageSize,
      billItemData,
      total,
      lang,
      locale,
      showBillItem,
      editBillItem,
      deleteBillItem,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="stylus" scoped>
.bm-card.detail-container
  padding 12px
  .content-toolbar
    margin-bottom 24px
  .table-container
    margin 24px 0
  .pagination-container
    margin-top 24px

.operation-group
  width 100%
  height 100%
  display flex
  flex-flow row wrap
</style>