import { NextPage } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'
import { JoinGuildsPublic } from 'components/Application/JoinGuildsPublic'
import { GuildsProvider } from 'contexts/Guilds'

const JoinGuildPage: NextPage<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <GuildsProvider>
        <Head title='Thream | Application' />
        <Application path='/application/guilds/join'>
          <JoinGuildsPublic />
        </Application>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default JoinGuildPage
