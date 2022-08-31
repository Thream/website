import { createContext, useContext, useEffect } from 'react'

import type { NextPage } from '../hooks/usePagination'
import { usePagination } from '../hooks/usePagination'
import { useAuthentication } from '../tools/authentication'
import type { GuildWithDefaultChannelId } from '../models/Guild'
import type { SocketData } from '../tools/handleSocketData'
import { handleSocketData } from '../tools/handleSocketData'
import { GUILDS_CACHE_KEY } from '../tools/cache'

export interface Guilds {
  guilds: GuildWithDefaultChannelId[]
  hasMore: boolean
  nextPage: NextPage
}

const defaultGuildsContext = {} as any
const GuildsContext = createContext<Guilds>(defaultGuildsContext)

export const GuildsProvider: React.FC<React.PropsWithChildren<{}>> = (
  props
) => {
  const { children } = props

  const { authentication } = useAuthentication()

  const {
    items: guilds,
    hasMore,
    nextPage,
    resetPagination,
    setItems
  } = usePagination<GuildWithDefaultChannelId>({
    api: authentication.api,
    url: '/guilds',
    cacheKey: GUILDS_CACHE_KEY
  })

  useEffect(() => {
    authentication?.socket?.on(
      'guilds',
      (data: SocketData<GuildWithDefaultChannelId>) => {
        handleSocketData({ data, setItems, cacheKey: GUILDS_CACHE_KEY })
      }
    )

    return () => {
      authentication?.socket?.off('guilds')
    }
  }, [authentication.socket, setItems])

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
    throw new Error('`useGuilds` must be used within `GuildsProvider`')
  }
  return guilds
}
