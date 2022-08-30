<template>
  <el-card class="fit flex justify-center no-border-radius column bg-img no-border no-padding" shadow="never" style="background-image: url('img/bg-loginpage-light-web.svg');">
    <el-card class="no-border-radius bg-transparent no-border no-padding flex row justify-end" shadow="never">
      <el-form class="no-wrap column justify-around margin-10vw size-383-484 bg-white pd-48 br-4">
        <el-card class="column no-padding no-border items-center gutter-y-sm, gutter-sm" shadow="never" :body-style="logoCardStyle">
          <img src="img/logo-blue-loginpage-web.svg" alt="蓝芒金融" style="width: 50px;"/>
          <span>蓝芒记账，累积每一滴汗水</span>
        </el-card>
        <el-form-item>
          <el-input
              v-model="username"
              clearable
              placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input
              v-model="password"
              placeholder="请输入密码"
              type="password"
              autocomplete="off"
              show-password />
        </el-form-item>
        <el-card shadow="never" class="text-center no-border-radius no-border no-padding">
          <el-checkbox v-model="isRead" size="large"/>已阅读并同意
          <span class="text-primary cursor-pointer" @click="toUserAgreement">用户协议</span>
          和
          <span class="text-primary cursor-pointer" @click="toPrivacyStatement">隐私声明</span>
          <el-card class="flex flex-center no-border no-padding text-no-wrap my-md" shadow="never">
            <el-button type="primary" :disabled="!isRead" :loading="submitting" style="padding: 20px 100px" round>登录</el-button>
          </el-card>
        </el-card>
      </el-form>
    </el-card>
  </el-card>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SignIn',
  setup () {
    const isRead = ref(false)
    const username = ref('')
    const password = ref('')
    const submitting = ref(false)
    const logoCardStyle = ref({
      display: 'contents'
    })


    const toUserAgreement = () => {
      // TODO 实现用户协议 UI
      console.log("用户协议")
    }

    const toPrivacyStatement = () => {
      // TODO 实现隐私声明 UI
      console.log("隐私声明")
    }

    return {
      isRead,
      username,
      password,
      submitting,
      logoCardStyle,

      toUserAgreement,
      toPrivacyStatement
    }
  }
})
</script>
<style lang="stylus" scoped>
.fit
  width 100% !important
  height 100% !important

.size-383-484
  width 383px
  height 484px

.bg-img
  background-repeat no-repeat
  background-size cover
  background-position center

.margin-10vw
  margin-right 10vw

.pd-48
  padding 48px

.br-4
  border-radius 4px
</style>
