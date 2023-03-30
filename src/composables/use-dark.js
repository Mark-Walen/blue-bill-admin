import { computed } from 'vue'

export const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
}

export default function (props, $bm) {
  console.log($bm);
  // return isDark
  return computed(() => (
    props.dark === null
      ? $bm.dark.isActive
      : props.dark
  ))
}