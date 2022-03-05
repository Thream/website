import { guildExample } from '../../guild'
import { Handler } from '../../../handler'
import { memberExample } from '../../../members/member'

export const deleteLeaveMembersWithGuildIdHandler: Handler = {
  method: 'DELETE',
  url: `/guilds/${guildExample.id}/members/leave`,
  response: {
    statusCode: 200,
    body: {
      ...memberExample
    }
  }
}
