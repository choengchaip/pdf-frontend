<template>
    <div>
        <h1 class="text-4xl mb-10 font-bold">Admin PDFs</h1>
        <Table @edit="onEdit" :options="tableOptions"/>
    </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import {PageLoader} from "~/loader/page";
import Config from "~/core/config";
import Table from "~/components/Table.vue";
import TimeHelper from "~/utils/TimeHelper";

@Component({
    components: {
        Table
    }
})
export default class AdminPDFs extends Base {
    created() {
        this.pdfLoader.initial()
    }

    mounted() {
        this.pdfLoader.$fetch()
    }

    onEdit(data) {

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
                    title: 'upload at'
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
                    value: TimeHelper.ToFormattedDate(item.upload_at)
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
            baseURL: Config.BASE_API(`/upload-pdfs`),
            stateKey: 'admin_pdfs',
        }))
    }
}
</script>

<style lang="scss" scoped>
</style>