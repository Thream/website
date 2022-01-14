import { Meta, Story } from '@storybook/react'

import {
  userExample,
  userSettingsExample
} from '../../../cypress/fixtures/users/user'
import { UserSettings as Component, UserSettingsProps } from './UserSettings'

const Stories: Meta = {
  title: 'UserSettings',
  component: Component
}

export default Stories

export const UserSettings: Story<UserSettingsProps> = (arguments_) => {
  return <Component {...arguments_} />
}
UserSettings.args = { user: { ...userExample, settings: userSettingsExample } }
