<template>
    <Form :isEdit="false"/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import Form from "~/features/users/Form.vue";

@Component({
    components: {
        Form
    }
})
export default class create extends Base {
}
</script>

<style lang="scss" scoped>
</style>