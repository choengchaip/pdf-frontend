<template>
    <div class="w-full flex flex-col h-full">
        <div class="w-2/6 mx-auto flex-grow flex flex-col justify-center">
            <h1 class="text-4xl mb-16 font-bold text-center">{{ isEdit ? 'Edit' : 'Create' }} User</h1>
            <InputText
                :isRequired="true"
                label="Username"
                placeholder="Username"
                :isHide="isEdit"
                v-model="username"/>
            <InputText
                :isRequired="true"
                label="Password"
                placeholder="Password"
                :isHide="isEdit"
                v-model="password"/>
            <InputText
                :isRequired="true"
                label="First Name"
                placeholder="First Name"
                v-model="firstName"/>
            <InputText
                :isRequired="true"
                label="Last Name"
                placeholder="Last Name"
                v-model="lastName"/>
            <InputDropdown
                :isRequired="true"
                label="Select Role"
                placeholder="Select Role"
                :options="roleOptions"
                v-model="role"/>
            <Button
                @click="onClick"
                :isLoading="userLoader.uploadStatus.isLoading"
                className="mt-16"
                title="Submit Form"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop} from "vue-property-decorator";
import Base from "~/core/base";
import InputText from "~/components/InputText.vue";
import InputDropdown from "~/components/InputDropdown.vue";
import {PageLoader} from "~/loader/page";
import Config from "~/core/config";
import Button from "~/components/Button.vue";

@Component({
    components: {
        InputText,
        InputDropdown,
        Button
    }
})
export default class Form extends Base {
    @Prop(Boolean) readonly isEdit!: boolean

    username: string = ''
    password: string = ''
    firstName: string = ''
    lastName: string = ''
    role: string = ''

    created() {
        this.userLoader.initial()
    }

    mounted() {
        if (this.isEdit) {
            this.userLoader.$get(this.$route.params.id)
        }
    }

    get roleOptions(): any[] {
        return [
            {
                label: 'User',
                value: 'USER'
            },
            {
                label: 'Signer',
                value: 'SIGNER'
            },
            {
                label: 'Admin',
                value: 'ADMIN'
            }
        ]
    }

    onClick() {
        if (this.isEdit) {
            this.userLoader.$update(this.$route.params.id, {
                first_name: this.firstName,
                last_name: this.lastName,
                role: this.role
            })
        } else {
            this.userLoader.$add({
                username: this.username,
                password: this.password,
                first_name: this.firstName,
                last_name: this.lastName,
                role: this.role
            })
        }
    }

    get userLoader(): PageLoader {
        return new PageLoader(this, (data: any) => ({
            baseURL: Config.BASE_API('/users'),
            baseFind: Config.BASE_API(`/user/${data?.id}`),
            baseAdd: Config.BASE_API('/user'),
            baseUpdate: Config.BASE_API(`/user/${data?.id}/update`),
            stateKey: 'users',
            onFindSuccess: (newValue) => {
                this.firstName = this.userLoader.findItem.first_name
                this.lastName = this.userLoader.findItem.last_name
                this.role = this.userLoader.findItem.role
            },
            onUpdateSuccess: (newValue) => {
                this.$toast.success("Update User Success").goAway(1000)
            },
            onAddSuccess: (newValue) => {
                this.$router.push({
                    path: `/admin-users/${this.userLoader.addItem.user_id}/edit`
                })
            }
        }))
    }
}
</script>

<style lang="scss" scoped>
</style>