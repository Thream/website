import { Head } from 'components/Head'
import { Application } from 'components/Application'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'
import { JoinGuildsPublic } from 'components/Application/JoinGuildsPublic'

const JoinGuildPage: React.FC<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <Head title='Thream | Application' />
      <Application path='/application/guilds/join'>
        <JoinGuildsPublic />
      </Application>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default JoinGuildPage
