<template>
  <bm-card>
    <bm-card class="content-toolbar">
      <el-radio-group v-model="category">
        <el-radio-button v-for="(label, index) in categories" :label="label" :key="index" />
      </el-radio-group>
    </bm-card>
    <bm-card class="category-container">
      <el-row>
        <el-col :span="4">beautiful Girl</el-col>
        <el-col :span="4">beautiful Girl</el-col>
        <el-col :span="4">:span="4"</el-col>
        <el-col :span="4">:span="4"</el-col>
        <el-col :span="4">handsome</el-col>
        <el-col :span="4">handsome</el-col>
      </el-row>
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