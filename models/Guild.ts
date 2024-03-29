import type { Static } from "@sinclair/typebox"
import { Type } from "@sinclair/typebox"

import { channelSchema } from "./Channel"
import { memberSchema } from "./Member"
import { date, id } from "./utils"

export const guildSchema = {
  id,
  name: Type.String({ minLength: 1, maxLength: 30 }),
  icon: Type.Union([Type.String({ format: "uri-reference" }), Type.Null()]),
  description: Type.String({ maxLength: 160 }),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
}
export const guildObjectSchema = Type.Object(guildSchema)
export type Guild = Static<typeof guildObjectSchema>

export const guildWithDefaultChannelIdSchema = {
  ...guildSchema,
  defaultChannelId: id,
}
export const guildWithDefaultChannelObjectSchema = Type.Object(
  guildWithDefaultChannelIdSchema,
)
export type GuildWithDefaultChannelId = Static<
  typeof guildWithDefaultChannelObjectSchema
>

export const guildCompleteSchema = {
  ...guildSchema,
  channels: Type.Array(Type.Object(channelSchema)),
  members: Type.Array(Type.Object(memberSchema)),
}
export const guildCompleteObjectSchema = Type.Object(guildCompleteSchema)
export type GuildComplete = Static<typeof guildCompleteObjectSchema>

export const guildPublicObjectSchema = Type.Object({
  ...guildSchema,
  membersCount: Type.Integer({ min: 1 }),
})
export type GuildPublic = Static<typeof guildPublicObjectSchema>
