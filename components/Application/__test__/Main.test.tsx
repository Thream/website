import { render } from '@testing-library/react'

import { Main } from '../Main'

describe('<Main />', () => {
  it('should render', async () => {
    const { getByText } = render(<Main>Content</Main>)
    expect(getByText('Content')).toBeInTheDocument()
  })
})
