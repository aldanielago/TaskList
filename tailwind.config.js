/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", './index.html'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2C7FFF',
        'blue-hover': '#00a6fb',
        'light-blue': '#B4C4FF',
        'very-light-blue': '#D7DDFD',
        'light-yellow': '#FFF57F',
        'very-light-yellow': '#FCEFC2',
        'light-green': '#308D60',
        'very-light-green': '#41B378',
        'light-pink': '#ffc0f5',
        'very-light-pink': '#eeaae3',
        'menta': '#addccc',
        'light-menta': '#cff3e9',
        'light-purple': '#f9defd',
        'very-light-purple': '#fceeff',
        'gray-font': '#707084',
        // light theme
        'secondary-light': '#F4F7FF',
        //dark theme
        'secondary-dark': '#2D2D2D',
        'back-dark': '#1e1e1e',
      },
      fontFamily: {
        'Quicksand': 'Quicksand' || 'sans-serif'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate global styles
    })
  ],
}

