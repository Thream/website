import { getUsersCurrentHandler } from './users/current/get'
import { postUsersRefreshTokenHandler } from './users/refresh-token/post'

export interface Handler {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  response: {
    body: any
    statusCode: number
  }
}

export type Handlers = Handler[]

export const authenticationHandlers = [
  getUsersCurrentHandler,
  postUsersRefreshTokenHandler
]
