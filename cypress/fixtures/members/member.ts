import { guild } from '../guilds/guild'
import { user } from '../users/user'

export const member = {
  id: 1,
  isOwner: true,
  userId: user.id,
  guildId: guild.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const memberComplete = {
  ...member,
  user
}
