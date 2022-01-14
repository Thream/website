import { render } from '@testing-library/react'

import { UserProfileGuilds } from './UserProfileGuilds'

describe('<UserProfileGuilds />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserProfileGuilds />)
    expect(baseElement).toBeTruthy()
  })
})
