import { createDialog } from '../utils/dialog'
import { ElDialog } from "element-plus"
import defineReactivePlugin from "../utils/define-reactive-plugin"

export default defineReactivePlugin({}, {
    __installed: false,
    create: noop(),
    install (app, options) {
        if (this.__installed !== true) {
            this.create = createDialog(ElDialog, app)
        }
        this.__installed = true
    }
})

function noop() {}
