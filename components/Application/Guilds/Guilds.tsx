import InfiniteScroll from 'react-infinite-scroll-component'

import { Loader } from 'components/design/Loader'
import { Guild } from './Guild'
import { useGuilds } from 'contexts/Guilds'
import { GuildsChannelsPath } from '..'

export interface GuildsProps {
  path: GuildsChannelsPath | string
}

export const Guilds: React.FC<GuildsProps> = (props) => {
  const { path } = props

  const { guilds, hasMore, nextPage } = useGuilds()

  return (
    <div
      id='guilds-list'
      className='min-w-[92px] mt-[130px] pt-2 h-full border-r-2 border-gray-500 dark:border-white/20 space-y-2 scrollbar-firefox-support overflow-y-auto'
    >
      <InfiniteScroll
        className='guilds-list'
        dataLength={guilds.length}
        next={nextPage}
        hasMore={hasMore}
        scrollableTarget='guilds-list'
        loader={<Loader />}
      >
        {guilds.map((guild) => {
          const selected = typeof path !== 'string' && path.guildId === guild.id
          return <Guild key={guild.id} guild={guild} selected={selected} />
        })}
      </InfiniteScroll>
    </div>
  )
}
