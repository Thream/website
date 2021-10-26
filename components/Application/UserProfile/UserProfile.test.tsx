import { render } from '@testing-library/react'

import { user, userSettings } from '../../../cypress/fixtures/users/user'

import { UserProfile } from './UserProfile'

describe('<UserProfile />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserProfile user={{ ...user, settings: userSettings }} />
    )
    expect(baseElement).toBeTruthy()
  })
})
