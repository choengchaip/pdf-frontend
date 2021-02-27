<template>
    <div class="h-full w-full flex items-center">
        <div @click="$emit('approve')"
             class="flex items-center justify-center w-8 h-8 bg-white rounded-full cursor-pointer mr-2 text-blue-600">
            <i class="fas fa-signature"></i>
        </div>
        <div @click="$emit('download')"
             class="flex items-center justify-center w-8 h-8 bg-white rounded-full cursor-pointer text-blue-600">
            <i class="fas fa-cloud-download-alt"></i>
        </div>
    </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";

@Component
export default class ApproveController extends Base {
}
</script>

<style lang="scss" scoped>
</style>