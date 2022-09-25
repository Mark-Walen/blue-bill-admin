import { createApp, h, ref } from "vue"

export const createDialog = (DefaultComponent, parentApp) => {
    return pluginProps => {
        let DialogComponent, props
        const isCustom = pluginProps.component !== void 0

        if (isCustom === true) {
            const { component, componentProps } = pluginProps

            DialogComponent = (typeof component === 'string') ? parentApp.component(component) : component
            props = componentProps || {}
        } else {
            DialogComponent = DefaultComponent
        }
        let vm
        const dialogRef = ref(null)
        const el = document.createElement('div')
        const onClosed = () => {
            app.unmount()
            el.remove()
            app = null
            vm = null
        }
        let app = createChildApp({
            name: 'BmDialog',
            setup: () => () => h(DialogComponent, {
                ...props,
                ref: dialogRef,
                onClosed,
                onVnodeMounted (...args) {
                    if (typeof props.onVnodeMounted === "function") {
                        props.onVnodeMounted(...args)
                    }
                }
            })
        }, parentApp)
        vm = app.mount(el)
        document.body.appendChild(el)
        // console.log(vm)
        // vm.setVisible(true)
    }
}

const createChildApp = (appCfg, parentApp) => {
    const app = createApp(appCfg)
    app.config.globalProperties = parentApp.config.globalProperties

    const { reload, ...appContext } = parentApp._context
    Object.assign(app._context, appContext)

    return app
}
