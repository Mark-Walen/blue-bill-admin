import { computed } from 'vue'

export const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
}

export default function (props, $bm) {
  // return isDark
  return computed(() => (
    props.dark === null
      ? $bm.dark.isActive
      : props.dark
  ))
}