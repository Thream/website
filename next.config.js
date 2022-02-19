const nextPWA = require('next-pwa')
/** @type {any} */
const nextTranslate = require('next-translate')
const { createSecureHeaders } = require('next-secure-headers')

/** @type {import("next").NextConfig} */
module.exports = nextTranslate(
  nextPWA({
    images: {
      domains: [
        'api.thream.divlo.fr',
        ...(process.env.NODE_ENV !== 'production' ? ['localhost'] : [])
      ]
    },
    reactStrictMode: true,
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public'
    },
    headers() {
      return [
        {
          source: '/:path*',
          headers: createSecureHeaders({
            contentSecurityPolicy: {
              directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ['*', 'data:', 'blob:'],
                mediaSrc: ['*', 'data:', 'blob:'],
                connectSrc: '*',
                objectSrc: "'none'",
                fontSrc: "'self'",
                baseURI: "'none'"
              }
            }
          })
        }
      ]
    }
  })
)
