import { Handler } from '../../handler'
import { userExample, userSettingsExample } from '../user'

export const getUserByIdHandler: Handler = {
  method: 'GET',
  url: `/users/${userExample.id}`,
  response: {
    statusCode: 200,
    body: {
      user: {
        ...userExample,
        settings: userSettingsExample
      },
      guilds: []
    }
  }
}
