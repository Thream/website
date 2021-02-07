import { Theme } from 'contexts/Theme'

/** how long in ms, until the cookie expires */
export const COOKIE_MAX_AGE = 365 * 24 * 60 * 60

export interface RefreshTokenResponse {
  accessToken: string

  /** expiresIn is how long, in milliseconds, until the returned accessToken expires */
  expiresIn: number
  type: 'Bearer'
}

export interface Tokens extends RefreshTokenResponse {
  refreshToken: string
}

export interface User {
  id: number
  name: string
  email: string
  status: string
  biography: string
  logo: string
  isConfirmed: boolean
  createdAt: string
  updatedAt: string
}

export interface UserSettings {
  language: 'en'
  theme: Theme
  isPublicEmail: boolean
}

export const providers = ['google', 'github', 'discord'] as const
export const strategies = [...providers, 'local'] as const

export type AuthenticationStrategy = typeof strategies[number]

export interface PagePropsWithAuthentication {
  authentication: {
    tokens: Tokens
    user: User
    settings: UserSettings
    currentStrategy: AuthenticationStrategy
    strategies: AuthenticationStrategy[]
  }
}

export * from './Authentication'
export * from './authenticationFromServerSide'
export * from './AuthenticationContext'
