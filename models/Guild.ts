import { Type, Static } from '@sinclair/typebox'

import { channelSchema } from './Channel'
import { memberSchema } from './Member'
import { date, id } from './utils'

export const guildSchema = {
  id,
  name: Type.String({ minLength: 1, maxLength: 30 }),
  icon: Type.Union([Type.String({ format: 'uri-reference' }), Type.Null()]),
  description: Type.Union([Type.String({ maxLength: 160 }), Type.Null()]),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt
}

export const guildCompleteSchema = {
  ...guildSchema,
  channels: Type.Array(Type.Object(channelSchema)),
  members: Type.Array(Type.Object(memberSchema))
}

export const guildCompleteObjectSchema = Type.Object(guildCompleteSchema)

export type GuildComplete = Static<typeof guildCompleteObjectSchema>
