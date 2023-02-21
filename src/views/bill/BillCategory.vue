<template>
  <bm-card>
    <bm-card class="content-toolbar">
      <el-radio-group v-model="category">
        <el-radio-button v-for="(label, index) in categories" :label="label" :key="index" />
      </el-radio-group>
    </bm-card>
    <bm-card class="table-container">
      <el-table :data="billCategoryList" stripe style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="88" />
        <el-table-column prop="categoryName" width="128" label="商品名称" />
        <el-table-column prop="parentId" width="128" label="父级分类ID" />
        <el-table-column fixed="right" label="操作" width="128" >
          <template #default="scope">
            <el-row v-if="scope.row.editable" class="operation-group">
              <el-col :span="8"><el-button link type="warning" size="small" @click="editCategoryItem(scope.row.id)">编辑</el-button></el-col>
              <el-col :span="8"><el-button link type="danger" size="small" @click="deleteCategoryItem(scope.row.id)">删除</el-button></el-col>
            </el-row>
            <span style="cursor: not-allowed;" v-else>此分类不可编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </bm-card>
  </bm-card>
</template>

<script>
import {defineComponent, ref} from "vue";
import BmCard from "../../components/card/BmCard";

export default defineComponent({
  components: {BmCard},
  setup() {
    const category = ref('收入')
    const categories = ref([])
    const billCategoryList = ref([])

    categories.value = ['全部','收入','支出','不计入支出']
    billCategoryList.value = [
      {
        id: 1,
        categoryName: '交通',
        parentId: 0,
        editable: false
      },
      {
        id: 2,
        categoryName: '服饰',
        parentId: 0,
        editable: false
      },
      {
        id: 3,
        categoryName: '零食',
        parentId: 4,
        editable: true
      }
    ]
    const editCategoryItem = (id) => {
      console.log(id)
    }
    const deleteCategoryItem = (id) => {
      console.log(id)
    }
    return {
      category,
      categories,
      billCategoryList,
      editCategoryItem,
      deleteCategoryItem
    }
  },
})
</script>

<style lang="stylus" scoped>
.bm-card
  --bm-card-padding 24px
</style>