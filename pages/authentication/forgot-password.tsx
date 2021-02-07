import Link from 'next/link'

import { Input } from 'components/design/Input'
import Head from 'components/Head'
import { Header } from 'components/Header'
import { FormState } from 'components/Authentication/FormState'
import { Container } from 'components/design/Container'
import { AuthenticationFormLayout } from 'components/Authentication/AuthenticationFormLayout'
import { emailSchema } from 'components/Authentication/AuthenticationForm'
import { useForm } from 'hooks/useForm'
import { api } from 'utils/api'
import { authenticationFromServerSide } from 'utils/authentication'

const ForgotPassword: React.FC = () => {
  const {
    getErrorMessages,
    formState,
    message,
    handleChange,
    handleSubmit
  } = useForm({
    validatorSchema: emailSchema
  })

  return (
    <>
      <Head title='Thream | Forgot Password' />

      <Header />
      <Container>
        <AuthenticationFormLayout
          onChange={handleChange}
          onSubmit={handleSubmit(async (formData) => {
            await api.post(
              `/users/resetPassword?redirectURI=${window.location.origin}/authentication/reset-password`,
              formData
            )
            return 'Password-reset request successful, please check your emails!'
          })}
          link={
            <p>
              <Link href='/authentication/signin'>
                <a>Already know your password ?</a>
              </Link>
            </p>
          }
        >
          <Input
            errors={getErrorMessages('email')}
            type='email'
            placeholder='Email'
            name='email'
            label='Email'
          />
        </AuthenticationFormLayout>
        <FormState state={formState} message={message} />
      </Container>
    </>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: false
})

export default ForgotPassword
