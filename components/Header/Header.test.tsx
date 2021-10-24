import { render } from '@testing-library/react'

import { Header } from './'

describe('<Header />', () => {
  it('should render', async () => {
    const { getByText } = render(<Header />)
    expect(getByText('Thream')).toBeInTheDocument()
  })
})
