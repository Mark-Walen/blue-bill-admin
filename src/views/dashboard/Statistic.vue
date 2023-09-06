<template>
    <div class="statistic-main">
        <div class="statistic-header">
            <div class="statistic-tool-wrap">
                <div class="statistic-tool-item-wrap" style="height: 100%;">
                    <div class="statistic-too-item">
                        <ul class="statistic-tool-grid content-center">
                            <li class="tool-item tool-item-duration  item-size-2x4">
                                <!--                <ul class="tool-item-icon">-->
                                <swiper
                                    :modules="modules"
                                    :pagination="{ clickable: true }"
                                    :space-between="1"
                                    :spaceBetween="30"
                                    :loop="true"
                                    class="tool-item-icon">
                                    <swiper-slide class="bm-watch-resize carousel-item">
                                        <div class="template-item-icon bill-book item-size-2x4 overflow-hidden"
                                             bill-type="creditCard"
                                             title="中国建设银行"
                                             :style="{backgroundColor: 'var(--bm-card-ccb-color)'}">
                                            <div class="item-head">
                                                <div class="icon"><img :src="getBankIconUrl(banksObj['01050000'].icon)"
                                                                       alt="ccb" />
                                                </div>
                                                <div class="title tracking-wider">{{ banksObj["01050000"].name }}</div>
                                                <div class="operator">
                                                    <svg-icon name="more-horiz" style="color: white;"></svg-icon>
                                                </div>
                                            </div>
                                            <div class="card-number number tracking-wider">6217 0088 8888 8888 888</div>
                                            <div class="item-foot inline-flex relative">
                                                <div class="disc">
                                                    <div class="disc-balance">账户余额</div>
                                                    <div class="balance number">34,500.12 ￥</div>
                                                </div>
                                                <div class="disc">
                                                    <div class="disc-date">日期</div>
                                                    <div class="date number">{{ today }}</div>
                                                </div>
                                                <img src="/src/assets/img/unionpay.png" alt="unionpay" />
                                            </div>
                                        </div>
                                    </swiper-slide>
                                    <swiper-slide class="bm-watch-resize carousel-item">
                                        <div class="template-item-icon bill-book item-size-2x4 overflow-hidden"
                                             bill-type="creditCard"
                                             title="招商银行" :style="{backgroundColor: 'var(--bm-card-cmb-color)'}">
                                            <div class="item-head">
                                                <div class="icon"><img :src="banksObj['03080000'].icon" alt="cmb" />
                                                </div>
                                                <div class="title tracking-wider">{{ banksObj["03080000"].name }}</div>
                                                <div class="operator">
                                                    <svg-icon name="more-horiz" style="color: white;"></svg-icon>
                                                </div>
                                            </div>
                                            <div class="card-number number tracking-wider">6226 0988 8888 8888 888</div>
                                            <div class="item-foot inline-flex relative">
                                                <div class="disc">
                                                    <div class="disc-balance">账户余额</div>
                                                    <div class="balance number">34,500.12 ￥</div>
                                                </div>
                                                <div class="disc">
                                                    <div class="disc-date">日期</div>
                                                    <div class="date number">{{ today }}</div>
                                                </div>
                                                <img src="/src/assets/img/unionpay.png" alt="unionpay" />
                                            </div>
                                        </div>
                                    </swiper-slide>
                                    <swiper-slide class="bm-watch-resize carousel-item">
                                        <div class="template-item-icon bill-book item-size-2x4 overflow-hidden"
                                             bill-type="billBook"
                                             title="记账本">
                                            <div class="item-head">
                                                <div class="title tracking-wider">记账本</div>
                                                <div class="operator">
                                                    <svg-icon name="more-horiz"></svg-icon>
                                                </div>
                                            </div>
                                            <div class="item-foot"></div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </li>
                            <li class="tool-item tool-item-duration  item-size-2x2">
                                <div class="tool-item-icon" title="3 月收入">
                                    <div class="bm-watch-resize">
                                        <div class="template-item-icon income-component item-size-2x2">
                                            <div class="item-head">
                                                <span class="title">收入</span>
                                                <div class="operator">
                                                    <svg-icon name="more-horiz"></svg-icon>
                                                </div>
                                            </div>
                                            <div class="item-foot">
                                                <div class="number">62,870.14 ￥</div>
                                                <div class="disc">
                                                    <span>3 月收入</span>
                                                    <span class="float-rate">+ 12.23%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="tool-item tool-item-duration  item-size-2x2">
                                <div class="tool-item-icon" title="3 月支出">
                                    <div class="bm-watch-resize">
                                        <div class="template-item-icon outcome-component item-size-2x2">
                                            <div class="item-head">
                                                <span class="title">支出</span>
                                                <div class="operator">
                                                    <svg-icon name="more-horiz"></svg-icon>
                                                </div>
                                            </div>
                                            <div class="item-foot">
                                                <div class="number">70,235.87 ￥</div>
                                                <div class="disc">
                                                    <span>3 月支出</span>
                                                    <span class="float-rate">- 15.74%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="tool-item tool-item-duration"
                                :class="{'item-size-4x4': !$bm.screen.gt.xs, 'item-size-4x8': $bm.screen.gt.xs, 'row-end-7': $bm.screen.gt.sm, 'row-end-9': !$bm.screen.gt.sm}">
                                <div class="tool-item-icon" title="3 月支出统计数据">
                                    <div class="bm-watch-resize">
                                        <div class="template-item-icon statistic-component"
                                             :class="{'item-size-4x4': !$bm.screen.gt.xs, 'item-size-4x8': $bm.screen.gt.xs}">
                                            <div class="select-wrapper">
                                                <el-select
                                                    v-model="activeDateType"
                                                    class="bm-select"
                                                    :placeholder="state.dateTypeList[0].name"
                                                    @change="statisticSelectChanged"
                                                >
                                                    <el-option
                                                        v-for="item in state.dateTypeList"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id" />
                                                </el-select>
                                            </div>
                                            <bill-statistic :duration="state.duration" :title="{text: '支出详情'}"
                                                            style="flex: 1 1 0"></bill-statistic>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="statistic-footer"></div>
    </div>
</template>

<script setup>
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BillStatistic from "../../components/statistic/BillStatistic.vue";
import { reactive, ref } from "vue";
import { getLastNDaysOrMonth } from "@/utils/date";
import banksObj from "@/utils/bankInfo";
import { getBankIconUrl } from "@/utils/bankInfo";

const today = getLastNDaysOrMonth(1, "YYYY-MM-DD")[0];
const activeDateType = ref("近七天");
const state = reactive({
    duration: 7,
    dateTypeList: [
        {
            id: 7,
            name: "近七天"
        },
        {
            id: 30,
            name: "近一月"
        },
        {
            id: 12,
            name: "近一年"
        }
    ]
});
const statisticSelectChanged = (value) => {
    console.log(value);
    state.duration = value
};
const load = () => {
    //
};

const modules = [Navigation, Pagination];
</script>

<style lang="stylus" scoped>
.statistic-main
    position relative
    height 100%
    display flex
    flex-flow column

.statistic-tool-grid
    position relative
    display grid
    padding-top 2vh
    user-select none
    grid-template-columns repeat(auto-fill, var(--bm-tool-item-size))
    grid-template-rows repeat(auto-fill, var(--bm-tool-item-size))
    grid-auto-flow dense
    grid-gap var(--bm-tool-item-gap-x) var(--bm-tool-item-gap-y)
    box-sizing border-box
    justify-content center
    padding-bottom 48px

.statistic-tool-item-wrap
    position relative

    .statistic-tool-item
        transition transform ease-out .28s !important
        position: absolute;
        top 0
        left 0
        width 100%
        height 100%
        display inline-block
        overflow hidden

.tool-item-duration
    transition-duration var(--bm-tool-item-duration)

.template-item-icon
    display flex
    flex-flow column
    justify-content space-between
    padding 8px

    .item-head
        margin-top 8px
        width 100%
        display inline-flex
        flex-flow row
        position: relative;

        .operator
            position: absolute;
            right 8px
            top 0

        .icon
            margin-right 8px
            width 36px
            height 36px
            padding 4px
            background white
            border-radius: 50%

    .title
        font-size 20px

    .title, .disc
        color #686868

    .number
        font-size 24px
        margin-bottom 4px

.template-item-icon[bill-type="creditCard"]
    color white

    .title
        font-size 16px
        line-height 2.25rem
        text-align center

    .title, .disc
        color #fff

    .card-number.number
        padding-left 20px
        font-weight normal
        font-size 24px

    .balance.number
        font-weight 600

    .disc
        padding-left 20px

        .disc-balance, .disc-date
            color #fefeff

    .number
        font-size 20px

    .item-foot
        margin-bottom 6px

        img[alt="unionpay"]
            width 42px
            height 32px
            transform scale(2.75)
            position absolute
            right 12px
            bottom 12px

.tool-item-icon.swiper
    --swiper-pagination-bottom 2px
    --swiper-pagination-color #001529

.template-item-icon.income-component, .template-item-icon.outcome-component
    .disc
        width 100%
        display inline-flex
        flex-flow row
        justify-content space-between
        align-items center
        font-size 12px
        margin-bottom 4px

        .float-rate
            padding 4px 8px
            border-radius 17px
            font-weight bold

.income-component .float-rate
    color rgb(65, 198, 98)
    background-color: rgba(65, 198, 98, 20%);

.outcome-component .float-rate
    color rgb(229, 53, 61)
    background rgba(229, 53, 61, 20%)

.statistic-component
    position relative

.statistic-container
    .el-col
        margin-bottom 10px

.bm-statistic
    --bm-card-padding 20px

.daily-statistic
    display flex
    flex-direction column
    align-self stretch

    .el-row.header
        background-color #fbfbfb;
        height 36px

    .bm-card.content
        .bill-item
            padding 4px
            cursor pointer
            border-bottom 1px solid #e5e5e5

            .el-image
                max-width 32px

.select-wrapper
    position absolute
    height 32px
    top 16px
    right 16px
    z-index 1

    .bm-select
        max-width 104px

</style>