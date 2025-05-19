/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounceFast: 'bounce 0.5s',
        pulseOnce: 'pulse 0.6s ease-in-out 1',
      },
    },
  },
  plugins: [],
}
