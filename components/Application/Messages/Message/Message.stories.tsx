import { Meta, Story } from '@storybook/react'

import { Message as Component, MessageProps } from './Message'
import { messageExampleComplete } from '../../../../cypress/fixtures/messages/message'

const Stories: Meta = {
  title: 'Message',
  component: Component
}

export default Stories

export const Message: Story<MessageProps> = (arguments_) => {
  return <Component {...arguments_} />
}
Message.args = { message: messageExampleComplete }
