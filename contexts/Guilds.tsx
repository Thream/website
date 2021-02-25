import { createContext, useContext, useState } from 'react'

import { PaginationData } from 'hooks/usePagination'

interface Guild {
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
  userId: number
  guildId: number
  createdAt: string
  updatedAt: string
  guild: Guild
}

export type Guilds = PaginationData<PaginationGuild>

export interface GuildsValue {
  guilds: Guilds
}

const defaultGuildsContext: GuildsValue = {} as any
const GuildsContext = createContext<GuildsValue>(defaultGuildsContext)

export const GuildsProvider: React.FC<GuildsValue> = (props) => {
  const [guilds] = useState<Guilds>(props.guilds)

  return (
    <GuildsContext.Provider value={{ guilds }}>
      {props.children}
    </GuildsContext.Provider>
  )
}

export const useGuilds = (): GuildsValue => {
  return useContext(GuildsContext)
}
