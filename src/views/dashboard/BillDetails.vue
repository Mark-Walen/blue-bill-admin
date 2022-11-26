<template>
  <bm-card>
    <el-table :data="billItemData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="90" />
      <el-table-column prop="name" width="120" label="商品名称" />
      <el-table-column prop="money" width="120" show-overflow-tooltip label="金额（￥）" />
      <el-table-column prop="payee" label="商户名称 / 收款方"/>
      <el-table-column prop="paymentTime" sortable label="交易时间" />
      <el-table-column prop="billSno" label="交易单号" />
      <el-table-column prop="createTime" sortable label="账单创建时间"/>
      <el-table-column prop="updateTime" label="账单更新时间" />
      <el-table-column prop="memo" label="备注" />
    </el-table>
  </bm-card>
</template>

<script>
import {defineComponent, ref} from "vue";
import moment from "moment";
import BmCard from "../../components/card/BmCard";

export default defineComponent({
  components: {BmCard},
  setup() {
    const billItemData = ref([])
    const createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    billItemData.value = [
      {
        id: 1,
        name: '食盐',
        money: '2',
        billSno: '4200057830202211153414005616',
        payee: '家里购连锁生活超市',
        paymentTime: '2022年11月15日 08:28:38',
        createTime,
        updateTime: createTime,
        memo: '偷吃盐'
      },
      {
        id: 2,
        name: '30元话费',
        money: '30',
        billSno: '4200057830202211153414005070',
        payee: '中国移动金融科技有限公司',
        paymentTime: '2022年11月14日 11:19:29',
        createTime,
        updateTime: createTime,
        memo: '可恶的中国移动'
      }
    ]
    return {
      billItemData
    }
  }
})
</script>

<style lang="stylus" scoped>
.bm-card
  --bm-card-padding 24px
</style>