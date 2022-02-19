import { render } from '@testing-library/react'

import { ErrorPage } from '.'

describe('<ErrorPage />', () => {
  it('should render the message and statusCode', () => {
    const messageContent = 'message content'
    const statusCode = 404
    const { getByText } = render(
      <ErrorPage statusCode={statusCode} message={messageContent} />
    )
    expect(getByText(messageContent)).toBeInTheDocument()
    expect(getByText(statusCode)).toBeInTheDocument()
  })
})
