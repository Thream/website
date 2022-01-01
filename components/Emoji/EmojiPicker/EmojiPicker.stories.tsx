import { Meta, Story } from '@storybook/react'

import { EmojiPicker as Component, EmojiPickerProps } from './EmojiPicker'

const Stories: Meta = {
  title: 'EmojiPicker',
  component: Component
}

export default Stories

export const EmojiPicker: Story<EmojiPickerProps> = (arguments_) => {
  return <Component {...arguments_} />
}
EmojiPicker.args = { onClick: (emoji, event) => console.log(emoji, event) }
