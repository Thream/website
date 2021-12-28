import { createContext, useContext, useEffect } from 'react'

import { NextPage, usePagination } from 'hooks/usePagination'
import { useAuthentication } from 'utils/authentication'
import { GuildWithDefaultChannelId } from 'models/Guild'

export interface Guilds {
  guilds: GuildWithDefaultChannelId[]
  hasMore: boolean
  nextPage: NextPage
}

const defaultGuildsContext = {} as any
const GuildsContext = createContext<Guilds>(defaultGuildsContext)

export const GuildsProvider: React.FC = (props) => {
  const { children } = props

  const { authentication } = useAuthentication()

  const {
    items: guilds,
    hasMore,
    nextPage,
    resetPagination
  } = usePagination<GuildWithDefaultChannelId>({
    api: authentication.api,
    url: '/guilds'
  })

  useEffect(() => {
    resetPagination()
    nextPage()
  }, [nextPage, resetPagination])

  return (
    <GuildsContext.Provider value={{ guilds, hasMore, nextPage }}>
      {children}
    </GuildsContext.Provider>
  )
}

export const useGuilds = (): Guilds => {
  const guilds = useContext(GuildsContext)
  if (guilds === defaultGuildsContext) {
    throw new Error('useGuilds must be used within GuildsProvider')
  }
  return guilds
}
