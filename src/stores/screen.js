import {defineStore} from "pinia/dist/pinia";
import { ref } from "vue";

export const useScreenStore = defineStore('screen',() => {
    const sm = ref(false)

    return { sm }
})