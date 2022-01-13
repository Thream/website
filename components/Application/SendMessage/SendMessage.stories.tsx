import { Meta, Story } from '@storybook/react'

import { channelExample } from '../../../cypress/fixtures/channels/channel'
import { guildExample } from '../../../cypress/fixtures/guilds/guild'
import { SendMessage as Component, SendMessageProps } from './SendMessage'

const Stories: Meta = {
  title: 'SendMessage',
  component: Component
}

export default Stories

export const SendMessage: Story<SendMessageProps> = (arguments_) => {
  return <Component {...arguments_} />
}
SendMessage.args = {
  path: { channelId: channelExample.id, guildId: guildExample.id }
}
