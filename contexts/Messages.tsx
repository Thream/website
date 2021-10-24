import { createContext, useContext, useEffect } from 'react'

import { NextPage, PaginationData, usePagination } from 'hooks/usePagination'
import { useAuthentication, User } from 'utils/authentication'
import { handleSocketData, SocketData } from 'utils/handleSocketData'

export type MessageType = 'text' | 'file'

export interface MessageData {
  value: string
  type: MessageType
}

export interface Message extends MessageData {
  id: number
  mimetype: string
  memberId: number
  channelId: number
  createdAt: string
  updatedAt: string
  user: User
}

export type Messages = PaginationData<Message>

export interface MessagesValue {
  messages: Messages
  nextPage: NextPage
}

export interface MessagesProviderProps {
  messages: Messages
  channelId: string
}

const defaultGuildsContext: MessagesValue = {} as any
const MessagesContext = createContext<MessagesValue>(defaultGuildsContext)

export const MessagesProvider: React.FC<MessagesProviderProps> = (props) => {
  const { authentication } = useAuthentication()
  const { data: messages, nextPage, setData } = usePagination<Message>({
    url: `/channels/${props.channelId}/messages`,
    api: authentication.api,
    defaultPaginationData: props.messages,
    inverse: true
  })

  useEffect(() => {
    setData(props.messages)
  }, [props.messages])

  useEffect(() => {
    authentication.socket.on('messages', (socketData: SocketData) => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      handleSocketData({ setData })(socketData)
      if (isAtBottom) {
        window.scrollTo(0, document.body.scrollHeight)
      }
    })
  }, [])

  return (
    <MessagesContext.Provider value={{ messages, nextPage }}>
      {props.children}
    </MessagesContext.Provider>
  )
}

export const useMessages = (): MessagesValue => {
  return useContext(MessagesContext)
}
