// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '') // همه‌ی env را بخوان

    return {
        base: '/', // اگر CDN/ساب‌پث داری، اینجا ست کن
        plugins: [react()],
        build: {
            sourcemap: false, // یا 'hidden' برای آپلود خصوصی به Sentry
            target: 'es2019', // خروجی مدرن‌تر/کوچک‌تر (بر اساس نیاز)
        },
        server: {
            port: Number(env.PORT || 5173),
            open: false,
            https: false,
        },
    }
})
