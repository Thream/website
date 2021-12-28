import { NextPage } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import { PopupGuild } from 'components/Application/PopupGuild'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'
import { GuildsProvider } from 'contexts/Guilds'

const ApplicationPage: NextPage<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <GuildsProvider>
        <Head title='Thream | Application' />
        <Application path='/application'>
          <PopupGuild />
        </Application>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default ApplicationPage
