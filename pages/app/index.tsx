import { Button } from 'components/design/Button'
import Head from 'components/Head'
import { Header } from 'components/Header'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication,
  useAuthentication
} from 'utils/authentication'

const UserProfile: React.FC = () => {
  const { authentication, user } = useAuthentication()

  return (
    <>
      <p>Welcome {user.name}!</p>
      <Button onClick={async () => await authentication.signout()}>
        Signout
      </Button>
    </>
  )
}

const Application: React.FC<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <Head title='Thream | Application' />

      <Header />
      <UserProfile />
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default Application
