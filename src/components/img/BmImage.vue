<template>
    <el-image :src="getImageUrl(src)" :loading="loading" />
</template>

<script>
import { defineComponent } from "vue";
import { getImageUrl } from "@/utils/util";

export default defineComponent({
    name: 'BmImage',
    props: {
        src: {
            type: String,
            required: true
        },
        loading: {
            type: String,
            validator: (value) => {
                return [ 'eager', 'lazy' ].includes(value)
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