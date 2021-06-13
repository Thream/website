module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '380px'
      },
      colors: {
        black: '#212121'
      },
      boxShadow: {
        dark: '0px 1px 10px hsla(0, 0%, 100%, 0.2)',
        light: '0px 1px 10px rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        headline: ['Montserrat', 'Arial', 'sans-serif'],
        paragraph: ['Roboto', 'Arial', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
