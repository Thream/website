const nextPWA = require('next-pwa')({
  disable: process.env.NODE_ENV !== 'production',
  dest: 'public'
})
const nextTranslate = require('next-translate')

/** @type {import("next").NextConfig} */
module.exports = nextTranslate(
  nextPWA({
    reactStrictMode: true,
    images: {
      domains: [
        'api.thream.divlo.fr',
        'thream-api.herokuapp.com',
        'file-uploads-api.thream.divlo.fr',
        ...(process.env.NODE_ENV !== 'production' ? ['localhost'] : [])
      ]
    }
  })
)
