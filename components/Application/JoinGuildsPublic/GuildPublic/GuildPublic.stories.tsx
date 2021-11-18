import { Meta, Story } from '@storybook/react'

import { GuildPublic as Component, GuildPublicProps } from './GuildPublic'
import { guildExample } from '../../../../cypress/fixtures/guilds/guild'

const Stories: Meta = {
  title: 'GuildPublic',
  component: Component
}

export default Stories

export const GuildPublic: Story<GuildPublicProps> = (arguments_) => {
  return <Component {...arguments_} />
}
GuildPublic.args = {
  guild: {
    ...guildExample,
    membersCount: 1
  }
}
