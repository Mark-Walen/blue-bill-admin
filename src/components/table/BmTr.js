import { h, computed } from "vue";
import {createComponent} from "@/utils/create";
import { hSlot } from "@/utils/render";

export default createComponent({
  name: 'BmTr',
  props: {
    props: Object,
    noHover: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'bm-tr'
      + (props.props === void 0 || props.props.header === true ? '' : ' ' + props.props.__trClass)
      + (props.noHover === true ? ' bm-tr--no-hover' : '')
    )

    return () => h('tr', { class: classes.value }, hSlot(slots.default))
  }
})
