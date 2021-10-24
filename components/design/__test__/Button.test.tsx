import { render } from '@testing-library/react'

import { Button } from '../Button'

describe('<Button />', () => {
  it('should render', async () => {
    const { getByText } = render(<Button>Submit</Button>)
    expect(getByText('Submit')).toBeInTheDocument()
  })
})
