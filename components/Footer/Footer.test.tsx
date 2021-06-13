import { render } from '@testing-library/react'

import { Footer } from './'

describe('<Footer />', () => {
  it('should render', async () => {
    const { getByText } = render(<Footer />)
    expect(getByText('Thream')).toBeInTheDocument()
  })
})
