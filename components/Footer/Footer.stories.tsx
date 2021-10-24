import { Meta, Story } from '@storybook/react'

import { Footer as Component, FooterProps } from './'

const Stories: Meta = {
  title: 'Footer',
  component: Component
}

export default Stories

export const Footer: Story<FooterProps> = (arguments_) => (
  <Component {...arguments_} />
)
Footer.args = { version: '1.0.0' }
