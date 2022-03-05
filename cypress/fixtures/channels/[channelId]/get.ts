import { Handler } from '../../handler'
import { channelExample, channelExample2 } from '../channel'

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

export const getChannelWithChannelIdHandler2: Handler = {
  method: 'GET',
  url: `/channels/${channelExample2.id}`,
  response: {
    statusCode: 200,
    body: {
      channel: channelExample2
    }
  }
}
