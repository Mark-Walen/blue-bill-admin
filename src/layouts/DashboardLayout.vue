<template>
    <el-row>
        <el-container class="bm-container">
            <el-aside :width="isCollapse?'5rem':'16rem'" class="bm-sider" v-if="$bm.screen.gt.sm">
                <el-menu
                    :collapse="isCollapse"
                    router
                    :default-active="$route.href"
                    class="bm-sider-menu"
                    style="--el-menu-base-level-padding: 1.75rem; --el-menu-level-padding: 1.75rem;--bm-separator-color: var(--bm-dark-gray-8);"
                >
                    <div class="logo" style="margin-top: 8px; color: var(--el-menu-text-color); font-size: 1.5rem; line-height: 2.5rem;">
                        <svg-icon v-if="!isCollapse" name="logo-bmv-light_a" :width="216" :height="56"></svg-icon>
                        <svg-icon v-else name="logo-bmv" :width="80" :height="56"></svg-icon>
                    </div>
<!--                    <bm-separator />-->
                    <el-menu-item index="/workspace/dashboard">
                        <svg-icon name="dashboard" :size="24" color="inherit"></svg-icon>
                        <template #title><span>工作台</span></template>
                    </el-menu-item>
                    <el-sub-menu index="/workspace/bill-management">
                        <template #title>
                            <svg-icon name="bank" :size="24" color="inherit"></svg-icon>
                            <span>账单管理</span>
                        </template>
                        <el-menu-item index="/workspace/bill-management/bill-details">账单明细</el-menu-item>
                        <el-menu-item index="/workspace/bill-management/bill-category">账单类别</el-menu-item>
                        <el-menu-item index="/workspace/bill-management/merchant">常用店铺</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="/workspace/my-wallet">
                        <template #title>
                            <svg-icon name="cardholder" :size="24" color="inherit"></svg-icon>
                            <span>我的钱包</span>
                        </template>
                        <el-menu-item index="/workspace/my-wallet/credit-card">银行卡</el-menu-item>
                        <el-menu-item index="/workspace/my-wallet/fare-card">交通卡</el-menu-item>
                        <el-menu-item index="/workspace/my-wallet/auto-renew">自动续费</el-menu-item>
                        <el-menu-item index="/workspace/my-wallet/business-card">名片</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="/workspace/account-center">
                        <template #title>
                            <svg-icon name="user" :size="24" color="inherit"></svg-icon>
                            <span>个人中心</span>
                        </template>
                        <el-menu-item index="/workspace/account-center/account-info">账号资料</el-menu-item>
                        <el-sub-menu index="/workspace/account-center/account-security">
                            <template #title>
                                安全隐私
                            </template>
                            <el-menu-item index="/workspace/account-center/account-security/security-center">
                                账号安全中心
                            </el-menu-item>
                            <el-menu-item index="/workspace/account-center/account-security/login-device">登录设备管理
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item>退出登录</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container class="bm-content-container">
                <el-header v-if="$bm.screen.gt.sm" height="4.5rem">
                    <div class="bm-header">
                        <div class="header-index-left has-breadcrumb">
                <span class="bm-header-trigger" @click="showMenu">
                  <el-icon v-if="isCollapse" :size="20"><svg-icon name="menu-unfold" :size="20"></svg-icon></el-icon>
                  <el-icon v-else :size="20"><svg-icon name="menu-fold" :size="20"></svg-icon></el-icon>
                </span>
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item v-for="(item, index) in breadList" :key="index"
                                                    :to="{path: item.path}">{{ item.meta.title }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div class="header-index-right header-index-light">
                            <el-dropdown class="header-index-action">
                                <div class="header-index-avatar">
                                    <el-avatar class="bm-avatar-sm" src="/img/default-user-avatar.png"/>
                                    <span class="bm-avatar-username">Blue Monster</span>
                                </div>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <svg-icon name="user"></svg-icon>
                                            Account Center
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <svg-icon name="gear-six"></svg-icon>
                                            Account Settings
                                        </el-dropdown-item>
                                        <el-dropdown-item divided>
                                            <svg-icon name="sign-out"></svg-icon>
                                            Logout
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-tooltip
                                effect="dark"
                                content="消息中心"
                                placement="bottom"
                            >
                                <el-badge is-dot :value="3" class="header-index-messagebox" @click="showMessageBox">
                                    <el-icon size="18px">
                                        <svg-icon name="chat-circle-dots"></svg-icon>
                                    </el-icon>
                                </el-badge>
                            </el-tooltip>
                        </div>
                    </div>
                </el-header>
                <AsyncBmMain></AsyncBmMain>
            </el-container>
            <el-footer v-if="!$bm.screen.gt.sm">
                <div>底部</div>
            </el-footer>
            <el-drawer
                v-model="isMessageBoxOpened"
                title="消息中心"
                direction="rtl"
                append-to-body
                :modal="false"
                style="max-width: 440px"
            >
                你好
            </el-drawer>
        </el-container>
    </el-row>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref, watch } from "vue";
import debounce from "../utils/debounce";
import { useRoute } from "vue-router/dist/vue-router";
import BmCard from "../components/card/BmCard";
import { BmSeparator } from "@/components/seperator"

export default defineComponent({
    name: "DashboardLayout",
    components: {
        BmCard,
        "AsyncBmMain": defineAsyncComponent({
            loader: () => import("@/views/BmMain.vue")
        }),
        BmSeparator
    },
    setup() {
        const loadMain = ref(false);
        const isCollapse = ref(false);
        const isMessageBoxOpened = ref(false);
        const breadList = ref([]);
        const route = useRoute();

        const showMenu = debounce(() => {
            isCollapse.value = !isCollapse.value;
        }, 100);
        const showMessageBox = debounce(() => {
            isMessageBoxOpened.value = !isMessageBoxOpened.value;
        }, 50);
        const getBreadcrumb = () => {
            let matched = route.matched.filter(item => item.meta.title);
            const first = matched[0];
            if (first.path !== "/workspace") {
                matched = [{ path: "/workspace", meta: { title: "首页" } }].concat(matched);
            }
            breadList.value = matched;
        };

        watch(
            () => route.path,
            () => getBreadcrumb()
        );

        getBreadcrumb();
        return {
            loadMain,
            isCollapse,
            isMessageBoxOpened,
            breadList,
            showMenu,
            showMessageBox
        };
    }
});
</script>

<style lang="stylus" scoped>
.el-container, .el-container *
    box-sizing border-box

.bm-container
    width 100vw
    height 100vh
    background #f0f2f5

.bm-sider
    background #001529
    position relative
    z-index 10
    min-height: 100vh
    box-shadow: 2px 0 6px rgb(0, 21, 41, 35%)
    transition all 0.2s

.el-menu.bm-sider-menu
    border-right none
    width 100%
    transition background .3s, width .3s cubic-bezier(.2, 0, 0, 1) 0s
    --el-menu-bg-color #001529
    --el-menu-text-color hsla(0, 0, 100%, 0.65)

    .bm-icon
        margin-right 8px


.bm-sider-menu
    .el-icon
        transition font-size .15s cubic-bezier(.215, .61, .355, 1), margin .3s cubic-bezier(.645, .045, .355, 1)

    .logo
        height 64px

.bm-sider-menu .el-menu-item,
.bm-sider-menu :deep(.el-sub-menu) .el-sub-menu__title
    height 44px
    padding-bottom 0.02px
    --el-menu-active-color: #fff
    font-size 14px
    line-height 40px

.bm-sider-menu :deep(.el-sub-menu) .el-menu--inline
    --el-menu-bg-color #000c17

.bm-sider-menu .el-menu-item:hover,
.bm-sider-menu :deep(.el-sub-menu) .el-sub-menu__title:hover
    background none
    color #fff

.bm-sider-menu .el-menu-item svg[class^=bm-icon__],
.bm-sider-menu :deep(.el-sub-menu) .el-sub-menu__title svg[class^=bm-icon__]
    margin-right 10px


.el-header
    padding 0
    line-height 1
    background #ffffff
    z-index 9

.bm-header
    display flex
    justify-content space-between
    height 4.5rem
    padding 0
    box-shadow 0 1px 4px rgba(0, 21, 41, 0.08)

    .header-index-left
        display flex
        align-items: center

        .bm-header-trigger
            height 100%
            line-height: 6
            vertical-align top
            padding 0 24px
            display inline-block
            cursor pointer
            -webkit-transition all .3s, padding 0s
            transition all .3s, padding 0s

            .el-icon
                vertical-align -0.225em

.header-index-right
    margin-right 8px

    .header-index-action
        height 100%

.header-index-avatar, .header-index-messagebox
    padding 16px 12px
    cursor pointer
    height 100%
    transition all 0.3s

.header-index-messagebox
    margin-right 20px
    padding-top 24px
    padding-bottom 16px

.el-badge.header-index-messagebox :deep(.el-badge__content.is-fixed)
    transform none
    top 24px

.header-index-avatar:hover, .header-index-messagebox:hover
    background rgba(0, 0, 0, 0.025)

.header-index-avatar:focus-visible
    outline none

.bm-avatar-sm
    margin-right 8px
    vertical-align top

.bm-avatar-username
    line-height 40px

//background transparent

.bm-page-header
    -webkit-box-sizing: border-box
    box-sizing: border-box
    margin: 0
    color: rgba(0, 0, 0, .65)
    font-size: 14px
    font-variant: tabular-nums
    line-height: 1.5
    list-style: none
    -webkit-font-feature-settings: "tnum"
    font-feature-settings: "tnum"
    position: relative
    background-color: #fff

.bm-page-header.has-breadcrumb
    margin-top 12px
    padding 0 24px 12px 24px

    .el-breadcrumb
        line-height 1.5


.el-menu-item .el-button.is-link:hover
    --el-button-hover-link-text-color: #fff

.el-main
    &::-webkit-scrollbar
        width 8px

    &::-webkit-scrollbar-thumb
        background-color var(--bm-theme-color-5)
        border-radius 4px
</style>