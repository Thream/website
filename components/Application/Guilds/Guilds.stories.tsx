import { Meta, Story } from '@storybook/react'

import { Guilds as Component, GuildsProps } from './'

const Stories: Meta = {
  title: 'Guilds',
  component: Component
}

export default Stories

export const Guilds: Story<GuildsProps> = (arguments_) => (
  <Component {...arguments_} />
)
Guilds.args = { path: { channelId: 1, guildId: 2 } }
