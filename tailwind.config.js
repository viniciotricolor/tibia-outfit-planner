/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tibia: {
          dark: '#1a1a2e',
          darker: '#0f0f1a',
          accent: '#e94560',
          gold: '#f4d03f',
          green: '#27ae60',
          blue: '#3498db',
        }
      }
    },
  },
  plugins: [],
}
