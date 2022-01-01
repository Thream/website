import { Handler } from '../handler'

import { guildExample, guildExample2 } from './guild'

export const getGuildsHandler: Handler = {
  method: 'GET',
  url: '/guilds',
  response: {
    statusCode: 200,
    body: [
      { ...guildExample, defaultChannelId: 1 },
      { ...guildExample2, defaultChannelId: 2 }
    ]
  }
}
