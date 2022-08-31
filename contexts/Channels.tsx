import { createContext, useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import type { NextPage } from '../hooks/usePagination'
import { usePagination } from '../hooks/usePagination'
import { useAuthentication } from '../tools/authentication'
import type { Channel, ChannelWithDefaultChannelId } from '../models/Channel'
import type { GuildsChannelsPath } from '../components/Application'
import type { SocketData } from '../tools/handleSocketData'
import { handleSocketData } from '../tools/handleSocketData'
import type { CacheKey } from '../tools/cache'
import { CHANNELS_CACHE_KEY } from '../tools/cache'

export interface Channels {
  channels: Channel[]
  hasMore: boolean
  nextPage: NextPage
}

const defaultChannelsContext = {} as any
const ChannelsContext = createContext<Channels>(defaultChannelsContext)

export interface ChannelsProviderProps {
  path: GuildsChannelsPath
}

export const ChannelsProvider: React.FC<
  React.PropsWithChildren<ChannelsProviderProps>
> = (props) => {
  const { path, children } = props
  const router = useRouter()
  const { authentication } = useAuthentication()

  const cacheKey = useMemo<CacheKey>(() => {
    return `${path.guildId}-${CHANNELS_CACHE_KEY}`
  }, [path.guildId])

  const {
    items: channels,
    hasMore,
    nextPage,
    resetPagination,
    setItems
  } = usePagination<Channel>({
    api: authentication.api,
    url: `/guilds/${path.guildId}/channels`,
    cacheKey
  })

  useEffect(() => {
    authentication?.socket?.on(
      'channels',
      async (data: SocketData<ChannelWithDefaultChannelId>) => {
        handleSocketData({ data, setItems, cacheKey })
        if (data.action === 'delete') {
          await router.push(
            `/application/${path.guildId}/${data.item.defaultChannelId}`
          )
        }
      }
    )

    return () => {
      authentication?.socket?.off('channels')
    }
  }, [authentication.socket, path.guildId, router, setItems, cacheKey])

  useEffect(() => {
    resetPagination()
    nextPage()
  }, [nextPage, resetPagination])

  return (
    <ChannelsContext.Provider value={{ channels, hasMore, nextPage }}>
      {children}
    </ChannelsContext.Provider>
  )
}

export const useChannels = (): Channels => {
  const channels = useContext(ChannelsContext)
  if (channels === defaultChannelsContext) {
    throw new Error('`useChannels` must be used within `ChannelsProvider`')
  }
  return channels
}
