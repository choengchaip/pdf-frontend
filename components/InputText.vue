<template>
    <div v-if="!isHide" :class="`${width ? width : 'w-full'} mb-3`">
        <div class="mb-1">
            <label v-if="label" class="pb-2">{{ label }}<label v-if="isRequired" class="text-red-600"> *</label></label>
        </div>
        <div class="rounded-md flex w-full text-black border-2">
            <input @change="onChange" type="text" class="focus:outline-none w-11/12 py-2 mx-auto"
                   :value="innerValue"
                   :placeholder="placeholder"
                   :disabled="isDisabled">
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

@Component
export default class InputText extends Vue {
    @Prop(String) readonly width!: string
    @Prop(String) readonly label!: string
    @Prop(String) readonly placeholder!: string
    @Prop(Boolean) readonly isRequired!: boolean
    @Prop(Boolean) readonly isDisabled!: boolean
    @Prop(Boolean) readonly isHide!: boolean
    @Prop(String) readonly value!: string

    innerValue = ''

    created() {
        this.innerValue = this.value
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