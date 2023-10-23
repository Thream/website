import type { UserCurrent } from "../../models/User"

export interface RefreshTokenResponse {
  accessToken: string

  /** how long, in milliseconds, until the accessToken expires */
  expiresIn: number
  type: "Bearer"
}

export interface Tokens extends RefreshTokenResponse {
  refreshToken: string
}

export interface PagePropsWithAuthentication {
  authentication: {
    tokens: Tokens
    user: UserCurrent
  }
}

export const isTokens = (data: { [key: string]: any }): data is Tokens => {
  return (
    "accessToken" in data &&
    "refreshToken" in data &&
    "type" in data &&
    "expiresIn" in data
  )
}

export * from "./Authentication"
export * from "./authenticationFromServerSide"
export * from "./AuthenticationContext"
