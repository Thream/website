import { getUsersCurrentHandler } from "./users/current/get"
import { postUsersRefreshTokenHandler } from "./users/refresh-token/post"

export type Method = "GET" | "POST" | "PUT" | "DELETE"

export interface Handler {
  method: Method
  url: `/${string}`
  response: {
    isFile?: boolean
    body: any
    statusCode: number
  }
}

export type Handlers = Handler[]

export const authenticationHandlers = [
  getUsersCurrentHandler,
  postUsersRefreshTokenHandler,
]
