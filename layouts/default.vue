<template>
  <div class="flex flex-col md:flex-row w-screen h-screen">
    <Dialog/>
    <div class="hidden md:flex flex-col w-64 h-full bg-blue-900" style="min-width: 256px;">
      <div class="image w-full flex justify-center px-8 py-6">
        <img class="h-14" src="/finema.svg" alt="Fenima">
      </div>
      <div class="menu flex-grow">
        <div :key="menu.title" v-for="menu in menus()">
          <MenuChild v-if="!menu.isHide" :menu="menu"/>
        </div>
      </div>
    </div>
    <div :class="`flex md:hidden relative h-16 bg-blue-900`">
      <i @click="isExpand = !isExpand"
         :class="`fas fa-bars absolute left-8 text-white cursor-pointer top-1/2 transition-all duration-700 -translate-y-1/2 transform ${isExpand ? 'rotate-90' : 'rotate-0'}`"></i>
      <img class="mx-auto py-2" src="/finema.svg" alt="Fenima">
      <div
          :class="`absolute md:hidden h-screen w-screen bg-white left-0 pt-4 transition-all overflow-hidden duration-700 ${isExpand ? 'max-h-72 shadow-lg' : 'max-h-0'}`"
          style="top: 4rem; z-index: 9;">
        <div class="px-6 mb-4 flex flex-col" :key="menu.title" v-for="menu in menus().filter((m)=>!m.isHide)">
          <h6 class="text-xl font-bold">{{ menu.title }}</h6>
          <NuxtLink :to="child.to" class="px-6 mb-2" v-for="child in menu.children">
            {{ child.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex-grow h-full p-8 overflow-y-auto">
      <nuxt></nuxt>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Watch} from "vue-property-decorator";
import Base from "~/core/base";
import Config from "~/core/config";
import MenuChild from "~/layouts/components/MenuChild.vue";
import Dialog from "~/layouts/components/Dialog.vue";

@Component({
  components: {Dialog, MenuChild}
})
export default class Default extends Base {
  isExpand = false

  menus(): any[] {
    return Config.menus(this.$app.me.role)
  }

  mounted() {
    this.$app.saveToState('me', this.$app.cookies.get('me'))
  }

  @Watch('$route.path')
  onPathChange() {
    this.isExpand = false
  }
}
</script>

<style lang="scss" scoped>
</style>