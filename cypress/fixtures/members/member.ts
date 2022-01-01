import { guildExample } from '../guilds/guild'
import { userExample } from '../users/user'

export const memberExample = {
  id: 1,
  isOwner: true,
  userId: userExample.id,
  guildId: guildExample.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const memberExampleComplete = {
  ...memberExample,
  user: userExample
}
