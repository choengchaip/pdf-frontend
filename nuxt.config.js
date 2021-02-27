export default {
    server: {
        host: process.env.APP_HOST || '0.0.0.0',
        port: process.env.APP_PORT || 8000
    },
    env: {
        BASE_API: process.env.APP_BASE_API
    },
    head: {
        title: 'Test',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        script: [
            {
                src: 'https://kit.fontawesome.com/7b48b912fb.js',
                crossOrigin: 'anonymous'
            }
        ],
        link: [
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap'
            }
        ]
    },
    dir: {
        static: `static`
    },
    css: [`@/assets/scss/main.scss`],
    plugins: [
        {
            src: '@/plugins/ssr'
        }
    ],
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/composition-api'
    ],
    modules: [
        '@nuxtjs/toast',
        'cookie-universal-nuxt'
    ],
    build: {
        parallel: true,
        cache: true,
    },
}
