import { Head } from 'components/Head'
import { Application } from 'components/Application'
import { PopupGuild } from 'components/Application/PopupGuild/PopupGuild.stories'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'

const ApplicationPage: React.FC<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <Head title='Thream | Application' />
      <Application path='/application'>
        <PopupGuild />
      </Application>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default ApplicationPage
