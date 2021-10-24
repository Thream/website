import { Meta, Story } from '@storybook/react'
import { user, userSettings } from '../../cypress/fixtures/users/user'

import { UserProfile as Component, UserProfileProps } from './UserProfile'

const Stories: Meta = {
  title: 'UserProfile',
  component: Component
}

export default Stories

export const UserProfile: Story<UserProfileProps> = (arguments_) => {
  return <Component {...arguments_} />
}
UserProfile.args = {
  user: {
    ...user,
    settings: userSettings
  }
}
