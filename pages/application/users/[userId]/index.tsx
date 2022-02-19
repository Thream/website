import { NextPage } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'tools/authentication'
import { UserProfile } from 'components/Application/UserProfile'
import { GuildsProvider } from 'contexts/Guilds'
import { UserPublic } from 'models/User'
import { Guild } from 'models/Guild'

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
    const userId = Number(context?.params?.userId)
    if (isNaN(userId)) {
      return {
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }
    const { data } = await api.get(`/users/${userId}`)
    return {
      user: data.user,
      guilds: data.guilds
    }
  }
})

export default UserProfilePage
