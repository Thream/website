import { createContext, useContext } from 'react'

import { NextPage, PaginationData, usePagination } from 'hooks/usePagination'
import { useAuthentication } from 'utils/authentication'

export interface Guild {
  id: number
  name: string
  description: string
  icon: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

interface PaginationGuild {
  id: number
  isOwner: boolean
  lastVisitedChannelId: number
  userId: number
  guildId: number
  createdAt: string
  updatedAt: string
  guild: Guild
}

export type Guilds = PaginationData<PaginationGuild>

export interface GuildsValue {
  guilds: Guilds
  nextPage: NextPage
}

export interface GuildsProviderProps {
  guilds: Guilds
}

const defaultGuildsContext: GuildsValue = {} as any
const GuildsContext = createContext<GuildsValue>(defaultGuildsContext)

export const GuildsProvider: React.FC<GuildsProviderProps> = (props) => {
  const { authentication } = useAuthentication()
  const { data: guilds, nextPage } = usePagination<PaginationGuild>({
    api: authentication.api,
    url: '/guilds',
    defaultPaginationData: props.guilds
  })

  return (
    <GuildsContext.Provider value={{ guilds, nextPage }}>
      {props.children}
    </GuildsContext.Provider>
  )
}

export const useGuilds = (): GuildsValue => {
  return useContext(GuildsContext)
}
