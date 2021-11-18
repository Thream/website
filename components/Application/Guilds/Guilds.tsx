import { useCallback, useEffect, useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAuthentication } from 'utils/authentication'
import { GuildWithDefaultChannelId } from 'models/Guild'
import { Loader } from 'components/design/Loader'
import { useFetchState } from 'hooks/useFetchState'
import { ApplicationProps } from '../Application'
import { Guild } from './Guild'

export interface GuildsProps extends ApplicationProps {}

export const Guilds: React.FC<GuildsProps> = (props) => {
  const { path } = props

  const [guilds, setGuilds] = useState<GuildWithDefaultChannelId[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [fetchState, setFetchState] = useFetchState('idle')
  const afterId = useRef<number | null>(null)

  const { authentication } = useAuthentication()

  const fetchGuilds = useCallback(async (): Promise<void> => {
    if (fetchState !== 'idle') {
      return
    }
    setFetchState('loading')
    const { data } = await authentication.api.get<GuildWithDefaultChannelId[]>(
      `/guilds?limit=20${
        afterId.current != null ? `&after=${afterId.current}` : ''
      }`
    )
    afterId.current = data.length > 0 ? data[data.length - 1].id : null
    setGuilds((oldGuilds) => {
      return [...oldGuilds, ...data]
    })
    setHasMore(data.length > 0)
    setFetchState('idle')
  }, [authentication, fetchState, setFetchState])

  useEffect(() => {
    fetchGuilds().catch((error) => {
      console.error(error)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      id='guilds-list-members'
      className='min-w-[92px] mt-[130px] pt-2 h-full border-r-2 border-gray-500 dark:border-white/20 space-y-2 scrollbar-firefox-support overflow-y-auto'
    >
      <InfiniteScroll
        className='guilds-list'
        dataLength={guilds.length}
        next={fetchGuilds}
        hasMore={hasMore}
        scrollableTarget='guilds-list-members'
        loader={<Loader />}
      >
        {guilds.map((guild) => {
          return (
            <Guild
              guild={guild}
              key={guild.id}
              selected={typeof path !== 'string' && path.guildId === guild.id}
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}
