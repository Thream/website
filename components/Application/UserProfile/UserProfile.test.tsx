import { render } from '@testing-library/react'

import {
  userExample,
  userSettingsExample
} from '../../../cypress/fixtures/users/user'
import { UserProfile } from './UserProfile'

describe('<UserProfile />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserProfile user={{ ...userExample, settings: userSettingsExample }} />
    )
    expect(baseElement).toBeTruthy()
  })
})
