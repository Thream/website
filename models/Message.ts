import type { Static } from "@sinclair/typebox"
import { Type } from "@sinclair/typebox"

import { date, id } from "./utils"
import type { MemberWithPublicUser } from "./Member"

export const types = [Type.Literal("text"), Type.Literal("file")]

export const messageSchema = {
  id,
  value: Type.String({
    minLength: 1,
    maxLength: 20_000,
  }),
  type: Type.Union(types, { default: "text" }),
  mimetype: Type.String({
    maxLength: 127,
    default: "text/plain",
    format: "mimetype",
  }),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
  memberId: id,
  channelId: id,
}
const messageObjectSchema = Type.Object(messageSchema)
export type Message = Static<typeof messageObjectSchema>

export interface MessageWithMember extends Message {
  member: MemberWithPublicUser
}
