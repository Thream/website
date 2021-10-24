import { Meta, Story } from '@storybook/react'

import { Messages as Component } from './'

const Stories: Meta = {
  title: 'Messages',
  component: Component
}

export default Stories

export const Messages: Story = (arguments_) => <Component {...arguments_} />
