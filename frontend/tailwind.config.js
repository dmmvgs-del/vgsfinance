/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#0A5C80',
            50: '#F0F8FA',
            100: '#E0F1F6',
            200: '#B8E0ED',
            300: '#85C7DF',
            400: '#3D9EBF',
            500: '#0A5C80', // Logo primary blue
            600: '#084E6D',
            700: '#063D56',
            800: '#052C3E',
            900: '#041E2B',
            950: '#02121B',
          },
          green: {
            DEFAULT: '#6EA928',
            50: '#F4FAEB',
            100: '#E8F5D4',
            200: '#D2ECA9',
            300: '#B6E077',
            400: '#94CF45',
            500: '#6EA928', // Logo vibrant growth green
            600: '#5A8B1F',
            700: '#466E18',
            800: '#345212',
            900: '#263D0C',
          },
          navy: {
            DEFAULT: '#061D28',
            light: '#0A2B3C',
            dark: '#031118',
          }
        }
      }
    },
  },
  plugins: [],
}


