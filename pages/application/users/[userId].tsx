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

const UserProfilePage: NextPage<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <GuildsProvider>
        <Head title='Thream | Settings' />
        <Application
          path={`/application/users/${props.authentication.user.id}`}
          title='Settings'
        >
          <UserProfile user={props.authentication.user} />
        </Application>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default UserProfilePage
