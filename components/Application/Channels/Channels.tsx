import InfiniteScroll from "react-infinite-scroll-component"

import { useChannels } from "../../../contexts/Channels"
import type { GuildsChannelsPath } from "../Application"
import { Loader } from "../../design/Loader"
import { Channel } from "./Channel"

export interface ChannelsProps {
  path: GuildsChannelsPath
}

export const Channels: React.FC<ChannelsProps> = (props) => {
  const { path } = props

  const { channels, hasMore, nextPage } = useChannels()

  return (
    <div
      id="channels"
      className="scrollbar-firefox-support flex flex-1 flex-col overflow-y-auto"
    >
      <InfiniteScroll
        className="channels-list w-full"
        scrollableTarget="channels"
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
