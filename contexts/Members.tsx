import { createContext, useContext, useEffect, useMemo } from 'react'

import { NextPage, usePagination } from '../hooks/usePagination'
import { useAuthentication } from '../tools/authentication'
import { MemberWithPublicUser } from '../models/Member'
import { GuildsChannelsPath } from '../components/Application'
import { handleSocketData, SocketData } from '../tools/handleSocketData'
import { User } from '../models/User'
import { CacheKey, MEMBERS_CACHE_KEY } from '../tools/cache'

export interface Members {
  members: MemberWithPublicUser[]
  hasMore: boolean
  nextPage: NextPage
}

const defaultMembersContext = {} as any
const MembersContext = createContext<Members>(defaultMembersContext)

export interface MembersProviderProps {
  path: GuildsChannelsPath
}

export const MembersProviders: React.FC<
  React.PropsWithChildren<MembersProviderProps>
> = (props) => {
  const { children, path } = props

  const { authentication } = useAuthentication()

  const cacheKey = useMemo<CacheKey>(() => {
    return `${path.guildId}-${MEMBERS_CACHE_KEY}`
  }, [path.guildId])

  const {
    items: members,
    hasMore,
    nextPage,
    resetPagination,
    setItems
  } = usePagination<MemberWithPublicUser>({
    api: authentication.api,
    url: `/guilds/${path.guildId}/members`,
    cacheKey
  })

  useEffect(() => {
    authentication?.socket?.on(
      'members',
      (data: SocketData<MemberWithPublicUser>) => {
        handleSocketData({ data, setItems, cacheKey })
      }
    )

    authentication?.socket?.on('users', (data: SocketData<User>) => {
      setItems((oldItems) => {
        const newItems = [...oldItems]
        switch (data.action) {
          case 'update': {
            for (const member of newItems) {
              if (member.user.id === data.item.id) {
                member.user = data.item
                break
              }
            }
            break
          }
        }
        return newItems
      })
    })

    return () => {
      authentication?.socket?.off('members')
      authentication?.socket?.off('users')
    }
  }, [authentication.socket, setItems, cacheKey])

  useEffect(() => {
    resetPagination()
    nextPage()
  }, [nextPage, resetPagination])

  return (
    <MembersContext.Provider value={{ members, hasMore, nextPage }}>
      {children}
    </MembersContext.Provider>
  )
}

export const useMembers = (): Members => {
  const members = useContext(MembersContext)
  if (members === defaultMembersContext) {
    throw new Error('`useMembers` must be used within `MembersProvider`')
  }
  return members
}
