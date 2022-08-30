<template>
    <el-card class="blue-bill-form-container fit">
        <el-form>
            <el-input placeholder="请输入用户名"></el-input>
            <el-input placeholder="请输入密码"></el-input>
        </el-form>
    </el-card>
</template>

<script>
import { defineComponent} from 'vue'

export default defineComponent({
    name: 'SignIn',
})
</script>
<style lang="stylus">
.fit
    width 100% !important
    height 100% !important
</style>
