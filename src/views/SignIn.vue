<template>
  <el-row class="fit justify-center flex-col bg-img" style="background-image: url('img/bg-loginpage-light-web.svg');">
    <el-row class="lg:bg-transparent bg-white lg:p-0 p-xl lg:justify-end justify-center items-center h-full lg:h-auto">
      <el-form class="lg:flex lg:flex-nowrap lg:flex-col lg:justify-around lg:mr-[10vw] mr-0 form-media bg-white rounded"
        :rules="rules"
      >
        <el-form-item class="column flex-col p-0 lg:items-center items-start gutter-y-sm gutter-sm">
          <img src="img/logo-blue-loginpage-web.svg" alt="蓝芒记账本" style="width: 50px;" />
          <span>蓝芒记账，累积每一滴汗水</span>
        </el-form-item>
        <el-form-item prop="username">
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
        <el-col class="text-center flex-none">
          <el-checkbox v-model="isRead" size="large"/>已阅读并同意
          <span class="text-primary cursor-pointer" @click="toUserAgreement">用户协议</span>
          和
          <span class="text-primary cursor-pointer" @click="toPrivacyStatement">隐私声明</span>
          <el-card class="flex flex-center no-border no-padding text-no-wrap my-md" shadow="never">
            <el-button type="primary" :disabled="!isRead" :loading="submitting" style="padding: 20px 100px" round>登录</el-button>
          </el-card>
        </el-col>
      </el-form>
    </el-row>
  </el-row>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
// import UserAgreement from 'components/UserAgreement.vue'

export default defineComponent({
  name: 'SignIn',
  setup () {
    const isRead = ref(false)
    const username = ref('')
    const password = ref('')
    const submitting = ref(false)

    const ruleFormRef = ref('')
    const rules = reactive({
      username: [
        { required: true, message: '用户名必填', trigger: 'blur' }
      ],
      passwd: [
        { required: true, message: '密码必填', trigger: 'blur' }
      ]
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
      ruleFormRef,
      rules,

      toUserAgreement,
      toPrivacyStatement
    }
  }
})
</script>
<style lang="styl" scoped>
.fit
  width 100% !important
  height 100% !important


.form-media
  width 100%
  height 80%
  margin-left 0
  padding 16px
  @media screen and (min-width: 1024px)
    width 383px
    height 484px
    padding 48px


.size-300-35
  @media screen and (min-width: 1024px)
    width 300px
    height 35px

.bg-img
  background-repeat no-repeat
  background-size cover
  background-position center

.margin-10vw
  margin-right 10vw


.el-form-item >>> .el-form-item__content
  flex-direction column
  align-items flex-start
  @media screen and (min-width: 1024px)
    aligin-items center

</style>
