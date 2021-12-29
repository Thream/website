import { createContext, useContext, useEffect } from 'react'

import { NextPage, usePagination } from 'hooks/usePagination'
import { useAuthentication } from 'utils/authentication'
import { MessageWithMember } from 'models/Message'
import { GuildsChannelsPath } from 'components/Application'

export interface Messages {
  messages: MessageWithMember[]
  hasMore: boolean
  nextPage: NextPage
}

const defaultMessagesContext = {} as any
const MessagesContext = createContext<Messages>(defaultMessagesContext)

export interface MessagesProviderProps {
  path: GuildsChannelsPath
}

export const MessagesProvider: React.FC<MessagesProviderProps> = (props) => {
  const { path, children } = props

  const { authentication } = useAuthentication()

  const {
    items: messages,
    hasMore,
    nextPage,
    resetPagination
  } = usePagination<MessageWithMember>({
    api: authentication.api,
    url: `/channels/${path.channelId}/messages`
  })

  useEffect(() => {
    resetPagination()
    nextPage()
  }, [nextPage, resetPagination])

  return (
    <MessagesContext.Provider value={{ messages, hasMore, nextPage }}>
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessages = (): Messages => {
  const messages = useContext(MessagesContext)
  if (messages === defaultMessagesContext) {
    throw new Error('useMessages must be used within a MessagesProvider')
  }
  return messages
}
