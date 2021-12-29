import { guildExample } from '../../guild'
import { Handler } from '../../../handler'
import { channelExample, channelExample2 } from '../../../channels/channel'

export const getChannelsWithGuildIdHandler: Handler = {
  method: 'GET',
  url: `/guilds/${guildExample.id}/channels`,
  response: {
    statusCode: 200,
    body: [channelExample, channelExample2]
  }
}
