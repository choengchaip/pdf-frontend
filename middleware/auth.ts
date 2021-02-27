import {Middleware} from '~/node_modules/@nuxt/types'

const auth: Middleware = async (ctx) => {
    if (!ctx.app.$app.me.token && !ctx.app.$cookies.get('me')?.token) {
        return ctx.redirect(`/login`, {
            ...(ctx.route.path && ctx.route.path !== '/' && {redirect: ctx.route.path})
        })
    }
}

export default auth
