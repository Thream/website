import { createContext, useContext, useEffect } from 'react'

import { NextPage, usePagination } from 'hooks/usePagination'
import { useAuthentication } from 'tools/authentication'
import { MemberWithPublicUser } from 'models/Member'
import { GuildsChannelsPath } from 'components/Application'

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

export const MembersProviders: React.FC<MembersProviderProps> = (props) => {
  const { children, path } = props

  const { authentication } = useAuthentication()

  const {
    items: members,
    hasMore,
    nextPage,
    resetPagination
  } = usePagination<MemberWithPublicUser>({
    api: authentication.api,
    url: `/guilds/${path.guildId}/members`
  })

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
    throw new Error('useMembers must be used within MembersProvider')
  }
  return members
}
