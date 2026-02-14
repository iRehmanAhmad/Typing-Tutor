/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--bg-primary)",
                card: "var(--card-bg)",
                accent: "var(--accent)",
                "accent-secondary": "var(--accent-secondary)",
                border: "var(--border)",
                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                    muted: "var(--text-muted)",
                }
            },
        },
    },
    plugins: [],
}
