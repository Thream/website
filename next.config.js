const withTranslate = require('next-translate')
const withPWA = require('next-pwa')

module.exports = withTranslate(
  withPWA({
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public'
    }
  })
)
