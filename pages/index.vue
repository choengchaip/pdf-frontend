<template>
    <div></div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";

@Component({
    middleware: 'auth'
})
export default class Index extends Base {
}
</script>

<style lang="scss" scoped>
</style>