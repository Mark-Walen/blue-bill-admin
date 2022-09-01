<template>
    <el-row justify="center">
        <el-container direction="vertical">
            <el-main class="flex h-screen my-0">
                <router-view />
            </el-main>
        </el-container>
    </el-row>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'GuestLayout'
})
</script>
<style lang="stylus">

.el-main
    --el-main-padding 0
</style>
