import { Type } from '@sinclair/typebox'

export const date = {
  createdAt: Type.String({
    format: 'date-time',
    description: 'Created date time'
  }),
  updatedAt: Type.String({
    format: 'date-time',
    description: 'Last updated date time'
  })
}

export const id = Type.Integer({ minimum: 1, description: 'Unique identifier' })
