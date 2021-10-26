import { Handler } from '../handler'

import { guild } from './guild'
import { channel } from '../channels/channel'
import { memberComplete } from '../members/member'

export const postGuildsHandler: Handler = {
  method: 'POST',
  url: '/guilds',
  response: {
    statusCode: 201,
    body: {
      guild: {
        ...guild,
        channels: [channel],
        members: [memberComplete]
      }
    }
  }
}
