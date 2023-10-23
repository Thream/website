import type { Guild } from "../../../models/Guild"

export const guildExample: Guild = {
  id: 1,
  name: "GuildExample",
  description: "guild example.",
  icon: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const guildExample2: Guild = {
  ...guildExample,
  id: 2,
  name: "app",
}
