/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

module.exports = {
  mode:'jit',
  darkMode: 'class',
  content: [
    './index.html',
     './src/App.vue',
    './src/assets/base.css',
    './src/**/*.{vue,js}'
  ],
  theme: {
    extend: {
      animation: {
        'bg':'bg 2s ease-in-out infinite',
        'path':'path 1s ease-in-out'
    },
      keyframes: {
        'bg': {
            '0%': {
                'background-color': 'rgba(25,25,25)'
            },
            '50%': {
              'background-color': 'rgba(50, 50, 50)'
            },'100%': {
              'background-color': 'rgba(25,25,25)'
            },
        },
        'path':{
          '0%':{
            'stroke-dashoffset': '0',
            'stroke-dasharray': '50',

          },
          '100%':{
            'stroke-dashoffset': '50',
            'stroke-dasharray': '50',
          }
        }
    },
      colors:{
        light1:'#E8F6EF',
        light2:'#1B9C85',
        dark1:'#202020',
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
      }
    },
  },
  plugins: [],
}
