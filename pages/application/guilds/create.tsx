import { Head } from 'components/Head'
import { Application } from 'components/Application'

import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'
import { CreateGuild } from 'components/Application/CreateGuild'

const CreateGuildPage: React.FC<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <Head title='Thream | Create a Guild' />
      <Application path='/application/guilds/create'>
        <CreateGuild />
      </Application>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default CreateGuildPage
