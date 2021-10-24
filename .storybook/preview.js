import { addDecorator } from '@storybook/react'
import I18nProvider from 'next-translate/I18nProvider'

import i18n from '../i18n.json'
import common from '../locales/en/common.json'
import authentication from '../locales/en/authentication.json'
import application from '../locales/en/application.json'

import '../styles/global.css'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

addDecorator((story) => (
  <I18nProvider
    lang='en'
    namespaces={{
      common,
      authentication,
      application
    }}
    config={i18n}
  >
    <div id='preview-storybook'>{story()}</div>
  </I18nProvider>
))

import * as nextImage from 'next/image'

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />
})
