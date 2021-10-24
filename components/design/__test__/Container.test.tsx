import { render } from '@testing-library/react'

import { Container } from '../Container'

describe('<Container />', () => {
  it('should render', async () => {
    const { getByText } = render(<Container>Content</Container>)
    expect(getByText('Content')).toBeInTheDocument()
  })
})
