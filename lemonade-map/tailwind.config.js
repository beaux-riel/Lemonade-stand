/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lemonade: {
          yellow: {
            light: '#FFF9C4',
            DEFAULT: '#FFEB3B',
            dark: '#FBC02D',
          },
          pink: {
            light: '#F8BBD0',
            DEFAULT: '#F48FB1',
            dark: '#EC407A',
          },
          blue: {
            light: '#BBDEFB',
            DEFAULT: '#64B5F6',
            dark: '#1E88E5',
          },
        },
      },
      fontFamily: {
        'display': ['Fredoka One', 'Comic Sans MS', 'cursive'],
        'body': ['Nunito', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'playful': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 -2px 0 0 rgba(0, 0, 0, 0.1) inset',
        'playful-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 -4px 0 0 rgba(0, 0, 0, 0.1) inset',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
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
