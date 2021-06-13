import { render } from '@testing-library/react'

import { ErrorMessage } from '../ErrorMessage'

describe('<ErrorMessage />', () => {
  it('should return nothing if there are no errors', async () => {
    const { container } = render(<ErrorMessage errors={[]} />)
    expect(container.innerHTML.length).toEqual(0)
  })

  it('should render the single error', async () => {
    const errorMessage = 'Error Message'
    const { getByText } = render(<ErrorMessage errors={[errorMessage]} />)
    expect(getByText(errorMessage)).toBeInTheDocument()
  })
})
