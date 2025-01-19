import { defineComponent, h, renderSlot } from 'vue'
import { isNullOrUndefined } from "@/utils/util";


function debounce(handle, delay = 83) { // eslint-disable-line @typescript-eslint/ban-types
    let timeout = null
    return function (...args) {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => handle.apply(this, args), delay)
    };
}

function getBoundingClientCenterY(elem) {
    const { top, bottom } = elem.getBoundingClientRect()
    return (top + bottom) / 2
}

function normalizeOptions(options) {
    return options.map((option) => {
        switch (typeof option) {
            case 'string': {
                return { value: option, name: option }
            }
            case 'number':
            case 'boolean': {
                return { value: option, name: `${option}` }
            }
        }
        return option
    })
}

function isTouchEvent(event) {
    return event.changedTouches || event.touches
}

function getEventXY(event) {
    if (isTouchEvent(event)) {
        return event.changedTouches[0] || event.touches[0]
    }
    return event
}

export default defineComponent({
    name: 'ScrollPicker',
    props: {
        modelValue: null,
        options: {
            type: Array,
            default: () => [],
        },
        dragSensitivity: {
            type: Number,
            default: 1.7,
        },
        touchSensitivity: {
            type: Number,
            default: 1.7,
        },
        scrollSensitivity: {
            type: Number,
            default: 1,
        },
        empty: {
            type: String,
            default: 'No Items',
        },
        placeholder: {
            type: String,
            default: null,
        },
    },
    emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
        'update:modelValue': (value) => true,
        'start': () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
        'move': (value) => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
        'end': (value) => true,
        'cancel': () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
        'wheel': (value) => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
        'click': (newValue, oldValue) => true,
    },
    data() {
        const internalOptions = normalizeOptions(this.options)

        let internalIndex = internalOptions.findIndex(option => option.value == this.modelValue)
        if (internalIndex === -1 && !this.placeholder && !this.$slots.placeholder && this.options.length > 0) {
            internalIndex = 0
        }
        const internalValue = internalOptions[internalIndex]?.value ?? null

        return {
            resizeObserver: null,
            refItems: [],

            internalOptions,
            internalIndex,
            internalValue,

            bounds: [],
            boundMin: 0,
            boundMax: 0,

            scroll: null,
            scrollOffsetTop: 0,
            scrollMin: 0,
            scrollMax: 0,

            transitionTimeout: null,

            start: null,

            isDragging: false,
        }
    },
    computed: {
        hasPlaceholder() {
            return !!(this.placeholder || this.$slots.placeholder)
        },
    },
    watch: {
        modelValue(value) {
            if ((value === null || value === undefined) && this.hasPlaceholder) {
                this.scrollTo(this.findScrollByIndex(-1))
                return
            }
            
            
            this.$nextTick(() => {
                const nextInternalIndex = this.internalOptions.findIndex((option) => option.value == value)
                if (nextInternalIndex === -1) {
                    this.$emit('update:modelValue', this.internalValue)
                    return
                }

                if (this.internalIndex !== nextInternalIndex) {
                    this.internalIndex = nextInternalIndex
                    this.scrollTo(this.findScrollByIndex(nextInternalIndex))
                }
            })
        },
        options: {
            handler(options) {
                const internalOptions = this.internalOptions = normalizeOptions(options)

                let internalIndex = internalOptions.findIndex(option => option.value == this.modelValue)
                if (internalIndex === -1 && !this.hasPlaceholder && this.options.length > 0) {
                    internalIndex = 0
                }
                const internalValue = internalOptions[internalIndex]?.value ?? null

                this.$nextTick(() => {
                    this.calculateBounds()
                    this.scroll = this.findScrollByIndex(internalIndex)
                    this.internalIndex = internalIndex
                    if (this.internalValue !== internalValue) {
                        console.log(internalValue)
                        this.$emit('update:modelValue', this.internalValue = internalValue)
                    }
                })
            },
            deep: true,
        },
    },
    beforeUpdate() {
        this.refItems = []
    },
    mounted() {
        this.calculateBounds()
        this.scroll = this.findScrollByIndex(this.internalIndex)
        if (this.internalValue !== this.modelValue) {
            this.$emit('update:modelValue', this.internalValue)
        }

        const $el = this.$el

        $el.addEventListener('touchstart', this.onStart)
        $el.addEventListener('touchmove', this.onMove)
        $el.addEventListener('touchend', this.onEnd)
        $el.addEventListener('touchcancel', this.onCancel)

        if ('onwheel' in $el) {
            $el.addEventListener('wheel', this.onWheel)
        } else if ('onmousewheel' in $el) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/mousewheel_event
            $el.addEventListener('mousewheel', this.onWheel)
        } else if ('onDOMMouseScroll' in $el) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/DOMMouseScroll_event
            $el.addEventListener('DOMMouseScroll', this.onWheel)
        }
        $el.addEventListener('mousedown', this.onStart)
        document.addEventListener('mousemove', this.onMove)
        document.addEventListener('mouseup', this.onEnd)
        document.addEventListener('mouseout', this.onDocumentMouseOut)

        if (typeof window.ResizeObserver !== 'undefined') {
            const resizeObserver = this.resizeObserver = new window.ResizeObserver(() => this.resize())
            resizeObserver.observe($el)
        }
    },
    beforeUnmount() {
        const $el = this.$el

        $el.removeEventListener('touchstart', this.onStart)
        $el.removeEventListener('touchmove', this.onMove)
        $el.removeEventListener('touchend', this.onEnd)
        $el.removeEventListener('touchcancel', this.onCancel)

        if ('onwheel' in $el) {
            $el.removeEventListener('wheel', this.onWheel)
        } else if ('onmousewheel' in $el) {
            $el.removeEventListener('mousewheel', this.onWheel)
        } else if ('onDOMMouseScroll' in $el) {
            $el.removeEventListener('DOMMouseScroll', this.onWheel)
        }
        $el.removeEventListener('mousedown', this.onStart)
        document.removeEventListener('mousemove', this.onMove)
        document.removeEventListener('mouseup', this.onEnd)
        document.removeEventListener('mouseout', this.onDocumentMouseOut)

        this.resizeObserver?.disconnect()
    },
    methods: {
        setRefItem(el) {
            this.refItems.push(el)
        },
        resize() {
            this.$nextTick(() => {
                this.calculateBounds()
                this.scroll = this.findScrollByIndex(this.internalIndex)
            })
        },
        calculateBounds() {
            const $rotator = this.$refs.rotator
            const $layerSelection = this.$refs.layerSelection

            const rotatorTop = $rotator.getBoundingClientRect().top
            const bounds = this.bounds = this.refItems.map((item) => getBoundingClientCenterY(item) - rotatorTop).sort((a, b) => a - b)
            const boundMin = this.boundMin = Math.min(...bounds)
            const boundMax = this.boundMax = Math.max(...bounds)

            const scrollOffsetTop = this.scrollOffsetTop = $layerSelection.offsetTop + $layerSelection.offsetHeight / 2

            this.scrollMin = scrollOffsetTop - boundMin
            this.scrollMax = scrollOffsetTop - boundMax
        },
        sanitizeInternalIndex(index) {
            return Math.min(Math.max(index, this.hasPlaceholder ? -1 : 0), this.internalOptions.length - 1)
        },
        findIndexFromScroll(scroll) {
            let prevDiff = null
            let boundIndex = 0
            this.bounds.forEach((bound, i) => {
                const diff = bound + scroll - this.scrollOffsetTop
                if (prevDiff === null || Math.abs(prevDiff) > Math.abs(diff)) {
                    boundIndex = i
                    prevDiff = diff
                }
            })
            if (this.hasPlaceholder || this.options.length === 0) {
                return boundIndex - 1
            }
            return boundIndex
        },
        findScrollByIndex(index) {
            let boundIndex = index
            if (this.hasPlaceholder || this.options.length === 0) {
                boundIndex++
            }
            if (index > -1 && boundIndex in this.bounds) {
                return this.scrollOffsetTop - this.bounds[boundIndex]
            }
            if (index >= this.bounds.length) {
                return this.scrollOffsetTop - this.boundMax
            }
            return this.scrollOffsetTop - this.boundMin
        },
        onWheel(event) {
            if (!isNullOrUndefined(this.scroll) && this.scroll >= this.scrollMin && event.deltaY < 0) { return }
            if (!isNullOrUndefined(this.scroll) && this.scroll <= this.scrollMax && event.deltaY > 0) { return }
            if (this.bounds.length === 1) { return }

            event.preventDefault()

            const nextDirInternalIndex = this.sanitizeInternalIndex(this.internalIndex + (event.deltaY > 0 ? 1 : -1))
            const deltaMax = event.deltaY > 0
                ? this.findScrollByIndex(nextDirInternalIndex - 1) - this.findScrollByIndex(nextDirInternalIndex)
                : this.findScrollByIndex(nextDirInternalIndex) - this.findScrollByIndex(nextDirInternalIndex + 1)

            const deltaY = Math.max(Math.min(event.deltaY, deltaMax), deltaMax * -1)

            this.scroll = Math.min(Math.max(this.scroll - deltaY * this.scrollSensitivity, this.scrollMax), this.scrollMin)

            const nextInternalIndex = this.sanitizeInternalIndex(this.findIndexFromScroll(this.scroll))
            const nextOption = this.internalOptions[nextInternalIndex]
            const nextInternalValue = nextOption?.value ?? null

            this.internalIndex = nextInternalIndex
            this.$emit('wheel', nextInternalValue)
            if (this.internalValue !== nextInternalValue && !nextOption?.disabled) {
                this.$emit('update:modelValue', this.internalValue = nextInternalValue)
            }

            this.onAfterWheel(() => {
                this.correction(this.scroll)
            })
        },
        onAfterWheel: debounce((handler) => {
            handler()
        }, 200),
        onStart(event) {
            if (event.cancelable) {
                event.preventDefault()
            }

            const { clientY } = getEventXY(event)
            this.start = [this.scroll, clientY]
            this.isDragging = false
            this.$emit('start')
        },
        onMove(event) {
            if (!this.start) {
                return
            }
            if (event.cancelable) {
                event.preventDefault()
            }
            const { clientY } = getEventXY(event)
            const diff = clientY - this.start[1]
            if (Math.abs(diff) > 1.5) {
                this.isDragging = true
            }
            this.scroll = this.start[0] + diff * (isTouchEvent(event) ? this.touchSensitivity : this.dragSensitivity)

            const nextInternalIndex = this.sanitizeInternalIndex(this.findIndexFromScroll(this.scroll))
            const nextInternalValue = this.internalOptions[nextInternalIndex]?.value ?? null
            this.$emit('move', nextInternalValue)
        },
        onEnd(event) {
            if (!this.start) {
                return
            }
            if (event.cancelable) {
                event.preventDefault()
            }
            if (this.isDragging) {
                this.correction(this.scroll)
            } else {
                this.onClick(event)
            }
            this.start = null
            this.isDragging = false
            this.$emit('end', this.internalValue)
        },
        onDocumentMouseOut(event) {
            if (event.relatedTarget === null || (event.relatedTarget)?.nodeName === 'HTML') {
                this.onCancel(event)
            }
        },
        onCancel(event) {
            if (event.cancelable) {
                event.preventDefault()
            }
            this.scrollTo(this.findScrollByIndex(this.internalIndex))
            this.start = null
            this.isDragging = false
            this.$emit('cancel')
        },
        onClick(event) {
            const $layerTop = this.$refs.layerTop
            const $layerBottom = this.$refs.layerBottom
            const { clientX: x, clientY: y } = getEventXY(event)
            const topRect = $layerTop.getBoundingClientRect()
            const bottomRect = $layerBottom.getBoundingClientRect()

            let nextIndex = this.internalIndex
            if (topRect.left <= x && x <= topRect.right && topRect.top <= y && y <= topRect.bottom) {
                if (this.internalIndex === (this.hasPlaceholder ? -1 : 0)) {
                    return // top
                }
                nextIndex--
                while (this.internalOptions[nextIndex] && this.internalOptions[nextIndex].disabled) {
                    nextIndex--
                }
            } else if (bottomRect.left <= x && x <= bottomRect.right && bottomRect.top <= y && y <= bottomRect.bottom) {
                if (this.internalIndex === this.internalOptions.length - 1) {
                    return // bottom
                }
                nextIndex++
                while (this.internalOptions[nextIndex] && this.internalOptions[nextIndex].disabled) {
                    nextIndex++
                }
            }
            if (this.internalIndex !== nextIndex && this.internalOptions[nextIndex]) {
                const value = this.internalValue
                const nextValue = this.internalOptions[nextIndex].value
                this.scrollTo(this.findScrollByIndex(nextIndex), () => {
                    this.internalIndex = nextIndex
                    this.emitModalValue(nextValue)
                })
                this.$emit('click', nextValue, value)
            }
        },
        correction(scroll) {
            const indexOffset = this.hasPlaceholder || this.options.length === 0 ? 1 : 0
            const indexes = this.bounds
                .map((bound, i) => [i - indexOffset, bound + scroll - this.scrollOffsetTop]) // [index, diff]
                .sort((a, b) => Math.abs(a[1]) - Math.abs(b[1])) // nearest diff
                .map(([i]) => i) // index

            let indexCursor = 0
            while (
                indexes[indexCursor] != null
                && this.internalOptions[indexes[indexCursor]]
                && this.internalOptions[indexes[indexCursor]].disabled
            ) {
                indexCursor++
            }
            if (
                indexes[indexCursor] === -1
                || indexes[indexCursor] != null && this.internalOptions[indexes[indexCursor]]
            ) {
                const nextIndex = indexes[indexCursor]
                const nextValue = this.internalOptions[nextIndex]?.value ?? null
                this.scrollTo(this.findScrollByIndex(nextIndex), () => {
                    this.internalIndex = nextIndex
                    this.emitModalValue(nextValue)
                })
            } else {
                this.scrollTo(this.findScrollByIndex(this.internalIndex)) // cancel
            }
        },
        scrollTo(scroll, onComplete) {
            this.scroll = scroll
            if (this.transitionTimeout) {
                clearTimeout(this.transitionTimeout)
            }
            this.transitionTimeout = setTimeout(() => {
                this.transitionTimeout = null
                onComplete?.()
            }, 100)
        },
        emitModalValue(value) {
            if (this.internalValue !== value) {
                this.$emit('update:modelValue', this.internalValue = value)
            }
        },
    },
    render() {
        let nodes = []
        if (this.hasPlaceholder) {
            nodes.push(h('div', {
                class: [
                    'vue-scroll-picker-item',
                    'vue-scroll-picker-item-placeholder',
                    {
                        'vue-scroll-picker-item-selected': this.internalIndex === -1,
                    },
                ],
                ref: (el) => el && this.setRefItem(el),
            }, renderSlot(this.$slots, 'placeholder', { text: this.placeholder }, () => [
                this.placeholder,
            ])))
        } else if (this.internalOptions.length === 0) {
            nodes.push(h('div', {
                class: [
                    'vue-scroll-picker-item',
                    'vue-scroll-picker-item-empty',
                    'vue-scroll-picker-item-selected',
                ],
                ref: (el) => el && this.setRefItem(el),
            }, renderSlot(this.$slots, 'empty', { text: this.empty }, () => [
                this.empty,
            ])))
        }

        nodes = nodes.concat(this.internalOptions.map((option, index) => {
            return h('div', {
                class: [
                    'vue-scroll-picker-item',
                    {
                        'vue-scroll-picker-item-selected': this.internalIndex === index,
                        'vue-scroll-picker-item-disabled': option.disabled,
                    },
                ],
                key: option.value,
                ref: (el) => el && this.setRefItem(el),
            }, renderSlot(this.$slots, 'default', { option }, () => [
                option.name,
            ]))
        }))
        return h('div', {
            class: [
                'vue-scroll-picker',
            ],
        }, [
            h('div', {
                ref: 'rotator',
                class: [
                    'vue-scroll-picker-rotator',
                    {
                        'vue-scroll-picker-rotator-transition': this.transitionTimeout,
                    },
                ],
                style: typeof this.scroll === 'number' ? { top: `${this.scroll}px` } : {},
            }, nodes),
            h('div', { class: ['vue-scroll-picker-layer'] }, [
                h('div', { class: ['vue-scroll-picker-layer-top'], ref: 'layerTop' }),
                h('div', { class: ['vue-scroll-picker-layer-selection'], ref: 'layerSelection' }),
                h('div', { class: ['vue-scroll-picker-layer-bottom'], ref: 'layerBottom' }),
            ]),
        ])
    },
})
