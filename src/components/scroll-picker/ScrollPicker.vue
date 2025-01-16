<template>
    <div class="vue-scroll-picker" ref="$el">
        <div ref="rotator"
            :class="['vue-scroll-picker-rotator', { 'vue-scroll-picker-rotator-transition': transitionTimeout }]"
            :style="typeof scroll === 'number' ? { top: `${scroll}px` } : {}">
            <!-- Placeholder -->
            <template v-if="hasPlaceholder">
                <div class="vue-scroll-picker-item vue-scroll-picker-item-placeholder"
                    :class="{ 'vue-scroll-picker-item-selected': internalIndex === -1 }" :ref="setRefItem">
                    <slot name="placeholder" :text="placeholder">
                        {{ placeholder }}
                    </slot>
                </div>
            </template>

            <!-- Empty State -->
            <template v-else-if="internalOptions.length === 0">
                <div class="vue-scroll-picker-item vue-scroll-picker-item-empty vue-scroll-picker-item-selected"
                    :ref="setRefItem">
                    <slot name="empty" :text="empty">
                        {{ empty }}
                    </slot>
                </div>
            </template>

            <!-- Options -->
            <template v-else>
                <div v-for="(option, index) in internalOptions" :key="option.value" class="vue-scroll-picker-item"
                    :class="{
                        'vue-scroll-picker-item-selected': internalIndex === index,
                        'vue-scroll-picker-item-disabled': option.disabled,
                    }" :ref="setRefItem">
                    <slot name="default" :option="option">
                        {{ option.name }}
                    </slot>
                </div>
            </template>
        </div>

        <div class="vue-scroll-picker-layer">
            <div class="vue-scroll-picker-layer-top" ref="layerTop"></div>
            <div class="vue-scroll-picker-layer-selection" ref="layerSelection"></div>
            <div class="vue-scroll-picker-layer-bottom" ref="layerBottom"></div>
        </div>
    </div>
</template>
<script lang="js">
const debounce = (handle, delay) => {
    let timeout = null
    if (delay == 'undefined' || delay == null) {
        delay = 83
    }

    return function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        const self = this;
        const args = arguments;
        timeout = setTimeout(() => handle.apply(self, args), delay);
    }
}

const getBoundingClientCenterY = (elem) => {
    const { top, bottom } = elem.getBoundingClientRect();
    return (top + bottom) / 2;
}

const normalizeOptions = (options) => {
    return options.map((option) => {
        switch (typeof option) {
            case 'string':
                return { value: option, name: option };
            case 'number':
            case 'boolean':
                return { value: option, name: `${option}` };
            default:
                return option;
        }
    });
}

const isTouchEvent = (event) => {
    return event.changedTouches || event.touches;
}

const getEventXY = (event) => {
    if (isTouchEvent(event)) {
        return event.changedTouches[0] || event.touches[0];
    }
    return event;
}
</script>
<script lang="js" setup>
import { ref, computed, useSlots, useTemplateRef, nextTick, toRefs, watch, onBeforeUpdate, onMounted, onBeforeUnmount } from 'vue';
import { isNullOrUndefined } from "@/utils/util";

const props = defineProps({
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
    }
})

const emits = defineEmits(['update:modelValue', 'start', 'move', 'end', 'cancel', 'wheel', 'click'])
const slots = useSlots()
const { modelValue, options } = toRefs(props)

const root = useTemplateRef('$el')
const rotator = useTemplateRef('rotator')
const layerTop = useTemplateRef('layerTop')
const layerSelection = useTemplateRef('layerSelection')
const layerBottom = useTemplateRef('layerBottom')
const items = ref([]);

const resizeObserver = ref(null);
const internalOptions = ref(normalizeOptions(props.options))
const getInternalOptionIndex = () => {
    let index = internalOptions.value.findIndex((option) => option.value == props.modelValue)
    if (index === -1 && !props.placeholder && !slots.placeholder && !props.options.length > 0) {
        index = 0
    }

    return index
}
const internalIndex = ref(getInternalOptionIndex())
const internalValue = ref(internalOptions[internalIndex.value]?.value ?? null)

const bounds = ref([]);
const boundMin = ref(0);
const boundMax = ref(0);

const scroll = ref(null);
const scrollOffsetTop = ref(0);
const scrollMin = ref(0);
const scrollMax = ref(0);

const transitionTimeout = ref(null);
const start = ref(null);
const isDragging = ref(false);

const hasPlaceholder = computed(() => !!(props.placeholder || slots.placeholder));

const setRefItem = (el) => {
    items.value.push(el)
}

const calculateBounds = () => {
    const rotatorTop = rotator.value.getBoundingClientRect().top;
    bounds.value = items.value
        .map((item) => {
            if (!isNullOrUndefined(item))
                return getBoundingClientCenterY(item) - rotatorTop
        })
        .sort((a, b) => a - b);
    boundMin.value = Math.min(...bounds.value);
    boundMax.value = Math.max(...bounds.value);

    scrollOffsetTop.value = layerSelection.value.offsetTop + layerSelection.value.offsetHeight / 2;
    scrollMin.value = scrollOffsetTop.value - boundMin.value;
    scrollMax.value = scrollOffsetTop.value - boundMax.value;
}

const resize = () => {
    nextTick(() => {
        calculateBounds()
        scroll.value = findScrollByIndex(internalIndex.value)
    })
}

const sanitizeInternalIndex = (index) => {
    return Math.min(Math.max(index, hasPlaceholder.value ? -1 : 0), internalOptions.value.length - 1);
};

const findIndexFromScroll = (scroll) => {
    let prevDiff = null;
    let boundIndex = 0;
    bounds.value.forEach((bound, i) => {
        const diff = bound + scroll - scrollOffsetTop.value;
        if (prevDiff === null || Math.abs(prevDiff) > Math.abs(diff)) {
            boundIndex = i;
            prevDiff = diff;
        }
    });
    if (hasPlaceholder.value || props.options.length === 0) {
        return boundIndex - 1;
    }
    return boundIndex;
};

const findScrollByIndex = (index) => {
    let boundIndex = index;
    if (hasPlaceholder.value || props.options.length === 0) {
        boundIndex++;
    }
    if (index > -1 && boundIndex in bounds.value) {
        return scrollOffsetTop.value - bounds.value[boundIndex];
    }
    if (index >= bounds.value.length) {
        return scrollOffsetTop.value - boundMax.value;
    }
    return scrollOffsetTop.value - boundMin.value;
};

const scrollTo = (scroll_, onComplete) => {
    scroll.value = scroll_;
    if (transitionTimeout.value) {
        clearTimeout(transitionTimeout.value);
    }
    transitionTimeout.value = setTimeout(() => {
        transitionTimeout.value = null;
        onComplete?.();
    }, 100);
};

const emitModalValue = (value) => {
    if (internalValue.value !== value) {
        emits('update:modelValue', (internalValue.value = value));
    }
};

const onAfterWheel = debounce((handler) => {
    handler();
}, 200);

const onWheel = (event) => {
    if (scroll.value >= scrollMin.value && event.deltaY < 0) return;
    if (scroll.value <= scrollMax.value && event.deltaY > 0) return;
    if (bounds.value.length === 1) return;

    event.preventDefault();

    const nextDirInternalIndex = sanitizeInternalIndex(internalIndex.value + (event.deltaY > 0 ? 1 : -1));
    const deltaMax =
        event.deltaY > 0
            ? findScrollByIndex(nextDirInternalIndex - 1) - findScrollByIndex(nextDirInternalIndex)
            : findScrollByIndex(nextDirInternalIndex) - findScrollByIndex(nextDirInternalIndex + 1);

    const deltaY = Math.max(Math.min(event.deltaY, deltaMax), deltaMax * -1);

    scroll.value = Math.min(Math.max(scroll.value - deltaY * props.scrollSensitivity, scrollMax.value), scrollMin.value);

    const nextInternalIndex = sanitizeInternalIndex(findIndexFromScroll(scroll.value));
    const nextOption = internalOptions.value[nextInternalIndex];
    const nextInternalValue = nextOption?.value ?? null;

    internalIndex.value = nextInternalIndex;
    emits('wheel', nextInternalValue);
    if (internalValue.value !== nextInternalValue && !nextOption?.disabled) {
        emits('update:modelValue', (internalValue.value = nextInternalValue));
    }

    onAfterWheel(() => {
        correction(scroll.value);
    });
};

const onStart = (event) => {
    if (event.cancelable) {
        event.preventDefault();
    }

    const { clientY } = getEventXY(event);
    start.value = [scroll.value, clientY];
    isDragging.value = false;
    emits('start');
};

const onMove = (event) => {
    if (!start.value) return;
    if (event.cancelable) {
        event.preventDefault();
    }
    const { clientY } = getEventXY(event);
    const diff = clientY - start.value[1];
    if (Math.abs(diff) > 1.5) {
        isDragging.value = true;
    }
    scroll.value = start.value[0] + diff * (isTouchEvent(event) ? props.touchSensitivity : props.dragSensitivity);

    const nextInternalIndex = sanitizeInternalIndex(findIndexFromScroll(scroll.value));
    const nextInternalValue = internalOptions.value[nextInternalIndex]?.value ?? null;
    emits('move', nextInternalValue);
};

const onEnd = (event) => {
    if (!start.value) return;
    if (event.cancelable) {
        event.preventDefault();
    }
    if (isDragging.value) {
        correction(scroll.value);
    } else {
        onClick(event);
    }
    start.value = null;
    isDragging.value = false;
    emits('end', internalValue.value);
};

const onDocumentMouseOut = (event) => {
    if (event.relatedTarget === null || event.relatedTarget?.nodeName === 'HTML') {
        onCancel(event);
    }
};

const onCancel = (event) => {
    if (event.cancelable) {
        event.preventDefault();
    }
    scrollTo(findScrollByIndex(internalIndex.value));
    start.value = null;
    isDragging.value = false;
    emits('cancel');
};

const onClick = (event) => {
    
    const { clientX: x, clientY: y } = getEventXY(event);
    const topRect = layerTop.value.getBoundingClientRect();
    const bottomRect = layerBottom.value.getBoundingClientRect();

    let nextIndex = internalIndex.value;
    if (topRect.left <= x && x <= topRect.right && topRect.top <= y && y <= topRect.bottom) {
        if (internalIndex.value === (hasPlaceholder.value ? -1 : 0)) {
            return; // top
        }
        nextIndex--;
        while (internalOptions.value[nextIndex] && internalOptions.value[nextIndex].disabled) {
            nextIndex--;
        }
    } else if (bottomRect.left <= x && x <= bottomRect.right && bottomRect.top <= y && y <= bottomRect.bottom) {
        if (internalIndex.value === internalOptions.value.length - 1) {
            return; // bottom
        }
        nextIndex++;
        while (internalOptions.value[nextIndex] && internalOptions.value[nextIndex].disabled) {
            nextIndex++;
        }
    }
    if (internalIndex.value !== nextIndex && internalOptions.value[nextIndex]) {
        const value = internalValue.value;
        const nextValue = internalOptions.value[nextIndex].value;
        scrollTo(findScrollByIndex(nextIndex), () => {
            internalIndex.value = nextIndex;
            emitModalValue(nextValue);
        });
        emits('click', nextValue, value);
    }
};

const correction = (scroll) => {
    const indexOffset = hasPlaceholder.value || props.options.length === 0 ? 1 : 0;
    const indexes = bounds.value
        .map((bound, i) => [i - indexOffset, bound + scroll - scrollOffsetTop.value]) // [index, diff]
        .sort((a, b) => Math.abs(a[1]) - Math.abs(b[1])) // nearest diff
        .map(([i]) => i); // index

    let indexCursor = 0;
    while (
        indexes[indexCursor] != null &&
        internalOptions.value[indexes[indexCursor]] &&
        internalOptions.value[indexes[indexCursor]].disabled
    ) {
        indexCursor++;
    }
    if (
        indexes[indexCursor] === -1 ||
        (indexes[indexCursor] != null && internalOptions.value[indexes[indexCursor]])
    ) {
        const nextIndex = indexes[indexCursor];
        const nextValue = internalOptions.value[nextIndex]?.value ?? null;
        scrollTo(findScrollByIndex(nextIndex), () => {
            internalIndex.value = nextIndex;
            emitModalValue(nextValue);
        });
    } else {
        scrollTo(findScrollByIndex(internalIndex.value)); // cancel
    }
};

watch(modelValue, (newVal) => {
    if (isNullOrUndefined(newVal) && hasPlaceholder) {
        scrollTo(findScrollByIndex(-1))
        return
    }

    const nextInternalIndex = internalOptions.value.findIndex((option) => option.value == newVal);
    if (nextInternalIndex === -1) {
        emits('update:modelValue', internalValue.value);
        return;
    }

    if (internalIndex.value !== nextInternalIndex) {
        internalIndex.value = nextInternalIndex;
        scrollTo(findScrollByIndex(nextInternalIndex));
    }
})

watch(options, (newVal) => {
    internalOptions.value = normalizeOptions(newVal);

    let nextInternalIndex = internalOptions.value.findIndex((option) => option.value == modelValue.value);
    if (nextInternalIndex === -1 && !hasPlaceholder.value && options.value.length > 0) {
        nextInternalIndex = 0;
    }
    const nextInternalValue = internalOptions.value[nextInternalIndex]?.value ?? null;

    calculateBounds();
    scroll.value = findScrollByIndex(nextInternalIndex);
    internalIndex.value = nextInternalIndex;
    if (internalValue.value !== nextInternalValue) {
        emits('update:modelValue', (internalValue.value = nextInternalValue));
    }
}, { deep: true })

onBeforeUpdate(() => {
    items.value = []
})

onMounted(() => {
    calculateBounds();
    scroll.value = findScrollByIndex(internalIndex.value);
    if (internalValue.value !== props.modelValue) {
        emits('update:modelValue', internalValue.value);
    }

    const $el = root.value;
    $el.addEventListener('touchstart', onStart)
    $el.addEventListener('touchmove', onMove)
    $el.addEventListener('touchend', onEnd)
    $el.addEventListener('touchcancel', onCancel)

    if ('onwheel' in $el) {
        $el.addEventListener('wheel', onWheel);
    } else if ('onmousewheel' in $el) {
        $el.addEventListener('mousewheel', onWheel);
    } else if ('onDOMMouseScroll' in $el) {
        $el.addEventListener('DOMMouseScroll', onWheel);
    }
    $el.addEventListener('mousedown', onStart)
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('mouseout', onDocumentMouseOut);

    if (typeof window.ResizeObserver !== 'undefined') {
        resizeObserver.value = new window.ResizeObserver(() => resize());
        resizeObserver.value.observe($el);
    }
})

onBeforeUnmount(() => {
    const $el = root.value;

    $el.removeEventListener('touchstart', onStart);
    $el.removeEventListener('touchmove', onMove);
    $el.removeEventListener('touchend', onEnd);
    $el.removeEventListener('touchcancel', onCancel);

    if ('onwheel' in $el) {
        $el.removeEventListener('wheel', onWheel);
    } else if ('onmousewheel' in $el) {
        $el.removeEventListener('mousewheel', onWheel);
    } else if ('onDOMMouseScroll' in $el) {
        $el.removeEventListener('DOMMouseScroll', onWheel);
    }
    $el.removeEventListener('mousedown', onStart);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('mouseout', onDocumentMouseOut);

    resizeObserver.value?.disconnect();
})
</script>
