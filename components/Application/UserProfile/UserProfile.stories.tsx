import { Meta, Story } from '@storybook/react'
import {
  userExample,
  userSettingsExample
} from '../../../cypress/fixtures/users/user'

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
    ...userExample,
    settings: userSettingsExample
  }
}
