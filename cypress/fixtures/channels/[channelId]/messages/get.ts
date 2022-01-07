import { Handler } from '../../../handler'
import {
  messageExampleComplete,
  messageExampleComplete2,
  messageExampleComplete3,
  messageExampleComplete4,
  messageExampleComplete5,
  messageExampleComplete6,
  messageExampleComplete7,
  messageExampleComplete8,
  messageExampleComplete9
} from '../../../messages/message'
import { channelExample } from '../../channel'

export const getMessagesWithChannelIdHandler: Handler = {
  method: 'GET',
  url: `/channels/${channelExample.id}/messages`,
  response: {
    statusCode: 200,
    body: [
      messageExampleComplete,
      messageExampleComplete2,
      messageExampleComplete3,
      messageExampleComplete4,
      messageExampleComplete5,
      messageExampleComplete6,
      messageExampleComplete7,
      messageExampleComplete8,
      messageExampleComplete9
    ]
  }
}
