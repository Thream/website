import { Type } from '@sinclair/typebox'

import { date, id } from './utils'

export const types = [Type.Literal('text')]

export const channelSchema = {
  id,
  name: Type.String({ maxLength: 255 }),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
  guildId: id
}
