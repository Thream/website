import { Meta, Story } from '@storybook/react'

import { Emoji as Component, EmojiProps } from './Emoji'

const Stories: Meta = {
  title: 'Emoji',
  component: Component
}

export default Stories

export const Emoji: Story<EmojiProps> = (arguments_) => {
  return <Component {...arguments_} />
}
Emoji.args = { value: ':wave:', size: 20 }
