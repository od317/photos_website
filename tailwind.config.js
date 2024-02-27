/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        ...colors,
        ...{'main':'#ffffff',
        'secondary':'#e9e9e9',
        'theme':'#e60023',
        'hov':'#d4d4d4',
        'hov2':'#7d7d7d'
        }
      },
    },
  },
  plugins: [],
}

