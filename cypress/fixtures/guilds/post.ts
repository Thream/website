import { Handler } from '../handler'
import { guildExample } from './guild'
import { channelExample } from '../channels/channel'
import { memberExampleComplete } from '../members/member'

export const postGuildsHandler: Handler = {
  method: 'POST',
  url: '/guilds',
  response: {
    statusCode: 201,
    body: {
      guild: {
        ...guildExample,
        channels: [channelExample],
        members: [memberExampleComplete]
      }
    }
  }
}
