import { Meta, Story } from '@storybook/react'

import { Textarea as Component, TextareaProps } from './Textarea'

const Stories: Meta = {
  title: 'Textarea',
  component: Component
}

export default Stories

export const Textarea: Story<TextareaProps> = (arguments_) => {
  return <Component {...arguments_} />
}
Textarea.args = { label: 'Textarea' }
