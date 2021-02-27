<template>
    <div class="w-full mb-3">
        <div class="mb-1">
            <label v-if="label" class="pb-2">{{ label }}<label v-if="isRequired" class="text-red-600"> *</label></label>
        </div>
        <div @click="onClick" class="rounded-md flex w-full text-black border-2">
            <input type="text"
                   class="focus:outline-none w-11/12 py-2 mx-auto cursor-pointer bg-white"
                   :placeholder="placeholder"
                   :value="getInnerValue()"
                   disabled>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Watch} from "vue-property-decorator";
import Base from "~/core/base";
import {_get} from "~/utils/lodash";

@Component
export default class InputUpload extends Base {
    @Prop(String) readonly label!: string
    @Prop(String) readonly placeholder!: string
    @Prop(Boolean) readonly isRequired!: boolean
    @Prop(File) readonly value!: File

    innerValue: File | null = null

    created() {
        this.innerValue = this.value
    }

    getInnerValue(): string {
        return this.innerValue?.name || ''
    }

    async onClick() {
        const form = window.document.createElement('input')
        form.style.display = 'none'
        form.accept = "application/pdf"
        form.type = "file"
        form.onchange = () => {
            this.innerValue = _get(form, 'files[0]', null)
        }

        window.document.body.appendChild(form)
        form.click()
    }

    @Watch('innerValue')
    onInnerValueChange(val: File) {
        this.$emit('input', this.innerValue)
    }

    @Watch('value')
    onValueChange(val: File) {
        this.innerValue = val
    }
}
</script>

<style lang="scss" scoped>
</style>