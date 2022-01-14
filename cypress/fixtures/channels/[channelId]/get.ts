import { Handler } from '../../handler'
import { channelExample } from '../channel'

export const getChannelWithChannelIdHandler: Handler = {
  method: 'GET',
  url: `/channels/${channelExample.id}`,
  response: {
    statusCode: 200,
    body: {
      channel: channelExample
    }
  }
}
