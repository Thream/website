import { Meta, Story } from '@storybook/react'

import { Channels as Component, ChannelsProps } from './'

const Stories: Meta = {
  title: 'Channels',
  component: Component
}

export default Stories

export const Channels: Story<ChannelsProps> = (arguments_) => (
  <Component {...arguments_} />
)
Channels.args = { path: { channelId: 1, guildId: 2 } }
