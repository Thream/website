import { Meta, Story } from '@storybook/react'

import { SendMessage as Component } from './SendMessage'

const Stories: Meta = {
  title: 'SendMessage',
  component: Component
}

export default Stories

export const SendMessage: Story = (arguments_) => {
  return <Component {...arguments_} />
}
SendMessage.args = {}
