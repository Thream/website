import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAuthentication } from 'utils/authentication'
import { GuildWithDefaultChannelId } from 'models/Guild'
import { Loader } from 'components/design/Loader'
import { ApplicationProps } from '../Application'
import { Guild } from './Guild'
import { usePagination } from 'hooks/usePagination'

export interface GuildsProps extends ApplicationProps {}

export const Guilds: React.FC<GuildsProps> = (props) => {
  const { path } = props
  const { authentication } = useAuthentication()

  const { items, hasMore, nextPage } = usePagination<GuildWithDefaultChannelId>(
    {
      api: authentication.api,
      url: '/guilds'
    }
  )

  useEffect(() => {
    nextPage()
  }, [nextPage])

  return (
    <div
      id='guilds-list-members'
      className='min-w-[92px] mt-[130px] pt-2 h-full border-r-2 border-gray-500 dark:border-white/20 space-y-2 scrollbar-firefox-support overflow-y-auto'
    >
      <InfiniteScroll
        className='guilds-list'
        dataLength={items.length}
        next={nextPage}
        hasMore={hasMore}
        scrollableTarget='guilds-list-members'
        loader={<Loader />}
      >
        {items.map((guild) => {
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
