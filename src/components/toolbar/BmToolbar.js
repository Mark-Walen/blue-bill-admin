import {createComponent} from "../../utils/create";
import {computed, h} from "vue";
import {hSlot} from "../../utils/render";

export default createComponent({
    name: 'BmToolbar',
    props: {
        inset: Boolean
    },
    setup (props, {slots}) {
        const classes = computed(() =>
            'bm-toolbar row flex-nowrap items-center'
            + (props.inset === true ? ' bm-toolbar--inset': '')
        )
        return () => h('div', {class: classes.value}, hSlot(slots.default))
    }
})