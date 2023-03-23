<template>
  <bm-card>
    <el-table :data="merchantList" size="large">
      <el-table-column type="selection" width="55" />
<!--      <el-table-column fixed prop="id" label="id" width="90" />-->
      <el-table-column label="店家" width="360">
        <template #default="scope">
          <div style="display: flex; align-items: center;">
            <el-image :src="scope.row.logo" style="width: 120px;" fit="scale-down"/>
            <span v-text="scope.row.name"></span>
          </div>
        </template>
      </el-table-column>
<!--      <el-table-column prop="name" show-overflow-tooltip label="店家名称" width="216" />-->
      <el-table-column prop="address" width="200" show-overflow-tooltip label="地址 | 网址"/>
      <el-table-column prop="memo" label="备注" width="200" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" width="112" >
        <template #default="scope">
          <el-row class="operation-group">
            <el-col :span="8"><el-button link type="primary" size="small">详情</el-button></el-col>
            <el-col :span="8"><el-button link type="warning" size="small">修改</el-button></el-col>
            <el-col :span="8"><el-button link type="danger" size="small">删除</el-button></el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </bm-card>
</template>

<script>
import {defineComponent, ref} from "vue";
import BmCard from "../../components/card/BmCard";

export default defineComponent({
  components: {BmCard},
  setup() {
    const merchantList = ref([])

    merchantList.value = [
      {
        id: 1,
        name: '永辉超市 BRAVO YH',
        logo: '/img/yonghui.png',
        address: '',
        memo: '生活购物常去'
      },
      {
        id: 2,
        name: '中国移动金融科技有限公司',
        logo: '/img/china-mobile.png',
        address: 'http://www.10086.cn/index/sd/index_531_531.html',
        memo: '手机话费充值'
      }
    ]

    return {
      merchantList
    }
  }
})
</script>

<style lang="stylus" scoped>
.bm-card
  --bm-card-padding 24px
</style>
