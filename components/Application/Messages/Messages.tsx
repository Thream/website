import InfiniteScroll from 'react-infinite-scroll-component'

import { Loader } from '../../design/Loader'
import { Message } from './Message'
import { useMessages } from '../../../contexts/Messages'
import { Emoji } from '../../Emoji'

export const Messages: React.FC = () => {
  const { messages, hasMore, nextPage } = useMessages()

  if (messages.length === 0) {
    return (
      <div
        id='messages'
        className='w-full scrollbar-firefox-support overflow-y-auto transition-all flex-1 flex flex-col text-center mt-8 text-lg'
      >
        <p>
          Nothing to show here! <Emoji value=':ghost:' size={20} />
        </p>
        <p>Start chatting to kill this Ghost!</p>
      </div>
    )
  }

  return (
    <div
      id='messages'
      className='w-full scrollbar-firefox-support overflow-y-auto transition-all flex-1 flex flex-col-reverse'
    >
      <InfiniteScroll
        scrollableTarget='messages'
        className='messages-list !overflow-x-hidden'
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
