import { Type, Static } from '@sinclair/typebox'

import { date, id } from './utils'

export const languages = [Type.Literal('fr'), Type.Literal('en')]
export const themes = [Type.Literal('light'), Type.Literal('dark')]

export const userSettingsSchema = {
  id,
  language: Type.Union(languages, { default: 'en' }),
  theme: Type.Union(themes, { default: 'dark' }),
  isPublicEmail: Type.Boolean({ default: false }),
  isPublicGuilds: Type.Boolean({ default: false }),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
  userId: id
}

export const userSettingsSchemaType = Type.Object(userSettingsSchema)

export type Theme = Static<typeof userSettingsSchema.theme>
export type Language = Static<typeof userSettingsSchema.language>

export type UserSettings = Static<typeof userSettingsSchemaType>
