<template>
    <div>
        <h1 class="text-4xl mb-10 font-bold">Activities</h1>
        <Table :options="tableOptions"/>
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
export default class Activities extends Base {
    created() {
        this.activityLoader.initial()
    }

    mounted() {
        this.activityLoader.$fetch('', {
            params: {
                limit: 100
            }
        })
    }

    get tableOptions() {
        return {
            headers: [
                {
                    title: 'user'
                },
                {
                    title: 'action'
                },
                {
                    title: 'action at'
                },
                {
                    title: 'database name'
                },
                {
                    title: 'collection name'
                },
            ],
            rows: this.activityLoader.fetchItems.map((item) => ([
                {
                    type: 'text',
                    value: `${item.first_name} ${item.last_name}`
                },
                {
                    type: 'text',
                    value: item.action
                },
                {
                    type: 'text',
                    value: TimeHelper.ToFormattedDate(item.action_date)
                },
                {
                    type: 'text',
                    value: item.database_name
                },
                {
                    type: 'text',
                    value: item.collection_name
                }
            ])),
            rawData: this.activityLoader.fetchItems
        }
    }

    get activityLoader(): PageLoader {
        return new PageLoader(this, (data: any) => ({
            baseURL: Config.BASE_API(`/activity-logs`),
            stateKey: 'admin_activities',
        }))
    }
}
</script>

<style lang="scss" scoped>
</style>