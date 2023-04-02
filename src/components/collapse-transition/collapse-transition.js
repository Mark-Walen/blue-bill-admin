import { createComponent } from "@/utils/create";
import { h, Transition } from "vue";

export default createComponent({
  name: "CollapseTransition",
  setup(props, { slots }) {
    const elTransition = "0.3s height width ease-in-out";
    const transition = {
      onBeforeEnter: (el) => {
        el.style.transition = elTransition;
        if (!el.dataset) el.dataset = {};

        el.style.height = 0;
      },

      onEnter: (el) => {
        if (el.scrollHeight !== 0) {
          el.style.height = `${el.scrollHeight}px`;
        } else {
          el.style.height = "";
        }
        el.style.overflow = "hidden";
      },

      onAfterEnter: (el) => {
        el.style.transition = "";
        el.style.height = "";
      },

      onBeforeLeave: (el) => {
        if (!el.dataset) el.dataset = {};
        el.style.display = "block";
        el.style.height = `${el.scrollHeight}px`;
        el.style.overflow = "hidden";
      },

      onLeave: (el) => {
        if (el.scrollHeight !== 0) {
          el.style.transition = elTransition;
          el.style.height = 0;
        }
      },

      onAfterLeave: (el) => {
        el.style.transition = "";
        el.style.height = "";
      }
    }
    return () => h(Transition, { ...transition }, slots);
  }
});