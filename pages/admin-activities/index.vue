<template>
    <Activities/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import Activities from "~/features/admin-activities/Activities.vue";
@Component({
    components: {Activities}
})
export default class index extends Base {
}
</script>

<style lang="scss" scoped>
</style>