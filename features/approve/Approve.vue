<template>
  <div>
    <h1 class="text-4xl mb-10 font-bold">Approve PDF</h1>
    <Table :options="tableOptions"/>
  </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import {PageLoader} from "~/loader/page";
import Config from "~/core/config";
import Table from "~/components/Table.vue";
import ApproveController from "~/features/approve/ApproveController.vue";
import TimeHelper from "~/utils/TimeHelper";

@Component({
  components: {
    Table
  }
})
export default class Approve extends Base {
  created() {
    this.pdfLoader.initial()
  }

  mounted() {
    this.pdfLoader.$fetch()
  }

  onApprove(data) {
    this.$app.$dialogShow({
      header: 'Approve ?', onConfirm: () => {
        this.pdfLoader.$update(data.file_alias, {
          user_id: this.$app.me.user_id
        })
      }
    })
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
          title: 'expire_at'
        },
        {
          title: ''
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
        },
        {
          type: 'component',
          value: {
            component: ApproveController,
            props: {
              fileName: item.file_name
            },
            on: {
              approve: () => {
                this.onApprove(item)
              },
              download: () => {
                const w: any = window.open(Config.BASE_API(`/download-pdf/${item.file_alias}`), '_blank')
                w.focus()
              }
            }
          }
        }
      ])),
      rawData: this.pdfLoader.fetchItems
    }
  }

  get pdfLoader(): PageLoader {
    return new PageLoader(this, (data: any) => ({
      baseURL: Config.BASE_API(`/upload-pdfs?approver_id=${this.$app?.me?.user_id}`),
      baseUpdate: Config.BASE_API(`/approve-pdf/${data?.id}`),
      stateKey: 'approve',
      onUpdateSuccess: (newValue) => {
        this.pdfLoader.$fetch()
      }
    }))
  }
}
</script>

<style lang="scss" scoped>
</style>