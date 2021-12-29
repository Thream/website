import { Type, Static } from '@sinclair/typebox'

import { date, id } from './utils'
import { UserPublicWithoutSettings } from './User'

export const memberSchema = {
  id,
  isOwner: Type.Boolean({ default: false }),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
  userId: id,
  guildId: id
}
const memberObjectSchema = Type.Object(memberSchema)
export type Member = Static<typeof memberObjectSchema>

export interface MemberWithPublicUser extends Member {
  user: UserPublicWithoutSettings
}
