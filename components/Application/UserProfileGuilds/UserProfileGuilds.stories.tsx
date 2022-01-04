import { Meta, Story } from '@storybook/react'

import {
  UserProfileGuilds as Component,
  UserProfileGuildsProps
} from './UserProfileGuilds'

const Stories: Meta = {
  title: 'UserProfileGuilds',
  component: Component
}

export default Stories

export const UserProfileGuilds: Story<UserProfileGuildsProps> = (
  arguments_
) => {
  return <Component {...arguments_} />
}
UserProfileGuilds.args = { className: 'text-center' }
