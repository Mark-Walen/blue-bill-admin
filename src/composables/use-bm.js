import { inject } from "vue";

export default function useBm() {
  return inject('_bm_')
}