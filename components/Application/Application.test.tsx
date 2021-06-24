import { render } from '@testing-library/react'

import { Application } from './'

describe('<Application />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Application path='/application/settings' />)
    expect(baseElement).toBeTruthy()
  })
})
