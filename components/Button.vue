<template>
    <div :class="`${className} ${isFull ? 'w-full' : ''}`">
        <button
            @click="$emit('click')"
            :class="`${bodyClassName} outline-none focus:outline-none rounded-md flex items-center justify-center w-full text-black py-2 ${bodyColor}-900 hover:${bodyColor}-800 border-blue-900 hover:border-blue-800 text-white`">
            <i v-if="isLoading" class="fas fa-spinner mr-2 animate-spin-slow"></i>
            <span>{{ title }}</span>
        </button>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Button extends Vue {
    @Prop(String) readonly className!: string
    @Prop(String) readonly bodyClassName!: string
    @Prop({type: String, default: () => 'bg-blue'}) readonly bodyColor!: string
    @Prop(String) readonly title!: string
    @Prop(Boolean) readonly isLoading!: boolean
    @Prop(Boolean) readonly isFull!: boolean
}
</script>

<style lang="scss" scoped>
</style>