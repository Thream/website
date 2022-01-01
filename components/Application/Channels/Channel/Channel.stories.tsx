import { Meta, Story } from '@storybook/react'
import { channelExample } from '../../../../cypress/fixtures/channels/channel'

import { Channel as Component, ChannelProps } from './Channel'

const Stories: Meta = {
  title: 'Channel',
  component: Component
}

export default Stories

export const Channel: Story<ChannelProps> = (arguments_) => {
  return <Component {...arguments_} />
}
Channel.args = { path: { channelId: 1, guildId: 1 }, channel: channelExample }
