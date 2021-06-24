import { render } from '@testing-library/react'

import { IconLink } from './IconLink'

describe('<IconLink />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconLink href='' />)
    expect(baseElement).toBeTruthy()
  })
})
