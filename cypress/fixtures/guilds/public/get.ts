import { Handler } from '../../handler'

import { guild, guild2 } from '../guild'

export const getGuildsPublicEmptyHandler: Handler = {
  method: 'GET',
  url: '/guilds/public',
  response: {
    statusCode: 200,
    body: []
  }
}

export const getGuildsPublicHandler: Handler = {
  method: 'GET',
  url: '/guilds/public',
  response: {
    statusCode: 200,
    body: [
      { ...guild, membersCount: 1 },
      { ...guild2, membersCount: 1 }
    ]
  }
}

export const getGuildsPublicSearchHandler: Handler = {
  method: 'GET',
  url: '/guilds/public',
  query: '?limit=20&search=app',
  response: {
    statusCode: 200,
    body: [{ ...guild2, membersCount: 1 }]
  }
}
