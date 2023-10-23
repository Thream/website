import type { Static } from "@sinclair/typebox"
import { Type } from "@sinclair/typebox"

import { strategiesTypebox } from "./OAuth"
import { userSettingsSchema } from "./UserSettings"
import { date, id } from "./utils"

export const userSchema = {
  id,
  name: Type.String({ minLength: 1, maxLength: 30 }),
  email: Type.String({ minLength: 1, maxLength: 254, format: "email" }),
  password: Type.String({ minLength: 1 }),
  logo: Type.Union([
    Type.String({ minLength: 1, format: "uri-reference" }),
    Type.Null(),
  ]),
  status: Type.Union([
    Type.String({ minLength: 1, maxLength: 50 }),
    Type.Null(),
  ]),
  biography: Type.Union([
    Type.String({ minLength: 1, maxLength: 160 }),
    Type.Null(),
  ]),
  website: Type.Union([
    Type.String({
      minLength: 1,
      maxLength: 255,
      format: "uri",
    }),
    Type.Null(),
  ]),
  isConfirmed: Type.Boolean({ default: false }),
  temporaryToken: Type.String(),
  temporaryExpirationToken: Type.String({ format: "date-time" }),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
}

export const userObjectSchema = Type.Object(userSchema)

export const userPublicWithoutSettingsSchema = {
  id,
  name: userSchema.name,
  email: Type.Union([userSchema.email, Type.Null()]),
  logo: userSchema.logo,
  status: userSchema.status,
  biography: userSchema.biography,
  website: userSchema.website,
  isConfirmed: userSchema.isConfirmed,
  createdAt: date.createdAt,
  updatedAt: date.updatedAt,
}
export const userPublicWithoutSettingsObjectSchema = Type.Object(
  userPublicWithoutSettingsSchema,
)

export const userPublicSchema = {
  ...userPublicWithoutSettingsSchema,
  settings: Type.Object(userSettingsSchema),
}

export const userPublicObjectSchema = Type.Object(userPublicSchema)

export const userCurrentSchema = Type.Object({
  ...userPublicSchema,
  currentStrategy: Type.Union([...strategiesTypebox]),
  strategies: Type.Array(Type.Union([...strategiesTypebox])),
})

export type User = Static<typeof userObjectSchema>
export type UserPublic = Static<typeof userPublicObjectSchema>
export type UserPublicWithoutSettings = Static<
  typeof userPublicWithoutSettingsObjectSchema
>
export type UserCurrent = Static<typeof userCurrentSchema>
