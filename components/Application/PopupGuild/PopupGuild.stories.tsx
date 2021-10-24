import { Meta, Story } from '@storybook/react'

import { PopupGuild as Component, PopupGuildProps } from './PopupGuild'

const Stories: Meta = {
  title: 'PopupGuild',
  component: Component
}

export default Stories

export const PopupGuild: Story<PopupGuildProps> = (arguments_) => {
  return <Component {...arguments_} />
}
PopupGuild.args = {}
