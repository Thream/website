import { render } from '@testing-library/react'

import { FormState } from '.'

describe('<FormState />', () => {
  it('should return nothing if the state is idle', () => {
    const { container } = render(<FormState state='idle' />)
    expect(container.innerHTML.length).toEqual(0)
  })

  it('should return nothing if the message is null', () => {
    const { container } = render(<FormState state='error' />)
    expect(container.innerHTML.length).toEqual(0)
  })

  it('should render the <Loader /> if state is loading', () => {
    const { getByTestId } = render(<FormState state='loading' />)
    expect(getByTestId('loader')).toBeInTheDocument()
  })

  it('should render the success message if state is success', () => {
    const message = 'Success Message'
    const { getByText } = render(
      <FormState state='success' message={message} />
    )
    expect(getByText(message)).toBeInTheDocument()
  })

  it('should render the error message if state is error', () => {
    const message = 'Error Message'
    const { getByText } = render(<FormState state='error' message={message} />)
    expect(getByText(message)).toBeInTheDocument()
  })
})
