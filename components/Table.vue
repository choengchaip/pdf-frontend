<template>
  <table class="table-fixed rounded-lg overflow-hidden w-full">
    <thead>
    <tr>
      <th :class="`text-left capitalize bg-blue-800 text-white p-3 ${header.title === '' ? 'w-28' : ''}`"
          :key="header.title"
          v-for="header in options.headers">
        {{ header.title }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr :key="index" v-for="(rows, index) in options.rows">
      <td class="text-left truncate bg-gray-100 p-3" :key="rIndex" v-for="(row, rIndex) in rows">
        <div class="flex" v-if="isController(row.type)">
          <div @click="$emit('edit', options.rawData[index])"
               class="flex items-center justify-center w-8 h-8 bg-white rounded-full cursor-pointer mr-2">
            <i class="fas fa-edit text-blue-800"></i>
          </div>
          <div @click="$emit('delete', options.rawData[index])"
               class="flex items-center justify-center w-8 h-8 bg-white rounded-full cursor-pointer">
            <i class="fas fa-trash-alt"></i>
          </div>
        </div>
        <component v-if="isComponent(row.type)" v-bind="row.value.props" v-on="row.value.on"
                   :is="row.value.component"/>
        <fragment v-else-if="isText(row.type)">{{ row.value }}</fragment>
      </td>
    </tr>
    <tr>
      <td :colspan="options.headers.length">
        <div v-if="options.rows.length === 0" class="h-64 w-full flex items-center justify-center bg-gray-100">
          <h4 class="text-3xl text-gray-500">Empty</h4>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {Component, Prop, Watch} from "vue-property-decorator";
import Base from "~/core/base";
import InputText from "~/components/InputText.vue";

@Component({
  components: {InputText}
})
export default class Table extends Base {
  @Prop(Object) readonly options!: any

  search = ''
  range = ''

  isText(type: string) {
    return type === 'text'
  }

  isComponent(type: string) {
    return type === 'component'
  }

  isController(type: string) {
    return type === 'controller'
  }

  @Watch('search')
  onSearchChange() {
    this.$emit('search', this.search)
  }
}
</script>

<style lang="scss" scoped>
</style>