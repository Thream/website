import { guildExample } from '../../guild'
import type { Handler } from '../../../handler'
import { memberExampleComplete } from '../../../members/member'
import { channelExample } from '../../../channels/channel'

export const postMembersWithGuildIdHandler: Handler = {
  method: 'POST',
  url: `/guilds/${guildExample.id}/members/join`,
  response: {
    statusCode: 201,
    body: {
      ...memberExampleComplete,
      guild: {
        ...guildExample,
        defaultChannelId: channelExample.id
      }
    }
  }
}
