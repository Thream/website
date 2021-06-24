import { render } from '@testing-library/react'

import { HeaderApplication } from './HeaderApplication'

describe('<HeaderApplication />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderApplication title='# Channel 4' />)
    expect(baseElement).toBeTruthy()
  })
})
