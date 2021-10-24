import { Static, Type } from '@sinclair/typebox'

import { strategiesTypebox } from './OAuth'
import { userSettingsSchema } from './UserSettings'
import { date, id } from './utils'

export const userSchema = {
  id,
  name: Type.String({ minLength: 1, maxLength: 30 }),
  email: Type.String({ minLength: 1, maxLength: 255, format: 'email' }),
  password: Type.String({ minLength: 1 }),
  logo: Type.String({ format: 'uri-reference' }),
  status: Type.String({ maxLength: 255 }),
  biography: Type.String(),
  website: Type.String({ maxLength: 255, format: 'uri-reference' }),
  isConfirmed: Type.Boolean({ default: false }),
  temporaryToken: Type.String(),
  temporaryExpirationToken: Type.String({ format: 'date-time' }),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt
}

const userSchemaWithSettings = {
  ...userSchema,
  settings: Type.Object(userSettingsSchema)
}

export const userPublicSchema = {
  id,
  name: userSchema.name,
  email: Type.Optional(userSchema.email),
  logo: Type.Optional(userSchema.logo),
  status: Type.Optional(userSchema.status),
  biography: Type.Optional(userSchema.biography),
  website: Type.Optional(userSchema.website),
  isConfirmed: userSchema.isConfirmed,
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
  settings: Type.Optional(Type.Object(userSettingsSchema))
}

export const userPublicObjectSchema = Type.Object(userPublicSchema)

export const userCurrentSchema = Type.Object({
  ...userSchemaWithSettings,
  currentStrategy: Type.Union([...strategiesTypebox]),
  strategies: Type.Array(Type.Union([...strategiesTypebox]))
})

export type UserPublic = Static<typeof userPublicObjectSchema>
export type UserCurrent = Static<typeof userCurrentSchema>
