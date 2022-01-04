import { render } from '@testing-library/react'

import {
  userExample,
  userSettingsExample
} from '../../../cypress/fixtures/users/user'

import { UserSettings } from './UserSettings'

describe('<UserSettings />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserSettings user={{ ...userExample, settings: userSettingsExample }} />
    )
    expect(baseElement).toBeTruthy()
  })
})
