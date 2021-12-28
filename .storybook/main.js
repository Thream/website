const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  staticDirs: ['../public'],
  stories: ['../components/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-postcss',
    'storybook-tailwind-dark-mode'
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\,css&/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [require('tailwindcss'), require('autoprefixer')]
          }
        }
      ],
      include: path.resolve(__dirname, '../')
    })
    return config
  }
}
