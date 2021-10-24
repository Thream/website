import { Meta, Story } from '@storybook/react'

import { Loader as Component, LoaderProps } from './Loader'

const Stories: Meta = {
  title: 'Loader',
  component: Component
}

export default Stories

export const Loader: Story<LoaderProps> = (arguments_) => (
  <Component {...arguments_} />
)
