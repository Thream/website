import { Theme } from 'contexts/Theme'

export interface RefreshTokenResponse {
  accessToken: string

  /** how long, in milliseconds, until the accessToken expires */
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

export const languages = ['en', 'fr'] as const
export type Language = typeof languages[number]

export interface UserSettings {
  language: Language
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
