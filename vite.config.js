import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/sass/site.scss', 'resources/js/common.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
