<template>
    <bm-card class="bm-panel-filter">
        <bm-card class="row justify-between items-center flex-nowrap panel-filter p-sm pl-md">
            <bm-card class="filter-group">
                <bm-card class="filter-group-item" style="width: 8rem;">
                    <el-select placeholder="商家 / 收款方">
                        <el-option key="1" value="空空如也" />
                    </el-select>
                </bm-card>
                <bm-card class="filter-group-item">
                    <el-select placeholder="金额">
                        <el-option key="1" value="空空如也" />
                    </el-select>
                </bm-card>
                <bm-card class="filter-group-item" style="width: 7rem;">
                    <el-select placeholder="交易时间">
                        <el-option key="1" value="空空如也" />
                    </el-select>
                </bm-card>
            </bm-card>
            <bm-card class="operation">
                <bm-card title="筛选" @click="showDialog" class="bm-btn">
                    <svg-icon name="gfilter" :size="20"></svg-icon>
                </bm-card>
                <bm-card title="刷新" class="bm-btn">
                    <svg-icon name="redo" :size="20"></svg-icon>
                </bm-card>
                <bm-card title="记一笔" class="bm-btn">
                    <svg-icon name="plus" :size="20"></svg-icon>
                </bm-card>
            </bm-card>
        </bm-card>
        <bm-separator />
    </bm-card>
</template>

<script setup>
import { markRaw, nextTick, onMounted, ref, toRefs, watch } from "vue";
import BmCard from "../card/BmCard";
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

.filter-group
    display flex
    .filter-group-item
        width 6rem
        margin-right 0.5rem
        --el-border-radius-base 1rem
        --el-component-size 1.875rem

.filter-btn
    --el-button-hover-bg-color: var(--bm-theme-color-4) !important;

.fix-height
    height 2rem
    line-height 32px

.operation
    display flex
    justify-content flex-start
    height 100%
    .bm-btn
        margin-right 0.5rem
</style>