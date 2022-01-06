import { render } from '@testing-library/react'

import { UserProfileGuild } from './UserProfileGuild'

describe('<UserProfileGuild />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UserProfileGuild handleConfirmationState={() => {}} />
    )
    expect(baseElement).toBeTruthy()
  })
})
