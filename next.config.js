const withTranslate = require('next-translate')
const withPWA = require('next-pwa')

module.exports = withTranslate(
  withPWA({
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public'
    },
    images: {
      domains: [
        'api.thream.divlo.fr',
        ...(process.env.NODE_ENV === 'development' ? ['localhost'] : [])
      ]
    }
  })
)
