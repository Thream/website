import { render } from '@testing-library/react'

import { Members } from './Members'

describe('<Members />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Members />)
    expect(baseElement).toBeTruthy()
  })
})
