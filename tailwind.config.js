/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", './index.html'],
  theme: {
    extend: {
      colors: {
        'pblue-500': '#2C7FFF',
        'pblue-300': '#00a6fb',
        'pblue-100': '#B4C4FF',
        'pblue-50': '#D7DDFD',
        'pyellow-300': '#FFF57F',
        'pyellow-100': '#FCEFC2',
        'pgreen-600': '#308D60',
        'pgreen-300': '#41B378',
        'ppink-100': '#ffc0f5',
        'ppink-200': '#eeaae3',
        'menta-200': '#addccc',
        'menta-100': '#cff3e9',
        'ppurple-200': '#f9defd',
        'ppurple-100': '#fceeff',
        'pgray-700': '#707084',
        // light theme
        'pgray-100': '#F4F7FF',
        //dark theme
        'pdark-800': '#2D2D2D',
        'pdark-900': '#1e1e1e',
      },
      fontFamily: {
        'Quicksand': 'Quicksand' || 'sans-serif',
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}

