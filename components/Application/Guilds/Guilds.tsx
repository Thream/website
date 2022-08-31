import InfiniteScroll from 'react-infinite-scroll-component'

import { Loader } from '../../design/Loader'
import { useGuilds } from '../../../contexts/Guilds'
import type { GuildsPath } from '..'
import { Guild } from './Guild'

export interface GuildsProps {
  path: GuildsPath | string
}

export const Guilds: React.FC<GuildsProps> = (props) => {
  const { path } = props

  const { guilds, hasMore, nextPage } = useGuilds()

  return (
    <div
      id='guilds-list'
      className='border-r-1 scrollbar-firefox-support mt-[130px] h-full min-w-[92px] space-y-2 overflow-y-auto border-gray-500 pt-2 dark:border-white/20'
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
