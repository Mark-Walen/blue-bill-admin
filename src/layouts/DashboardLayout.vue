<template>
  <el-row>
    <el-container class="bm-container">
      <el-aside :width="isCollapse?'80px':'256px'" class="bm-sider" v-if="$bm.screen.gt.sm">
        <el-menu
            :collapse="isCollapse"
            router
            :default-active="$route.href"
            class="bm-sider-menu">
          <div class="logo" style="color: var(--el-menu-text-color); font-size: 24px;">BLUE MONSTER</div>
          <el-menu-item index="/workspace/dashboard">
            <svg-icon name="dashboard-default" :size="16" color="inherit"></svg-icon>
            <span>工作台</span>
          </el-menu-item>
          <el-sub-menu index="/workspace/bill-management">
            <template #title>
              <svg-icon name="bank" :size="16" color="inherit"></svg-icon>
              <span>账单管理</span>
            </template>
            <el-menu-item index="/workspace/bill-management/bill-details">账单明细</el-menu-item>
            <el-menu-item index="/workspace/bill-management/bill-category">账单类别</el-menu-item>
            <el-menu-item index="/workspace/bill-management/merchant">常用店铺</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/workspace/my-wallet">
            <template #title>
              <svg-icon name="card-package" :size="16" color="inherit"></svg-icon>
              <span>我的钱包</span>
            </template>
            <el-menu-item index="/workspace/my-wallet/credit-card">银行卡</el-menu-item>
            <el-menu-item index="/workspace/my-wallet/fare-card">交通卡</el-menu-item>
            <el-menu-item index="/workspace/my-wallet/auto-renew">自动续费</el-menu-item>
            <el-menu-item index="/workspace/my-wallet/business-card">名片</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/workspace/account-center">
            <template #title>
              <svg-icon name="user" :size="16" color="inherit"></svg-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/workspace/account-center/account-info">账号资料</el-menu-item>
            <el-sub-menu index="/workspace/account-center/account-security">
              <template #title>
                安全隐私
              </template>
              <el-menu-item index="/workspace/account-center/account-security/security-center">账号安全中心</el-menu-item>
              <el-menu-item index="/workspace/account-center/account-security/login-device">登录设备管理</el-menu-item>
            </el-sub-menu>
            <el-menu-item>退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="bm-content-container">
        <el-header v-if="$bm.screen.gt.sm" height="98px">
          <div class="bm-header">
            <span class="bm-header-trigger" @click="showMenu">
              <el-icon v-if="isCollapse" :size="20"><svg-icon name="menu-unfold" :size="20"></svg-icon></el-icon>
              <el-icon v-else :size="20"><svg-icon name="menu-fold" :size="20"></svg-icon></el-icon>
            </span>
            <div class="header-index-right header-index-light">
              <el-dropdown class="header-index-action">
                <div class="header-index-avatar">
                  <el-avatar class="bm-avatar-sm" src="/img/default-user-avatar.png" size="small" />
                  <span>Blue Monster</span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <el-icon><svg-icon name="user"></svg-icon></el-icon>
                      Account Center
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-icon><svg-icon name="setting"></svg-icon></el-icon>
                      Account Settings
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                      <el-icon><svg-icon name="logout"></svg-icon></el-icon>
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
                  <el-icon size="18px" style="margin-top: 22px;"><svg-icon name="message"></svg-icon></el-icon>
                </el-badge>
              </el-tooltip>
            </div>
          </div>
          <div class="bm-page-header has-breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="{path: item.path}">{{ item.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <el-footer v-if="!$bm.screen.gt.sm">
        <div>底部</div>
      </el-footer>
      <el-drawer
        v-model="isMessageBoxOpened"
        title="消息中心"
        direction="rtl"
        append-to-body
        :modal="false">
        你好
      </el-drawer>
    </el-container>
  </el-row>
</template>

<script>
import {defineComponent, ref, watch} from "vue"
import debounce from "../utils/debounce"
import {useRoute} from "vue-router/dist/vue-router";
import BmCard from "../components/card/BmCard";
export default defineComponent({
  name: "DashboardLayout",
  components: {BmCard},
  setup() {
    const isCollapse = ref(false)
    const isMessageBoxOpened = ref(false)
    const breadList = ref([])
    const route = useRoute()

    const showMenu = debounce(() => {
      isCollapse.value = !isCollapse.value
    }, 100)
    const showMessageBox = debounce(() => {
      isMessageBoxOpened.value = !isMessageBoxOpened.value
    }, 50)
    const getBreadcrumb = () => {
      let matched = route.matched.filter(item => item.meta.title);
      const first = matched[0]
      if (first.path !== '/workspace') {
        matched = [{ path: '/workspace',meta: {title: '首页'}} ].concat(matched)
      }
      breadList.value = matched
    }

    watch(
        () => route.path,
        () => getBreadcrumb()
    )

    getBreadcrumb();
    return {
      isCollapse,
      isMessageBoxOpened,
      breadList,
      showMenu,
      showMessageBox,
    }
  }
})
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
  transition background .3s,width .3s cubic-bezier(.2,0,0,1) 0s
  --el-menu-bg-color #001529
  --el-menu-text-color hsla(0, 0, 100%, 0.65)


.bm-sider-menu
  .el-icon
    transition font-size .15s cubic-bezier(.215,.61,.355,1),margin .3s cubic-bezier(.645,.045,.355,1)
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
  line-height 64px
  background #ffffff
  z-index 9

.bm-header
  position relative
  height 64px
  padding 0
  box-shadow 0 1px 4px rgba(0, 21, 41, 0.08)

  .bm-header-trigger
    height 64px
    line-height: 64px
    vertical-align top
    padding 0 22px
    display inline-block
    cursor pointer
    -webkit-transition all .3s,padding 0s
    transition all .3s,padding 0s

    .el-icon
      vertical-align -0.225em

.header-index-right
  margin-right 8px
  float right
  height 100%
  margin-left auto
  overflow hidden

.header-index-avatar, .header-index-messagebox
  display inline-block
  padding 0 12px
  cursor pointer
  height 100%
  line-height 64px
  transition all 0.3s

.header-index-messagebox
  margin-right 20px

.el-badge.header-index-messagebox :deep(.el-badge__content.is-fixed)
  transform none
  margin-top 18px

.header-index-avatar:hover, .header-index-messagebox:hover
  background rgba(0, 0, 0, 0.025)

.bm-avatar-sm
  margin 20px 0
  margin-right 8px
  vertical-align top
  //background transparent

.bm-page-header
  -webkit-box-sizing: border-box
  box-sizing: border-box
  margin: 0
  color: rgba(0,0,0,.65)
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
</style>