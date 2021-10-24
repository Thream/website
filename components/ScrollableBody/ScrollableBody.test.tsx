import { render } from '@testing-library/react'

import { ScrollableBody } from './ScrollableBody'

describe('<ScrollableBody />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScrollableBody />)
    expect(baseElement).toBeTruthy()
  })
})
