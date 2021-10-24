import { Meta, Story } from '@storybook/react'

import { Button as Component, ButtonProps } from './Button'

const Stories: Meta = {
  title: 'Button',
  component: Component
}

export default Stories

export const Button: Story<ButtonProps> = (arguments_) => (
  <Component {...arguments_} />
)
Button.args = { children: 'Get started' }
