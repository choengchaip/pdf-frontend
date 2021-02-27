<template>
    <div class="flex w-screen h-screen">
        <div class="flex-50-p h-full bg-blue-900 px-32 pb-6 flex items-center">
            <img class="w-full" src="/finema.svg" alt="Finema">
        </div>
        <div class="flex-50-p h-full flex flex-col justify-center justify-center px-20">
            <InputText
                :isRequired="true"
                label="Email"
                placeholder="Email"
                v-model="username"/>
            <InputText
                :isRequired="true"
                label="Password"
                placeholder="Password"
                v-model="password"/>
            <Button
                @click="onClick"
                :isLoading="loginLoader.addStatus.isLoading"
                className="mt-8"
                title="Login"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import InputText from "~/components/InputText.vue";
import Button from "~/components/Button.vue";
import {ObjectLoader} from "~/loader/object";
import Config from "~/core/config";
import Base from "~/core/base";

@Component({
    components: {Button, InputText},
    layout: 'none'
})
export default class Login extends Base {
    username = ''
    password = ''

    created() {
        this.loginLoader.initial()
    }

    get loginLoader(): ObjectLoader {
        return new ObjectLoader(this, (data: any) => ({
            baseURL: Config.BASE_API('/me'),
            baseAdd: Config.BASE_API('/login'),
            cookieKey: 'me',
            onAddSuccess: (newValue => {
                this.$app.replaceState('me', this.loginLoader.addItem)
                this.$router.push({
                    path: '/'
                })
            })
        }))
    }

    onClick() {
        this.loginLoader.$add({
            username: this.username,
            password: this.password
        })
    }
}
</script>

<style lang="scss" scoped>
</style>