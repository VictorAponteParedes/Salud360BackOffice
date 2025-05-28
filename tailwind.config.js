/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: { 
      colors: {
        blue: '#4d58ff', 
        primary: {
          50: '#f4f7fb',
          100: '#e7f0f7',
          200: '#cbdeec',
          300: '#9cc3dd',
          400: '#67a3c9',
          500: '#4488b3',
          600: '#336c96',
          700: '#2a587a',
          800: '#264b66',
          900: '#244056',
          950: '#182939',
        },
      },
    },
  },
  plugins: [],
};

