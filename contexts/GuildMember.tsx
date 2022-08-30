import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { GuildWithDefaultChannelId } from '../models/Guild'
import { Member } from '../models/Member'
import { useAuthentication } from '../tools/authentication'
import { SocketData } from '../tools/handleSocketData'

export interface GuildMember {
  guild: GuildWithDefaultChannelId
  member: Member
}

export interface GuildMemberResult extends GuildMember {}

export interface GuildMemberProps {
  guildMember: GuildMember
  path: {
    guildId: number
  }
}

const defaultGuildMemberContext = {} as any
const GuildMemberContext = createContext<GuildMemberResult>(
  defaultGuildMemberContext
)

export const GuildMemberProvider: React.FC<
  React.PropsWithChildren<GuildMemberProps>
> = (props) => {
  const { path, children } = props
  const router = useRouter()
  const [guildMember, setGuildMember] = useState(props.guildMember)
  const { authentication } = useAuthentication()

  useEffect(() => {
    const fetchGuildMember = async (): Promise<void> => {
      const { data } = await authentication.api.get(`/guilds/${path.guildId}`)
      setGuildMember(data)
    }

    fetchGuildMember().catch((error) => {
      console.error(error)
    })
  }, [path, authentication.api])

  useEffect(() => {
    authentication?.socket?.on(
      'guilds',
      async (data: SocketData<GuildWithDefaultChannelId>) => {
        if (data.item.id === path.guildId) {
          switch (data.action) {
            case 'delete':
              await router.push('/application')
              break
            case 'update':
              setGuildMember((oldGuildMember) => {
                return {
                  ...oldGuildMember,
                  guild: {
                    ...oldGuildMember.guild,
                    ...data.item
                  }
                }
              })
              break
          }
        }
      }
    )

    return () => {
      authentication?.socket?.off('guilds')
    }
  }, [authentication.socket, path.guildId, router])

  return (
    <GuildMemberContext.Provider
      value={{
        ...guildMember
      }}
    >
      {children}
    </GuildMemberContext.Provider>
  )
}

export const useGuildMember = (): GuildMemberResult => {
  const guildMember = useContext(GuildMemberContext)
  if (guildMember === defaultGuildMemberContext) {
    throw new Error(
      '`useGuildMember` must be used within `GuildMemberProvider`'
    )
  }
  return guildMember
}
