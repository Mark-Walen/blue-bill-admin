<template>
  <el-row class="fit login-wrapper bg-img" style="background-image: url('img/login-bg.png')">
    <el-row class="flex" :class="{
      'row': true,
      'justify-end bg-transparent	': screen.sm,
      'justify-center items-center h-screen p-xl bg-white': !screen.sm
    }">
      <el-form @submit.prevent="false"
               :class="{
                'bg-white rounded': true,
                'column justify-around mr-[10vw] size-383-484 p-xl': screen.sm,
                'full-screen from q-gutter-y-md p-md': !screen.sm
              }
              "
               :ref="loginFormRef"
               :model="loginForm" :rules="rules">
        <el-row :class="{
          'column q-gutter-y-sm': true,
          'items-center': screen.sm,
          'items-start': screen.sm
        }">
          <img src="img/apple-touch-icon.png" alt="蓝芒记账本" style="width: 64px;"/>
          <span>蓝芒记账，累积每一滴汗水</span>
        </el-row>
        <el-form-item class="form-control" prop="username">
          <el-input v-model="loginForm.username" clearable placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item class="form-control" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" autocomplete="off" show-password/>
        </el-form-item>
        <el-col class="text-center" style="flex: none;">
          <el-checkbox v-model="isRead" size="24px" style="vertical-align: middle;"/>
          已阅读并同意
          <span class="text-primary cursor-pointer" @click="toUserAgreement">用户协议</span>
          和
          <span class="text-primary cursor-pointer" @click="toPrivacyStatement">隐私声明</span>
          <bm-card class="flex flex-center justify-center text-no-wrap my-md" shadow="never">
            <el-button native-type="submit" type="primary" :disabled="!isRead" :loading="submitting"
                       style="padding: 20px 100px" round>登录</el-button>
          </bm-card>
        </el-col>
      </el-form>
    </el-row>
  </el-row>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import BmCard from "../components/BmCard.vue";
import {useScreenStore} from "../stores/screen";

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

    const toUserAgreement = () => {
      // TODO 实现用户协议 UI
      console.log("用户协议")
    }
    const toPrivacyStatement = () => {
      // TODO 实现隐私声明 UI
      console.log("隐私声明")
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
  width: 24px;
  height: 24px;
}

:deep(.el-checkbox__inner:after) {
  border: 3px solid #fff;
  border-left: 0;
  border-top: 0;
  left: 8px;
  top: 3px;
  height: 10px;
  width: 5px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
  transform: rotate(45deg) scaleY(1.3);
}

.el-input {
  height: 42px;
  font-size: 14px;
}
</style>