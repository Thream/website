import { Meta, Story } from '@storybook/react'

import { Checkbox as Component, CheckboxProps } from './Checkbox'

const Stories: Meta = {
  title: 'Checkbox',
  component: Component
}

export default Stories

export const Checkbox: Story<CheckboxProps> = (arguments_) => {
  return <Component {...arguments_} />
}
Checkbox.args = { label: 'Checkbox' }
