<template>
    <Users/>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import Users from "~/features/users/Users.vue";
@Component({
    components: {Users},
    middleware: 'auth'
})
export default class Index extends Base {
}
</script>

<style lang="scss" scoped>
</style>