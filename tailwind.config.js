/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: '#E9A3C7',
          light: '#F5CCE1',
          hover: '#DE8BB6',
          dark: '#CF6D9F',
        },
        softPink: {
          DEFAULT: '#F7DCEB',
          light: '#FFF5FA',
          surface: '#FDF4F8',
          border: '#F0C9DF',
        },
        nearBlack: {
          DEFAULT: '#18151D',
          surface: '#231F2A',
          subtle: '#363040',
        },
        brandPurple: {
          DEFAULT: '#7851A9',
          hover: '#654091',
          light: '#9B7AC7',
          faint: '#F2EDF8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-pink': '0 4px 20px -2px rgba(233, 163, 199, 0.25)',
        'soft-purple': '0 4px 20px -2px rgba(120, 81, 169, 0.2)',
        'premium': '0 10px 30px -5px rgba(24, 21, 29, 0.06), 0 4px 10px -2px rgba(233, 163, 199, 0.1)',
      }
    },
  },
  plugins: [],
}
