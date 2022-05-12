import { createContext, useContext, useEffect } from 'react'

import { NextPage, usePagination } from '../hooks/usePagination'
import { useAuthentication } from '../tools/authentication'
import { MessageWithMember } from '../models/Message'
import { GuildsChannelsPath } from '../components/Application'
import { handleSocketData, SocketData } from '../tools/handleSocketData'

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

export const MessagesProvider: React.FC<
  React.PropsWithChildren<MessagesProviderProps>
> = (props) => {
  const { path, children } = props
  const { authentication } = useAuthentication()

  const {
    items: messages,
    hasMore,
    nextPage,
    resetPagination,
    setItems
  } = usePagination<MessageWithMember>({
    api: authentication.api,
    url: `/channels/${path.channelId}/messages`,
    inverse: true
  })

  useEffect(() => {
    authentication.socket.on(
      'messages',
      (data: SocketData<MessageWithMember>) => {
        if (data.item.channelId === path.channelId) {
          const messagesDiv = window.document.getElementById(
            'messages'
          ) as HTMLDivElement
          const isAtBottom =
            messagesDiv.scrollHeight - messagesDiv.scrollTop <=
            messagesDiv.clientHeight
          handleSocketData({ data, setItems })
          if (data.action === 'create' && isAtBottom) {
            messagesDiv.scrollTo(0, messagesDiv.scrollHeight)
          }
        }
      }
    )

    return () => {
      authentication.socket.off('messages')
    }
  }, [authentication.socket, setItems, path])

  useEffect(() => {
    resetPagination()
    nextPage(undefined, () => {
      const messagesDiv = window.document.getElementById(
        'messages'
      ) as HTMLDivElement
      messagesDiv.scrollTo(0, messagesDiv.scrollHeight)
    })
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
