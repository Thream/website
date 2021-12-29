import InfiniteScroll from 'react-infinite-scroll-component'

import { GuildsChannelsPath } from '../Application'
import { Loader } from 'components/design/Loader'
import { Channel } from './Channel'
import { useChannels } from 'contexts/Channels'

export interface ChannelsProps {
  path: GuildsChannelsPath
}

export const Channels: React.FC<ChannelsProps> = (props) => {
  const { path } = props

  const { channels, hasMore, nextPage } = useChannels()

  return (
    <div
      id='channels'
      className='scrollbar-firefox-support overflow-y-auto flex-1 flex flex-col'
    >
      <InfiniteScroll
        className='w-full channels-list'
        scrollableTarget='channels'
        dataLength={channels.length}
        next={nextPage}
        hasMore={hasMore}
        loader={<Loader />}
      >
        {channels.map((channel) => {
          const selected = channel.id === path.channelId
          return (
            <Channel
              key={channel.id}
              channel={channel}
              path={path}
              selected={selected}
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}
