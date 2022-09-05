<template>
    <el-dialog ref="dialogRef" @close="onDialogHide">
        <template #header="{ close }">
            <div class="dialog-header">
                <span class="text-bold text-caption">{{ props.options && props.options.title }}</span>
                <div class="space"></div>
                <el-button @click="close" circle :icon="Close"></el-button>
            </div>
        </template>
        <component :is="props.comp" v-bind="props.cmpProps" :done="done"></component>
    </el-dialog>
</template>
<script setup>
const props = defineProps({
  comp: Object,
  compProps: Object,
  options: Object
})

const done = async (data) => {
    let res = null
    if (props.compProps && props.compProps.done) {
        res = props.compProps.done(data)
    }
    return res
}
</script>