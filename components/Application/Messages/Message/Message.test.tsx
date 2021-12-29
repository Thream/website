import { render } from '@testing-library/react'

import { Message } from './Message'
import { messageExampleComplete } from '../../../../cypress/fixtures/messages/message'

describe('<Message />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Message message={messageExampleComplete} />)
    expect(baseElement).toBeTruthy()
  })
})
