import { render } from '@testing-library/react'

import { ErrorPage } from '../ErrorPage'

describe('<ErrorPage />', () => {
  it('should render with message and statusCode', async () => {
    const message = 'Error'
    const statusCode = 404
    const { getByText } = render(
      <ErrorPage statusCode={statusCode} message={message} />
    )
    expect(getByText(message)).toBeInTheDocument()
    expect(getByText(statusCode)).toBeInTheDocument()
  })
})
