<template>
    <AdminPDFs/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import AdminPDFs from "~/features/admin-pdfs/AdminPDFs.vue";
@Component({
    components: {AdminPDFs}
})
export default class Index extends Base {
}
</script>

<style lang="scss" scoped>
</style>