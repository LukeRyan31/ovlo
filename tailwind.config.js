/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:     '#F5F0E8',
        parchment: '#EDE5D4',
        ink:       '#1A1714',
        smoke:     '#6B6560',
        copper: {
          DEFAULT: '#C4763A',
          light:   '#D4935A',
          dark:    '#A35F28',
        },
        chalk:     '#FDFBF7',
        graphite:  '#2E2A26',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
