import { Meta, Story } from '@storybook/react'

import { Header as Component } from '.'

const Stories: Meta = {
  title: 'Header',
  component: Component
}

export default Stories

export const Header: Story = (arguments_) => <Component {...arguments_} />
