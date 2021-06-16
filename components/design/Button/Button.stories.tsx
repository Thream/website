import { Meta, Story } from '@storybook/react'

import { Button } from './Button'

const ButtonStories: Meta = {
  title: 'Button',
  component: Button
}

export default ButtonStories

export const Main: Story = (args) => <Button {...args} />
Main.args = { children: 'Get started' }
