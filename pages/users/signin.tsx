import { AuthenticationLayout } from 'components/Authentication/AuthenticationLayout'
import Head from 'components/Head'

const Signin: React.FC = () => {
  return (
    <>
      <Head />
      <AuthenticationLayout
        layoutContent={{
          title: 'New here ?',
          description:
            ' Then create your boring and <br /> stupid account, now!',
          buttonText: 'Create'
        }}

      />
    </>
  )
}

export default Signin
