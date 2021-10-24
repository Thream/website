import { Meta, Story } from '@storybook/react'

import { Input, InputProps } from './Input'
import { AuthenticationForm } from '../../Authentication/AuthenticationForm'

const Stories: Meta = {
  title: 'Input',
  component: Input
}

export default Stories

const Template: Story<InputProps> = (arguments_) => (
  <AuthenticationForm>
    <Input {...arguments_} />
  </AuthenticationForm>
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
