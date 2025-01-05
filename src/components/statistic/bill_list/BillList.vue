<script setup>
import BillListItem from "@/components/statistic/bill_list/BillListItem.vue";

const props = defineProps({
  billList: {
    type: Array,
    default: () => {
      return [
        {
          record_time: "01月01日 星期三",
          outcomeCount: 169.28,
          incomeCount: 0.0,
          bills: [
            {
              category: ["穿搭", "clothing"],
              account: "建设银行（8888）",
              time: "00:00",
              transition_object: "淘宝",
              memo: "",
              balance: "-165.83"
            },
            {
              category: ["餐饮", "dining"],
              account: "建设银行（8888）",
              time: "00:00",
              transition_object: "和喜点下午茶·甜品·饮品·生日蛋糕（宝安店）",
              memo: "下午茶",
              balance: "-13.45"
            }
          ]
        },
        {
          record_time: "01月01日 星期三",
          outcomeCount: 169.28,
          incomeCount: 0.0,
          bills: [
            {
              category: ["穿搭", "clothing"],
              account: "建设银行（8888）",
              time: "00:00",
              transition_object: "淘宝",
              memo: "",
              balance: "-165.83"
            },
            {
              category: ["餐饮", "dining"],
              account: "建设银行（8888）",
              time: "00:00",
              transition_object: "和喜点下午茶·甜品·饮品·生日蛋糕（宝安店）",
              memo: "下午茶",
              balance: "-13.45"
            }
          ]
        },
        {
          record_time: "01月01日 星期三",
          outcomeCount: 169.28,
          incomeCount: 0.0,
          bills: [
            {
              category: ["穿搭", "clothing"],
              account: "建设银行（8888）",
              time: "00:00",
              transition_object: "淘宝",
              memo: "",
              balance: "-165.83"
            },
            {
              category: ["餐饮", "dining"],
              account: "建设银行（8888）",
              time: "00:00",
              transition_object: "和喜点下午茶·甜品·饮品·生日蛋糕（宝安店）",
              memo: "下午茶",
              balance: "-13.45"
            }
          ]
        },
        {
          record_time: "01月01日 星期三",
          outcomeCount: 169.28,
          incomeCount: 0.0,
          bills: [
            {
              category: ["穿搭", "clothing"],
              account: "建设银行（8888）",
              time: "00:00",
              transition_object: "淘宝",
              memo: "",
              balance: "-165.83"
            },
            {
              category: ["餐饮", "dining"],
              account: "建设银行（8888）",
              time: "00:00",
              transition_object: "和喜点下午茶·甜品·饮品·生日蛋糕（宝安店）",
              memo: "下午茶",
              balance: "-13.45"
            }
          ]
        }
      ]
    }
  }
})
</script>

<template>
  <div v-for="(item, index) in billList" :key="index" style="margin: 0 0.25rem">
    <div class="bill-group">
      <div class="bill-group-header inline-flex justify-between">
        <div class="bill-group-header__date text-sm">{{ item.record_time }}</div>
        <div class="bill-group-header__balance_detail inline-flex text-sm">
          <div class="balance-detail mx-1">
            <div class="balance-detail__title balance-detail-income mr-1" title="收入">收</div>
            <span class="balance-detail__number">{{ item.incomeCount }}</span>
          </div>
          <div class="balance-detail mx-1">
            <div class="balance-detail__title balance-detail-outcome mr-1" title="支出">出</div>
            <span class="balance-detail__number">{{ item.outcomeCount }}</span>
          </div>
        </div>
      </div>
      <div class="bill-group-item" v-for="(billItem, billIndex) in item.bills" :key="billIndex">
        <bill-list-item
          :category="billItem.category[0]"
          :category-logo="billItem.category[1]"
          :account="billItem.account"
          :amount="billItem.balance"
          :time="billItem.time"
          :transition_object="billItem.transition_object"
          :memo="billItem.memo ? billItem.memo : billItem.category[0]"
          :last-one="billIndex === (item.bills.length - 1)"/>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.bill-group
  padding 0 0.5rem
  border-radius 0.5rem
  background-color #ffffff
  margin-bottom 0.5rem

.bill-group-header, .bill-group-item
  width 100%

.bill-group-header
  background-color #fbfbfb
  height 42px

  .bill-group-header__date
    width 108px
    text-align center
    line-height 42px
    color #191919

  .balance-detail
    min-width 3rem
    display inline-flex
    align-content center
    flex-wrap wrap

    .balance-detail__title
      color #797979
      background-color #F3F3F3
      width 1.25rem
      height 1.25rem
      text-align center
      display inline-block

    .balance-detail__number
      color #191919

.mr-2
  margin-right 0.5rem

.mr-1
  margin-right 0.25rem

.mx-1
  margin 0 0.25rem

</style>