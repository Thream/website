import Head from 'components/Head'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'
import { Application } from 'components/Application'

const ApplicationPage: React.FC<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <Head title='Thream | Application' />
      <Application />
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default ApplicationPage
