import { Static, Type } from '@sinclair/typebox'

import { strategiesTypebox } from './OAuth'
import { userSettingsSchema } from './UserSettings'
import { date, id } from './utils'

export const userSchema = {
  id,
  name: Type.String({ minLength: 1, maxLength: 30 }),
  email: Type.String({ minLength: 1, maxLength: 254, format: 'email' }),
  password: Type.String(),
  logo: Type.String({ format: 'uri-reference' }),
  status: Type.String({ maxLength: 50 }),
  biography: Type.String({ maxLength: 160 }),
  website: Type.String({ maxLength: 255, format: 'uri-reference' }),
  isConfirmed: Type.Boolean({ default: false }),
  temporaryToken: Type.String(),
  temporaryExpirationToken: Type.String({ format: 'date-time' }),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt
}

export const userPublicWithoutSettingsSchema = {
  id,
  name: userSchema.name,
  email: Type.Union([userSchema.email, Type.Null()]),
  logo: Type.Union([userSchema.logo, Type.Null()]),
  status: Type.Union([userSchema.status, Type.Null()]),
  biography: Type.Union([userSchema.biography, Type.Null()]),
  website: Type.Union([userSchema.website, Type.Null()]),
  isConfirmed: userSchema.isConfirmed,
  createdAt: date.createdAt,
  updatedAt: date.updatedAt
}

export const userPublicSchema = {
  ...userPublicWithoutSettingsSchema,
  settings: Type.Object(userSettingsSchema)
}

export const userPublicObjectSchema = Type.Object(userPublicSchema)

export const userCurrentSchema = Type.Object({
  ...userPublicSchema,
  currentStrategy: Type.Union([...strategiesTypebox]),
  strategies: Type.Array(Type.Union([...strategiesTypebox]))
})

export type UserPublic = Static<typeof userPublicObjectSchema>
export type UserCurrent = Static<typeof userCurrentSchema>
