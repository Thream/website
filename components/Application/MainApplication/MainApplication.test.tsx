import { render } from '@testing-library/react'

import { MainApplication } from './MainApplication'

describe('<MainApplication />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainApplication />)
    expect(baseElement).toBeTruthy()
  })
})
