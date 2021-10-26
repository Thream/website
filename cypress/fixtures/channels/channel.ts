import { guild } from '../guilds/guild'

export const channel = {
  id: 1,
  name: 'general',
  guildId: guild.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
