import { addDecorator } from '@storybook/react'

import '../styles/global.css'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

addDecorator((story) => (
  <>
    <div id='preview-storybook'>{story()}</div>
  </>
))

import * as nextImage from 'next/image'

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />
})
