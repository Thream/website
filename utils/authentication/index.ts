import { UserCurrent } from 'models/User'

export interface RefreshTokenResponse {
  accessToken: string

  /** how long, in milliseconds, until the accessToken expires */
  expiresIn: number
  type: 'Bearer'
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

export * from './Authentication'
export * from './authenticationFromServerSide'
export * from './AuthenticationContext'
