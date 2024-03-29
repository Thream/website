import type { NextPage } from "next"

import { Head } from "../../../../components/Head"
import { Application } from "../../../../components/Application"
import type { PagePropsWithAuthentication } from "../../../../tools/authentication"
import {
  authenticationFromServerSide,
  AuthenticationProvider,
} from "../../../../tools/authentication"
import { UserProfile } from "../../../../components/Application/UserProfile"
import { GuildsProvider } from "../../../../contexts/Guilds"
import type { UserPublic } from "../../../../models/User"
import type { Guild } from "../../../../models/Guild"

export interface UserProfilePageProps extends PagePropsWithAuthentication {
  user: UserPublic
  guilds: Guild[]
}

const UserProfilePage: NextPage<UserProfilePageProps> = (props) => {
  const { user, guilds, authentication } = props

  return (
    <AuthenticationProvider authentication={authentication}>
      <GuildsProvider>
        <Head title={`Thream | ${user.name}`} />
        <Application path={`/application/users/${user.id}`} title={user.name}>
          <UserProfile user={user} guilds={guilds} />
        </Application>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
  fetchData: async (context, api) => {
    const userId = Number(context?.params?.["userId"])
    if (Number.isNaN(userId)) {
      return {
        notFound: true,
      }
    }
    const { data } = await api.get(`/users/${userId}`)
    return {
      user: data.user,
      guilds: data.guilds,
    }
  },
})

export default UserProfilePage
