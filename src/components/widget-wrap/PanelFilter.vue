<template>
    <bm-card class="bm-panel-filter">
        <bm-card class="row justify-between items-center flex-nowrap panel-filter p-sm pl-md">
            <bm-card v-if="selectedValues.length">
                <bm-chip v-for="item in selectedValues" :key="item.field" dense removable
                         @remove="onChipClick(item.field)"
                         color="primary" text-color="white">
                    {{ item.lable }}: {{ item.displayValue }}
                </bm-chip>
            </bm-card>
            <bm-card v-else class="text-gray-600 fix-height">
                暂无筛选条件
            </bm-card>
            <bm-card title="筛选" @click="showDialog">
                <svg-icon name="gfilter" :size="24"></svg-icon>
            </bm-card>
        </bm-card>
        <bm-separator />
    </bm-card>
</template>

<script setup>
import { markRaw, nextTick, onMounted, ref, toRefs, watch } from "vue";
import BmCard from "../card/BmCard";
import { BmChip } from "../chip/";
import { BmSeparator } from "../seperator/";
import { isNullOrUndefined } from "@/utils/util";
import useBm from "@/composables/use-bm";
import DynamicDialogWrapper from "@/components/dialog/DynamicDialogWrapper.vue";
import DialogFilter from "@/components/widget-wrap/DialogFilter.vue";
import DialogFilterFooter from "@/components/widget-wrap/DialogFilterFooter.vue";

const props = defineProps({
    options: {},
    value: {},
    onChanged: {},
    alwaysExpanded: { default: true },
    done: { type: Function },
    onExpansionStateChanged: { type: Function },
    immediate: Boolean
});

const fieldMapping = {};
const { options, value } = toRefs(props);
const changedValue = ref(value.value || {});
const expanded = ref(false);

if (!isNullOrUndefined(options.value)) {
    options.value.forEach((i) => {
        fieldMapping[i.field] = i;
    });
}

const selectedValues = ref([]);
const resetOption = () => {
    const res = [];
    options.value.forEach((config) => {
        if (changedValue.value && !isNullOrUndefined(changedValue.value[config.field])) {
            const v = changedValue.value[config.field];
            res.push({
                lable: config.lable,
                field: config.field,
                displayedValue: config.valueFormatter ? config.valueFormatter(v) : v
            });
        }
    });
    selectedValues.value = res;
};

watch(changedValue, (currentValue, oldValue) => {
    resetOption();
    props.onChanged && props.onChanged(changedValue.value);
});

onMounted(() => {
    resetOption();
});

const removeOption = field => {
    const newVal = { ...changedValue.value };
    delete newVal[field];
    changedValue.value = newVal;
};

const setOptionValue = (field, value) => {
    changedValue.value = { ...changedValue.value, [field]: value };
};

const $bm = useBm();
const showDialog = async () => {
    await nextTick();
    if ($bm.screen.gt.sm) {
        $bm.dialog({
            component: DynamicDialogWrapper,
            componentProps: {
                comp: markRaw(DialogFilter),
                options: {
                    title: "筛选",
                    footerComp: markRaw(DialogFilterFooter)
                }
            }
        });
    }
};

const onConfirm = () => {
    if (props.done) {
        props.done(changedValue.value);
    }
};

const onChipClick = (field) => {
    removeOption(field);
    onConfirm();
};

</script>

<style lang="stylus" scoped>
.panel-filter-item
    margin 0 16px

.filter-controller
    --el-button-hover-text-color: var(--bm-theme-color-5)
    --el-button-hover-border-color: var(--bm-theme-color-5)

.filter-btn
    --el-button-hover-bg-color: var(--bm-theme-color-4) !important;

.fix-height
    height 32px
    line-height 32px
</style>