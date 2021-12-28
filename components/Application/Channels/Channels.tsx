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
    <InfiniteScroll
      className='w-full channels-list'
      dataLength={channels.length}
      next={nextPage}
      hasMore={hasMore}
      loader={<Loader />}
    >
      {channels.map((channel) => {
        return <Channel key={channel.id} channel={channel} path={path} />
      })}
    </InfiniteScroll>
  )
}
