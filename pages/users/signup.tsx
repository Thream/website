import { AuthenticationLayout } from 'components/Authentication/AuthenticationLayout'
import Head from 'components/Head'

const Signup: React.FC = () => {
  return (
    <>
      <Head />
      <AuthenticationLayout
        layoutContent={{
          title: 'Already have an <br /> account ?',
          description:
            'Then why are you here ? Come <br /> on you gotta do better next time.',
          buttonText: 'Login'
        }}
        isReversed
      />
    </>
  )
}

export default Signup
