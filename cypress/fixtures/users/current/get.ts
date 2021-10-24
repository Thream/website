import { Handler } from '../../handler'

import { user, userSettings } from '../user'

export const getUsersCurrentHandler: Handler = {
  method: 'GET',
  url: '/users/current',
  response: {
    statusCode: 200,
    body: {
      user: {
        ...user,
        settings: userSettings,
        currentStrategy: 'local',
        strategies: ['local']
      }
    }
  }
}
