import { render, fireEvent } from '@testing-library/react'

import { Input } from '../Input'

describe('<Input />', () => {
  it('should render the label', async () => {
    const labelContent = 'label content'
    const { getByText } = render(<Input label={labelContent} />)
    expect(getByText(labelContent)).toBeInTheDocument()
  })

  it('should not render the eye icon if the input is not of type "password"', async () => {
    const { queryByTestId } = render(<Input type='text' label='content' />)
    const passwordEye = queryByTestId('password-eye')
    expect(passwordEye).not.toBeInTheDocument()
  })

  it('should handlePassword with eye icon', async () => {
    const { findByTestId } = render(<Input type='password' label='content' />)
    const passwordEye = await findByTestId('password-eye')
    const input = await findByTestId('input')
    expect(input).toHaveAttribute('type', 'password')
    fireEvent.click(passwordEye)
    expect(input).toHaveAttribute('type', 'text')
  })
})
