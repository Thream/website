import { render } from '@testing-library/react'

import {
  guildExample,
  guildExample2
} from '../../../cypress/fixtures/guilds/guild'
import {
  userExample,
  userSettingsExample
} from '../../../cypress/fixtures/users/user'
import { UserProfile } from './UserProfile'

describe('<UserProfile />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserProfile
        user={{ ...userExample, settings: userSettingsExample }}
        guilds={[guildExample, guildExample2]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
