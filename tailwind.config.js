/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        backgroundDark: '#121212',
        textDark: '#ffffff',
        backgroundLight: '#f5f5f5',
        textLight: '#333333',
      },
      fontFamily: {
        bodoni: ['"Bodoni Moda"', 'serif'],  
      },

      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}

