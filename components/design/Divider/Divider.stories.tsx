import { Meta, Story } from '@storybook/react'

import { Divider as Component } from './'

const Stories: Meta = {
  title: 'Divider',
  component: Component
}

export default Stories

export const Divider: Story = (arguments_) => <Component {...arguments_} />
