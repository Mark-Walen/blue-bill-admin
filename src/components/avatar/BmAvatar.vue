<template>
    <el-avatar :src="getImageUrl(src)" :size="size" />
</template>

<script>
import { defineComponent } from "vue";
import { getImageUrl } from "@/utils/util";

export default defineComponent({
    name: 'BmAvatar',
    props: {
        src: {
            type: String,
            required: true
        },
        size: {
            type: [Number, String],
            validator: (value) => {
                if (typeof value === 'number' && !isNaN(value)) return true
                return [ 'small', 'default', 'large' ].includes(value)
            }
        }
    },
    methods: {
        getImageUrl
    }
})
</script>

<style scoped>

</style>