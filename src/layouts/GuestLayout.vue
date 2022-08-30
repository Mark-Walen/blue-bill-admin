<template>
    <el-row>
        <el-container direction="vertical">
            <el-main class="flex window-height">
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
.window-height
    margin-top 0 !important
    margin-bottom 0 !important
    height 100vh !important

.el-main
    --el-main-padding 0
</style>
