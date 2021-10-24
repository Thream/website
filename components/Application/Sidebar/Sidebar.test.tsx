import { render } from '@testing-library/react'

import { Sidebar } from './Sidebar'

describe('<Sidebar />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Sidebar direction='left' visible={true} isMobile={false} />
    )
    expect(baseElement).toBeTruthy()
  })
})
