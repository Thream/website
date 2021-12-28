import { createContext, useContext } from 'react'

import { Guild } from 'models/Guild'
import { Member } from 'models/Member'

export interface GuildMember {
  guild: Guild
  member: Member
}

export interface GuildMemberProps {
  guildMember: GuildMember
}

const defaultGuildMemberContext = {} as any
const GuildMemberContext = createContext<GuildMember>(defaultGuildMemberContext)

export const GuildMemberProvider: React.FC<GuildMemberProps> = (props) => {
  return (
    <GuildMemberContext.Provider value={props.guildMember}>
      {props.children}
    </GuildMemberContext.Provider>
  )
}

export const useGuildMember = (): GuildMember => {
  const guildMember = useContext(GuildMemberContext)
  if (guildMember === defaultGuildMemberContext) {
    throw new Error('useGuildMember must be used within GuildMemberProvider')
  }
  return guildMember
}
