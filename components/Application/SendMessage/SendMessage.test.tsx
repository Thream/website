import { render } from '@testing-library/react'

import { SendMessage } from './SendMessage'

describe('<SendMessage />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SendMessage />)
    expect(baseElement).toBeTruthy()
  })
})
