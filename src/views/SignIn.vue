<template>
  <el-row class="fit login-wrapper bg-img" style="background-image: url('img/login-bg.png')">
    <el-row class="flex" :class="{
      'row': true,
      'justify-end bg-transparent	': $bm.screen.gt.sm,
      'justify-center items-center h-screen p-xl bg-white': !$bm.screen.gt.sm
    }">
      <el-form @submit.prevent="false"
               :class="{
                'bg-white rounded': true,
                'column justify-around mr-[10vw] size-383-484 p-xl': $bm.screen.gt.sm,
                'full-screen from q-gutter-y-md p-md': !$bm.screen.gt.sm
              }
              "
               :ref="loginFormRef"
               :model="loginForm" :rules="rules">
        <el-row :class="{
          'column q-gutter-y-sm': true,
          'items-center': $bm.screen.gt.sm,
          'items-start': !$bm.screen.gt.sm
        }">
          <img src="/img/apple-touch-icon.png" alt="蓝芒记账本" style="width: 64px;"/>
          <span>蓝芒记账，累积每一滴汗水</span>
        </el-row>
        <el-form-item :class="{'mb': !screen.sm}" prop="username">
          <el-input v-model="loginForm.username" clearable placeholder="请输入用户名"/>
        </el-form-item>
        <!-- TODO Remember to set md to 32px on mobile devices -->
        <el-form-item :class="{'mb': !screen.sm}" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" autocomplete="off" show-password/>
        </el-form-item>
        <el-col class="text-center" style="flex: none;">
          <el-checkbox v-model="isRead" size="large" style="vertical-align: middle;"/>
          已阅读并同意
          <span class="text-primary cursor-pointer" @click="toUserAgreement">用户协议</span>
          和
          <span class="text-primary cursor-pointer" @click="toPrivacyStatement">隐私声明</span>
          <bm-card class="flex flex-center justify-center text-no-wrap my-md">
            <el-button native-type="submit" type="primary" :disabled="!isRead" :loading="submitting"
                       style="padding: 20px 100px" round>登录</el-button>
          </bm-card>
        </el-col>
      </el-form>
    </el-row>
  </el-row>
</template>

<script>
import {defineComponent, markRaw, reactive, ref} from "vue";
import BmCard from "../components/card/BmCard";
import {useScreenStore} from "../stores/screen";
import {useResponsiveDialog} from "../utils/dom";
import PrivacyStatement from "../components/login/PrivacyStatement.vue";
import UserAgreement from "../components/login/UserAgreement.vue";

export default defineComponent({
  name: "SignIn",
  components: {
    BmCard
  },
  setup () {
    const screen = useScreenStore()
    const isRead = ref(false)
    const submitting = ref(false)
    const loginFormRef = ref('')
    const loginForm = reactive({
      username: '',
      password: ''
    })

    const rules = reactive({
      username: [
        { required: true, message: '用户名必填', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码必填', trigger: 'blur' }
      ]
    })

    const privacyStatementUi = useResponsiveDialog(markRaw(PrivacyStatement))
    const userAgreementUi = useResponsiveDialog(markRaw(UserAgreement))
    const toUserAgreement = () => {
      // TODO 实现用户协议 UI
      userAgreementUi.show({}, {
        title: '用户协议'
      }, screen)
    }
    const toPrivacyStatement = () => {
      // TODO 实现隐私声明 UI
      privacyStatementUi.show({}, {
        title: '隐私声明'
      }, screen)
    }

    return {
      screen,
      isRead,
      submitting,
      loginFormRef,
      loginForm,
      rules,

      toUserAgreement,
      toPrivacyStatement
    }
  }
})
</script>

<style scoped>
.fit {
  width: 100%;
  height: 100%;
}

.bg-img {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.size-383-484 {
  width: 383px;
  height: 484px;
}

.from {
  width: 80%;
  height: 80%;
}

.full-screen {
  width: 100%;
}

.size-190-30 {
  width: 300px;
  height: 35px;
}

:deep(.el-checkbox__inner) {
  width: 16px !important;
  height: 16px !important;
}

:deep(.el-checkbox__inner:after) {
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  left: 3px;
  top: 0;
  height: 7px;
  width: 5px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
  transform: rotate(45deg) scaleY(1.3);
}

.el-input {
  height: 42px;
  font-size: 14px;
}

.mb {
  margin-bottom: 28px;
}

.text-primary {
  color: var(--el-color-primary);
}

/* Finished submit button bg error caused by tailwindcss, but there still remain a bug I do not know*/
button[type=submit]:not(.is-disabled) {
  background-color: var(--el-button-bg-color);
}
</style>