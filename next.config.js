const nextTranslate = require('next-translate-plugin')

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    domains: [
      'api.thream.theoludwig.fr',
      'file-uploads-api.theoludwig.fr',
      ...(process.env.NODE_ENV !== 'production' ? ['127.0.0.1'] : [])
    ]
  }
}

module.exports = nextTranslate(nextConfig)
