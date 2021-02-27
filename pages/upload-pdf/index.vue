<template>
    <UploadPDF/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import UploadPDF from "~/features/upload-pdf/UploadPDF.vue";

@Component({
    components: {UploadPDF},
    middleware: 'auth'
})
export default class Index extends Base {
}
</script>

<style lang="scss" scoped>
</style>