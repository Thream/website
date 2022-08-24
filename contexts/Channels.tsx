import { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { NextPage, usePagination } from '../hooks/usePagination'
import { useAuthentication } from '../tools/authentication'
import { Channel, ChannelWithDefaultChannelId } from '../models/Channel'
import { GuildsChannelsPath } from '../components/Application'
import { handleSocketData, SocketData } from '../tools/handleSocketData'
import { CacheKey, CHANNELS_CACHE_KEY } from '../tools/cache'

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

  const cacheKey: CacheKey = `${path.guildId}-${CHANNELS_CACHE_KEY}`

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
    throw new Error('useChannels must be used within ChannelsProvider')
  }
  return channels
}
