import { render } from '@testing-library/react'

import { Tooltip } from '../Tooltip'

describe('<Tooltip />', () => {
  it('should render with content', async () => {
    const content = 'tooltip content'
    const { getByText } = render(<Tooltip content={content} />)
    expect(getByText(content)).toBeInTheDocument()
  })
})
