import { h, computed, getCurrentInstance } from 'vue'
import {createComponent} from "../../utils/create";
import {hSlot} from "../../utils/render";

// import useDark, { useDarkProps } from '../../composables/private/use-dark.js'

export default createComponent({
    name: 'QCard',

    props: {
        // ...useDarkProps,

        tag: {
            type: String,
            default: 'div'
        },

        square: Boolean,
        flat: Boolean,
        bordered: Boolean
    },

    setup (props, { slots }) {
        // const vm = getCurrentInstance()
        // const isDark = useDark(props, vm.proxy.$q)
        const isDark = false

        const classes = computed(() =>
            'bm-card'
            + (isDark.value === true ? ' bm-card--dark bm-dark' : '')
            + (props.bordered === true ? ' bm-card--bordered' : '')
            + (props.square === true ? ' bm-card--square no-border-radius' : '')
            + (props.flat === true ? ' bm-card--flat no-shadow' : '')
        )

        return () => h(props.tag, { class: classes.value }, hSlot(slots.default))
    }
})