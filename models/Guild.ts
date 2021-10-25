import { Type } from '@sinclair/typebox'

import { date, id } from './utils'

export const guildSchema = {
  id,
  name: Type.String({ minLength: 1, maxLength: 30 }),
  icon: Type.Union([Type.String({ format: 'uri-reference' }), Type.Null()]),
  description: Type.Union([Type.String({ maxLength: 160 }), Type.Null()]),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt
}
