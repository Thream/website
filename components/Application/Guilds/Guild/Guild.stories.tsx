import { Meta, Story } from '@storybook/react'

import { Guild as Component, GuildProps } from './Guild'
import { guildExample } from '../../../../cypress/fixtures/guilds/guild'

const Stories: Meta = {
  title: 'Guild',
  component: Component
}

export default Stories

export const Guild: Story<GuildProps> = (arguments_) => {
  return <Component {...arguments_} />
}
Guild.args = {
  guild: {
    ...guildExample,
    defaultChannelId: 1
  }
}
