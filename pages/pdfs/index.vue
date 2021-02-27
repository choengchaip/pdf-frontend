<template>
    <PDFs/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import PDFs from "~/features/pdfs/PDFs.vue";

@Component({
    components: {PDFs},
    middleware: 'auth'
})
export default class Index extends Base {
}
</script>

<style lang="scss" scoped>
</style>