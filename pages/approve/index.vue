<template>
    <Approve/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import Approve from "~/features/approve/Approve.vue";

@Component({
    components: {Approve},
    middleware: 'auth'
})
export default class index extends Base {
}
</script>

<style lang="scss" scoped>
</style>