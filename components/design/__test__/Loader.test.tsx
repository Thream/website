import { render } from '@testing-library/react'

import { Loader } from '../Loader'

describe('<Loader />', () => {
  it('should render with correct width and height', async () => {
    const size = 20
    const { findByTestId } = render(<Loader width={size} height={size} />)
    const progressSpinner = await findByTestId('progress-spinner')
    expect(progressSpinner).toHaveStyle(`width: ${size}px`)
    expect(progressSpinner).toHaveStyle(`height: ${size}px`)
  })

  it('should render with default width and height', async () => {
    const { findByTestId } = render(<Loader />)
    const progressSpinner = await findByTestId('progress-spinner')
    expect(progressSpinner).toHaveStyle('width: 50px')
    expect(progressSpinner).toHaveStyle('height: 50px')
  })
})
