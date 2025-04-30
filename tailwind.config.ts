import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/**/*.{html,ts}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#2563eb',   // Tailwind blue-600 (ή βάλε ό,τι θες)
                    success: '#10b981',
                    warning: '#facc15',
                    danger: '#ef4444',
                    light: '#f1f5f9',
                },
            },
        },
    },
    plugins: [],
} satisfies Config
