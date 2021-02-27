<template>
    <div>
        <h1 class="text-4xl mb-10 font-bold">Users</h1>
        <div class="flex justify-end">
            <Button
                @click="onCreate"
                className="mb-6 w-32"
                title="Create User"/>
        </div>
        <Table @edit="onEdit" @delete="onDelete" :options="tableOptions"/>
    </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import {PageLoader} from "~/loader/page";
import Config from "~/core/config";
import Table from "~/components/Table.vue";
import Button from "~/components/Button.vue";
import TimeHelper from "~/utils/TimeHelper";

@Component({
    components: {
        Button,
        Table
    }
})
export default class Users extends Base {
    created() {
        this.userLoader.initial()
    }

    mounted() {
        this.userLoader.$fetch()
    }

    onCreate() {
        this.$router.push({
            path: 'admin-users/create'
        })
    }

    onEdit(data) {
        this.$router.push({
            path: `admin-users/${data.user_id}/edit`
        })
    }

    onDelete(data) {
        this.$app.$dialogShow({
            header: 'Delete Confirm ?', onConfirm: () => {
                this.userLoader.$delete(data.user_id)
            }
        })
    }

    get tableOptions() {
        return {
            headers: [
                {
                    title: 'first name'
                },
                {
                    title: 'last name'
                },
                {
                    title: 'role'
                },
                {
                    title: 'created at'
                },
                {
                    title: ''
                }
            ],
            rows: this.userLoader.fetchItems.map((item) => ([
                {
                    type: 'text',
                    value: item.first_name
                },
                {
                    type: 'text',
                    value: item.last_name
                },
                {
                    type: 'text',
                    value: item.role
                },
                {
                    type: 'text',
                    value: TimeHelper.ToFormattedDate(item.created_at)
                },
                {
                    type: 'controller',
                    value: ''
                }
            ])),
            rawData: this.userLoader.fetchItems
        }
    }

    get userLoader(): PageLoader {
        return new PageLoader(this, (data: any) => ({
            baseURL: Config.BASE_API('/users'),
            baseDelete: Config.BASE_API(`/user/${data?.id}/delete`),
            stateKey: 'users',
            onDeleteSuccess: (newValue) => {
                this.userLoader.$fetch()
            }
        }))
    }
}
</script>

<style lang="scss" scoped>
</style>