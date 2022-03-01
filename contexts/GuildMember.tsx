import { createContext, useContext, useEffect, useState } from 'react'

import { Guild } from 'models/Guild'
import { Member } from 'models/Member'
import { useAuthentication } from 'tools/authentication'

export interface GuildMember {
  guild: Guild
  member: Member
}

export interface GuildMemberProps {
  guildMember: GuildMember
  path: {
    guildId: number
  }
}

const defaultGuildMemberContext = {} as any
const GuildMemberContext = createContext<GuildMember>(defaultGuildMemberContext)

export const GuildMemberProvider: React.FC<GuildMemberProps> = (props) => {
  const [guildMember, setGuildMember] = useState(props.guildMember)
  const { authentication } = useAuthentication()

  useEffect(() => {
    const fetchGuildMember = async (): Promise<void> => {
      const { data } = await authentication.api.get(
        `/guilds/${props.path.guildId}`
      )
      setGuildMember(data)
    }

    fetchGuildMember().catch((error) => {
      console.error(error)
    })
  }, [props.path, authentication.api])

  return (
    <GuildMemberContext.Provider value={guildMember}>
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
