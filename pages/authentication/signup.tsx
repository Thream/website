import Head from 'components/Head'
import { Authentication } from 'components/Authentication'
import { api } from 'utils/api'
import { useTheme } from 'contexts/Theme'
import { authenticationFromServerSide } from 'utils/authentication'

const Signup: React.FC = () => {
  const { theme } = useTheme()

  return (
    <>
      <Head title='Thream | Signup' />
      <Authentication
        mode='signup'
        onSubmit={async (formData) => {
          await api.post(
            `/users/signup?redirectURI=${window.location.origin}/authentication/signin`,
            { ...formData, language: 'en', theme }
          )
          return "You're almost there, please check your emails to confirm registration."
        }}
      />
    </>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: false
})

export default Signup
