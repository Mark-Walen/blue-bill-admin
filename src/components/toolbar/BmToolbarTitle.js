import {computed} from "vue";
import {createComponent} from "../../utils/create";
import {hSlot} from "../../utils/render";

export default createComponent({
    name: 'QToolbarTitle',

    props: {
        shrink: Boolean
    },

    setup (props, { slots }) {
        const classes = computed(() =>
            'q-toolbar__title ellipsis'
            + (props.shrink === true ? ' col-shrink' : '')
        )

        return () => h('div', { class: classes.value }, hSlot(slots.default))
    }
})