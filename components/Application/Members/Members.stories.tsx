import { Meta, Story } from '@storybook/react'

import { Members as Component } from './Members'

const Stories: Meta = {
  title: 'Members',
  component: Component
}

export default Stories

export const Members: Story = (arguments_) => {
  return <Component {...arguments_} />
}
