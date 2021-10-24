import { render } from '@testing-library/react'

import { Divider } from '../Divider'

describe('<Divider />', () => {
  it('should render with the content', async () => {
    const content = 'divider'
    const { getByText } = render(<Divider content={content} />)
    expect(getByText(content)).toBeInTheDocument()
  })
})
