import { Type, Static } from '@sinclair/typebox'

import { date, id } from './utils'

export const channelSchema = {
  id,
  name: Type.String({ minLength: 1, maxLength: 20 }),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
  guildId: id
}
const channelObjectSchema = Type.Object(channelSchema)
export type Channel = Static<typeof channelObjectSchema>
