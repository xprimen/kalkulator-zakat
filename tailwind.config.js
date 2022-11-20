/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        fkBlue: '#1100db',
        fkGreen: '#648830',
      },
      textColor: {
        fkBlue: '#1100db',
        fkGreen: '#648830',
      },
      ringColor: {
        fkBlue: '#1100db',
        fkGreen: '#648830',
      },
      borderColor: {
        fkBlue: '#1100db',
        fkGreen: '#648830',
      },
      listStyleType: {
        square: 'square',
        roman: 'upper-roman',
        circle: 'circle',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

