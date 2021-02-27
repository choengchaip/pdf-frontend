<template>
  <div class="flex w-screen h-screen">
    <Dialog/>
    <div class="flex flex-col w-64 h-full bg-blue-900" style="min-width: 256px;">
      <div class="image w-full flex justify-center px-8 py-6">
        <img class="h-14" src="/finema.svg" alt="Fenima">
      </div>
      <div class="menu flex-grow">
        <div :key="menu.title" v-for="menu in menus()">
          <MenuChild v-if="!menu.isHide" :menu="menu"/>
        </div>
      </div>
    </div>
    <div class="flex-grow h-full p-8 overflow-y-auto">
      <nuxt></nuxt>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import Config from "~/core/config";
import MenuChild from "~/layouts/components/MenuChild.vue";
import Dialog from "~/layouts/components/Dialog.vue";

@Component({
  components: {Dialog, MenuChild}
})
export default class Default extends Base {
  menus(): any[] {
    return Config.menus(this.$app.me.role)
  }

  mounted() {
    this.$app.saveToState('me', this.$app.cookies.get('me'))
  }
}
</script>

<style lang="scss" scoped>
</style>