import { useRouter } from 'next/router'

import Head from 'components/Head'
import { Authentication as AuthenticationComponent } from 'components/Authentication'
import { api } from 'utils/api'
import {
  Authentication,
  authenticationFromServerSide,
  Tokens
} from 'utils/authentication'

const Signin: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <Head title='Thream | Signin' />
      <AuthenticationComponent
        mode='signin'
        onSubmit={async (formData) => {
          const { data } = await api.post<Tokens>('/users/signin', formData)
          const authentication = new Authentication(data)
          authentication.signin()
          await router.push('/app/profile')
          return null
        }}
      />
    </>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: false
})

export default Signin
