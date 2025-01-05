<script setup>

import SvgIcon from "@/components/icon/SvgIcon.vue";

const props = defineProps({
  categoryLogo: {
    type: String,
    default: "other"
  },
  category: {
    type: String,
    default: 'other'
  },
  time: {
    type: String,
    default: "00:00"
  },
  account: {
    type: String,
    default: "0000"
  },
  amount: {
    type: String,
    default: 0
  },
  transition_object: {
    type: String,
    default: "未知交易对象"
  },
  memo: {
    type: String,
    required: true
  },
  lastOne: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="bill-item flex">
    <div class="bill-item__category flex flex-col justify-between">
      <div class="bill-item__category_logo"><i class="icon icon-font" :class="`icon-${categoryLogo}`"></i></div>
      <div class="bill-item__category_title">{{ category }}</div>
    </div>
    <div class="bill-item-detail flex flex-col justify-between">
      <div class="memo">{{ memo }}</div>
      <div class="transaction-detail inline-flex" :title="account+' | '+transition_object">
        <div class="from">{{ account }}</div>
        <div class="to">{{ transition_object }}</div>
      </div>
      <div v-if="!lastOne" class="h-separator"></div>
    </div>
    <div class="bill-item-detail__amount flex flex-col justify-between">
      <div class="transaction-amount text-sm" :title="amount">{{ amount }}</div>
      <div class="transaction-time" title="交易时间">{{ time }}</div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.bill-item
  height 4rem
  padding 0.375rem 0

.bill-item__category
  width 3rem

  .bill-item__category_logo
    width 1.75rem
    height 1.75rem
    border-radius 50%
    color white
    text-align center
    background-color var(--bm-bill-category-bg-color)

    i
      text-align center
      line-height 1.75rem
      font-size 1.25rem
      color #ffffff

.bill-item-detail
  min-width 11.75rem
  position relative

  .transaction-detail
    color #B2B2B2
    div
      width 5.75rem
      white-space: nowrap
      overflow hidden
      text-overflow: ellipsis

    .from
      margin-right 0.25rem
      position relative

    .from::after
      content: ""
      width 2px
      height 1rem
      position absolute
      background-color #B2B2B2
      right 0.0rem

  .h-separator
    position absolute
    bottom -0.375rem
    height 1px
    min-width 12rem
    background-color #000000


.bill-item-detail__amount
  text-align end

  .transaction-amount
    width 5.25rem
    white-space: nowrap
    overflow hidden
    text-overflow: ellipsis

  .transaction-time
    color #B2B2B2

</style>