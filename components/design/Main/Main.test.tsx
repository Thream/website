import { render } from '@testing-library/react'

import { Main } from '.'

describe('<Main />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Main />)
    expect(baseElement).toBeTruthy()
  })
})
