<template>
  <div>
    <h1 class="text-4xl mb-10 font-bold">My PDFs</h1>
    <div class="w-full flex justify-start">
      <InputText
          width="w-64"
          class="mr-3"
          placeholder="Search"
          v-model="search"/>
      <VueCtkDateTimePicker
          range
          label="Upload date"
          title="Upload date"
          locale="en"
          format="YYYY-MM-DDThh:mm:ss+07:00"
          v-model="uploadRange"/>
      <VueCtkDateTimePicker
          range
          label="Search"
          title="Expire date"
          locale="en"
          format="YYYY-MM-DDThh:mm:ss+07:00"
          v-model="expireRange"/>
    </div>
    <Table :options="tableOptions"/>
  </div>
</template>

<script lang="ts">
import {Component, Watch} from "vue-property-decorator";
import Base from "~/core/base";
import {PageLoader} from "~/loader/page";
import Config from "~/core/config";
import Table from "~/components/Table.vue";
import InputText from "~/components/InputText.vue";
import {_get} from "~/utils/lodash";
import TimeHelper from "~/utils/TimeHelper";

@Component({
  components: {Table, InputText}
})
export default class PDFs extends Base {
  search = ''
  uploadRange: any = null
  expireRange: any = null

  created() {
    this.pdfLoader.initial()
  }

  mounted() {
    this.pdfLoader.$fetch()
  }

  get tableOptions() {
    return {
      headers: [
        {
          title: 'name'
        },
        {
          title: 'approver'
        },
        {
          title: 'status'
        },
        {
          title: 'expire at'
        }
      ],
      rows: this.pdfLoader.fetchItems.map((item) => ([
        {
          type: 'text',
          value: item.file_name
        },
        {
          type: 'text',
          value: item.approver_id
        },
        {
          type: 'text',
          value: item.status
        },
        {
          type: 'text',
          value: TimeHelper.ToFormattedDate(item.expire_at)
        }
      ])),
      rawData: this.pdfLoader.fetchItems
    }
  }

  get pdfLoader(): PageLoader {
    return new PageLoader(this, (data: any) => ({
      baseURL: Config.BASE_API('/upload-pdfs'),
      stateKey: 'pdfs'
    }))
  }

  @Watch('uploadRange')
  onUplRangeChange() {
    this.onSearch()
  }

  @Watch('expireRange')
  onExpRangeChange() {
    this.onSearch()
  }

  onSearch() {
    const q = this.search
    const uStart = this.uploadRange?.start
    const uEnd = this.uploadRange?.end
    const eStart = this.expireRange?.start
    const eEnd = this.expireRange?.end

    this.pdfLoader.$fetch(q, {
      params: {
        ...(uStart && {upload_at_start: uStart}),
        ...(uEnd && {upload_at_end: uEnd}),
        ...(eStart && {expire_at_start: eStart}),
        ...(eEnd && {expire_at_end: eEnd}),
      }
    })
  }

  @Watch('search')
  onSearchChange() {
    this.onSearch()
  }
}
</script>

<style lang="scss" scoped>
.date-time-picker {
  height: fit-content !important;
  margin-top: 5px;
  width: 256px;
  margin-left: 0;
  margin-right: 0.75rem;
}
</style>