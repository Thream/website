const nextPWA = require('next-pwa')
const nextTranslate = require('next-translate')

module.exports = nextTranslate(
  nextPWA({
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public'
    }
  })
)
