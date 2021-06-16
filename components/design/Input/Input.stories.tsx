import { Meta, Story } from '@storybook/react'

import { Input, InputProps } from './Input'

const Stories: Meta = {
  title: 'Input',
  component: Input
}

export default Stories

const Template: Story<InputProps> = (args) => (
  <div className='w-4/6 max-w-xs'>
    <Input {...args} />
  </div>
)

export const Text = Template.bind({})
Text.args = { label: 'Text', name: 'text', type: 'text' }

export const Password = Template.bind({})
Password.args = { label: 'Password', name: 'password', type: 'password' }

export const Error = Template.bind({})
Error.args = {
  label: 'Error',
  type: 'text',
  error: 'Oops, this field is required 🙈.'
}
