<template>
    <fragment>
        <div
            @click="onMenuClick"
            class="flex justify-between items-center bg-blue-900 text-white cursor-pointer transition-all py-3 px-8">
            <h6>{{ menu.title }}</h6>
            <i :class="`transition-all fas fa-chevron-down text-xs ${innerValue ? 'transform rotate-180' : ''}`"></i>
        </div>
        <div :class="getChildMenuClasses()">
            <NuxtLink
                v-if="!child.isHide"
                :to="child.to"
                class="flex justify-between items-center bg-blue-100 hover:bg-blue-400 text-blue-900 hover:text-white cursor-pointer transition-all py-3 px-12"
                :key="child.to"
                v-for="child in menu.children">
                <h6>{{ child.title }}</h6>
            </NuxtLink>
        </div>
    </fragment>
</template>

<script lang="ts">
import {Component, Prop} from "vue-property-decorator";
import Base from "~/core/base";

@Component
export default class MenuChild extends Base {
    @Prop(Object) readonly menu!: any
    innerValue: boolean = false

    onMenuClick() {
        this.innerValue = !this.innerValue
    }

    getChildMenuClasses(): object {
        return {
            'overflow-hidden max-h-0 transition-all': true,
            'max-h-64': this.innerValue
        }
    }
}
</script>

<style lang="scss" scoped>
</style>