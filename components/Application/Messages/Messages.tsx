import InfiniteScroll from 'react-infinite-scroll-component'

import { Loader } from 'components/design/Loader'
import { Message } from './Message'
import { useMessages } from 'contexts/Messages'

export const Messages: React.FC = () => {
  const { messages, hasMore, nextPage } = useMessages()

  return (
    <div
      id='messages'
      className='w-full scrollbar-firefox-support overflow-y-auto transition-all flex-1 flex flex-col-reverse'
    >
      <InfiniteScroll
        scrollableTarget='messages'
        className='messages-list'
        dataLength={messages.length}
        next={nextPage}
        inverse
        hasMore={hasMore}
        loader={<Loader />}
      >
        {messages.map((message) => {
          return <Message key={message.id} message={message} />
        })}
      </InfiniteScroll>
    </div>
  )
}
