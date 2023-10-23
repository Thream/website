import { createContext, useContext, useEffect, useMemo } from "react"

import type { NextPage } from "../hooks/usePagination"
import { usePagination } from "../hooks/usePagination"
import { useAuthentication } from "../tools/authentication"
import type { MessageWithMember } from "../models/Message"
import type { GuildsChannelsPath } from "../components/Application"
import type { SocketData } from "../tools/handleSocketData"
import { handleSocketData } from "../tools/handleSocketData"
import type { CacheKey } from "../tools/cache"
import { MESSAGES_CACHE_KEY } from "../tools/cache"

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
  const { authentication, user } = useAuthentication()

  const cacheKey = useMemo<CacheKey>(() => {
    return `${path.channelId}-${MESSAGES_CACHE_KEY}`
  }, [path.channelId])

  const {
    items: messages,
    hasMore,
    nextPage,
    resetPagination,
    setItems,
  } = usePagination<MessageWithMember>({
    api: authentication.api,
    url: `/channels/${path.channelId}/messages`,
    inverse: true,
    cacheKey,
  })

  useEffect(() => {
    authentication?.socket?.on(
      "messages",
      (data: SocketData<MessageWithMember>) => {
        if (data.item.channelId === path.channelId) {
          const messagesDiv = window.document.getElementById(
            "messages",
          ) as HTMLDivElement
          const isAtBottom =
            messagesDiv.scrollHeight - messagesDiv.scrollTop <=
            messagesDiv.clientHeight
          handleSocketData({ data, setItems, cacheKey })
          if (
            data.action === "create" &&
            (isAtBottom || data.item.member.userId === user.id)
          ) {
            messagesDiv.scrollTo(0, messagesDiv.scrollHeight)
          }
        }
      },
    )

    return () => {
      authentication?.socket?.off("messages")
    }
  }, [authentication.socket, setItems, path, user.id, cacheKey])

  useEffect(() => {
    resetPagination()
    nextPage(undefined, () => {
      const messagesDiv = window.document.getElementById(
        "messages",
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
    throw new Error("`useMessages` must be used within a `MessagesProvider`")
  }
  return messages
}
