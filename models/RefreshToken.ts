import { Type } from '@sinclair/typebox'

import { date, id } from './utils'

export const refreshTokensSchema = {
  id,
  token: Type.String(),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
  userId: id
}
