import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Message } from './Message'
import { Loader } from 'components/design/Loader'
import { useMessages } from 'contexts/Messages'
import { Emoji } from 'emoji-mart'
import { emojiSet } from 'components/Emoji'

export const Messages: React.FC = () => {
  const { messages, nextPage } = useMessages()

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [])

  if (messages.rows.length === 0) {
    return (
      <div id='messages'>
        <p>
          Nothing to show here!{' '}
          <Emoji set={emojiSet} emoji=':ghost:' size={20} />
        </p>
        <p>Start chatting to kill this Ghost!</p>
      </div>
    )
  }

  return (
    <>
      <div id='messages'>
        <InfiniteScroll
          dataLength={messages.rows.length}
          next={nextPage}
          inverse
          scrollableTarget='messages'
          hasMore={messages.hasMore}
          loader={<Loader />}
        >
          {messages.rows.map((message) => {
            return <Message key={message.id} {...message} />
          })}
        </InfiniteScroll>
      </div>

      <style jsx>
        {`
          #messages {
            overflow-y: scroll;
            display: flex;
            flex-direction: column-reverse;
            height: 800px;
          }
        `}
      </style>
    </>
  )
}
