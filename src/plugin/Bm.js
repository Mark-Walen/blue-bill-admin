import installBm from "@/plugin/install-bm";
import defineReactivePlugin from "@/utils/define-reactive-plugin";

export default defineReactivePlugin({}, {
  install(app, opts) {
    installBm(app, { ...opts })
  }
})