import { Handler } from '../../../handler'
import {
  messageExampleComplete,
  messageExampleComplete2
} from '../../../messages/message'
import { channelExample } from '../../channel'

export const getMessagesWithChannelIdHandler: Handler = {
  method: 'GET',
  url: `/channels/${channelExample.id}/messages`,
  response: {
    statusCode: 200,
    body: [messageExampleComplete, messageExampleComplete2]
  }
}
