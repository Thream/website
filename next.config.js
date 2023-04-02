const nextPWA = require('next-pwa')({
  disable: process.env.NODE_ENV !== 'production',
  dest: 'public'
})
const nextTranslate = require('next-translate-plugin')

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    domains: [
      'api.thream.divlo.fr',
      'file-uploads-api.thream.divlo.fr',
      ...(process.env.NODE_ENV !== 'production' ? ['127.0.0.1'] : [])
    ]
  }
}

module.exports = nextTranslate(nextPWA(nextConfig))
