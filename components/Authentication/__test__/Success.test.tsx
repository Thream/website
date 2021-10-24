import { render } from '@testing-library/react'

import { Success } from '../Success'

describe('<Success />', () => {
  it('should render', async () => {
    const { getByTestId } = render(<Success />)
    expect(getByTestId('success')).toBeInTheDocument()
  })
})
