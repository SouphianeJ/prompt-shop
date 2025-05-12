/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#4A90E2',
        'neon-green': '#39FF14',
        'dark-gray': '#333333',
        'light-gray': '#D3D3D3',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};