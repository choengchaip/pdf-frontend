<template>
    <div class="w-full mb-3">
        <div class="mb-1">
            <label v-if="label" class="pb-2">{{ label }}<label v-if="isRequired" class="text-red-600"> *</label></label>
        </div>
        <div
            v-click-outside="()=>{isExpand = false}"
            class="relative rounded-md flex w-full text-black border-2">
            <div class="w-full flex" @click="isExpand = !isExpand" :class="`${isExpand?'pointer-events-none':''}`">
                <input type="text"
                       class="focus:outline-none w-11/12 py-2 mx-auto cursor-pointer bg-white"
                       :placeholder="placeholder"
                       :value="innerValue"
                       disabled>
            </div>
            <div v-show="isExpand" class="rounded-lg shadow-lg bg-white absolute bottom-0 pointer-events-auto z-10"
                 style="transform: translateY(calc(100% - 2px)); width: calc(100% + 4px); left: -2px;">
                <div @click="innerValue = option.value; isExpand = false" :class="getOptionClasses(index)"
                     v-for="(option, index) in options">
                    <span class="py-2 mx-auto w-11/12">{{ option.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Watch} from "vue-property-decorator";
import Base from "~/core/base";

@Component
export default class InputDropdown extends Base {
    @Prop(String) readonly label!: string
    @Prop(String) readonly placeholder!: string
    @Prop(Boolean) readonly isRequired!: boolean
    @Prop(Array) readonly options!: { label: string, value: string }[]
    @Prop(String) readonly value!: string

    isExpand = false
    innerValue = ''

    created() {
        this.innerValue = this.value
    }

    getOptionClasses(index: number): object {
        return {
            'rounded-t-0 border-b-0': index === 0 && this.options.length > 1,
            'rounded-b-lg border-t-0': index === this.options.length - 1 && this.options.length > 1,
            'rounded-lg': this.options.length === 1,
            'flex w-full text-black border-2 cursor-pointer hover:bg-gray-100': true,
        }
    }

    onChange(e: any) {
        this.innerValue = e?.target?.value
    }

    @Watch('innerValue')
    onInnerValueChange(val: string) {
        this.$emit('input', this.innerValue)
    }

    @Watch('value')
    onValueChange(val: string) {
        this.innerValue = val
    }
}
</script>

<style lang="scss" scoped>
</style>