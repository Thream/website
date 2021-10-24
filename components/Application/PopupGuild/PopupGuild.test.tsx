import { render } from '@testing-library/react'

import { PopupGuild } from './PopupGuild'

describe('<PopupGuild />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PopupGuild />)
    expect(baseElement).toBeTruthy()
  })
})
