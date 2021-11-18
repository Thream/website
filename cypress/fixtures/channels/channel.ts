import { guildExample } from '../guilds/guild'

export const channelExample = {
  id: 1,
  name: 'general',
  guildId: guildExample.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
