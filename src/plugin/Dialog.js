import { createDialog } from "@/utils/dialog"
import { ElDialog } from "element-plus"
import defineReactivePlugin from "../utils/define-reactive-plugin"

export default defineReactivePlugin({}, {
    __installed: false,
    create: noop(),
    install ({ $bm, parentApp}) {
        $bm.dialog = createDialog(ElDialog, parentApp)
        if (this.__installed !== true) {
            this.create = $bm.dialog
        }
    }
})

function noop() {}
