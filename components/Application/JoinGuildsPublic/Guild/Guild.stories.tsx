import { Meta, Story } from '@storybook/react'

import { Guild as Component, GuildProps } from './Guild'

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
    id: 1,
    name: 'GuildExample',
    description: 'guild example.',
    icon: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    membersCount: 1
  }
}
