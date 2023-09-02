import { fileURLToPath, URL } from 'node:url'
import path from "path"

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/bill-system-admin/',
    plugins: [
        vue(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
            symbolId: 'bm-icon-[name]',
            customDomId: 'bm-svg_icons'
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            dts: path.resolve(process.cwd(), 'src/auto-imports.d.ts')
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dts: path.resolve(process.cwd(), 'src/components.d.ts')
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
