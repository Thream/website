import { createContext, useContext, useEffect } from 'react'

import { NextPage, usePagination } from 'hooks/usePagination'
import { useAuthentication } from 'tools/authentication'
import { Channel } from 'models/Channel'
import { GuildsChannelsPath } from 'components/Application'

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

export const ChannelsProvider: React.FC<ChannelsProviderProps> = (props) => {
  const { path, children } = props

  const { authentication } = useAuthentication()

  const {
    items: channels,
    hasMore,
    nextPage,
    resetPagination
  } = usePagination<Channel>({
    api: authentication.api,
    url: `/guilds/${path.guildId}/channels`
  })

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
