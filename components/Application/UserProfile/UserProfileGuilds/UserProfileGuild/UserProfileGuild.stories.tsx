import { Meta, Story } from '@storybook/react'

import {
  UserProfileGuild as Component,
  UserProfileGuildProps
} from './UserProfileGuild'

const Stories: Meta = {
  title: 'UserProfileGuild',
  component: Component
}

export default Stories

export const UserProfileGuild: Story<UserProfileGuildProps> = (arguments_) => {
  return <Component {...arguments_} />
}
UserProfileGuild.args = { className: 'text-center' }
