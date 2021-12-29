import { guildExample } from '../../guild'
import { Handler } from '../../../handler'
import { memberExampleComplete } from '../../../members/member'

export const getMembersWithGuildIdHandler: Handler = {
  method: 'GET',
  url: `/guilds/${guildExample.id}/members`,
  response: {
    statusCode: 200,
    body: [memberExampleComplete]
  }
}
