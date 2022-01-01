import { render } from '@testing-library/react'

import { UserSettings } from './UserSettings'

describe('<UserSettings />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserSettings />)
    expect(baseElement).toBeTruthy()
  })
})
