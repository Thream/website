module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '380px'
      },
      colors: {
        black: '#212121',
        success: '#45C85A',
        error: '#C84545'
      },
      boxShadow: {
        dark: '0px 1px 10px hsla(0, 0%, 100%, 0.2)',
        light: '0px 1px 10px rgba(0, 0, 0, 0.25)',
        darkFlag: '0px 1px 10px hsla(0, 0%, 100%, 0.2)',
        lightFlag: '0px 1px 10px rgba(0, 0, 0, 0.25)',
        green: '0 0 0 2px #27b05e',
        success: '0 2px 8px rgba(70, 200, 92, 0.3)',
        error: '0 2px 8px rgba(200, 69, 69, 0.5)'
      },
      fontFamily: {
        headline: "'Montserrat', 'Arial', 'sans-serif'",
        paragraph: "'Roboto', 'Arial', 'sans-serif'"
      }
    }
  },
  plugins: []
}
