import useTranslation from 'next-translate/useTranslation'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AnimatePresence } from 'framer-motion'

import { Loader } from '../../design/Loader'
import { Message } from './Message'
import { useMessages } from '../../../contexts/Messages'
import { Emoji } from '../../Emoji'

export const Messages: React.FC = () => {
  const { t } = useTranslation()
  const { messages, hasMore, nextPage } = useMessages()

  if (messages.length === 0) {
    return (
      <div
        id='messages'
        className='scrollbar-firefox-support mt-8 flex w-full flex-1 flex-col overflow-y-auto text-center text-lg transition-all'
      >
        <p>
          {t('application:nothing-here')} <Emoji value=':ghost:' size={20} />
        </p>
        <p>{t('application:start-chatting-kill-ghost')}</p>
      </div>
    )
  }

  return (
    <div
      id='messages'
      className='scrollbar-firefox-support flex w-full flex-1 flex-col-reverse overflow-y-auto transition-all'
    >
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  )
}
