import Link from 'next/link'

import { Input } from 'components/design/Input'
import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { FormState } from 'components/Authentication/FormState'
import { Container } from 'components/design/Container'
import { AuthenticationFormLayout } from 'components/Authentication/AuthenticationFormLayout'
import { emailSchema } from 'components/Authentication/AuthenticationForm'
import { useForm } from 'hooks/useForm'
import { api } from 'utils/api'
import { authenticationFromServerSide } from 'utils/authentication'
import useTranslation from 'next-translate/useTranslation'

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
  const { t } = useTranslation()

  return (
    <>
      <Head title={`Thream | ${t('authentication:forgot-password')}`} />

      <Header />
      <Container>
        <AuthenticationFormLayout
          onChange={handleChange}
          onSubmit={handleSubmit(async (formData) => {
            await api.post(
              `/users/resetPassword?redirectURI=${window.location.origin}/authentication/reset-password`,
              formData
            )
            return await t('authentication:success-forgot-password')
          })}
          link={
            <p>
              <Link href='/authentication/signin'>
                <a>{t('authentication:already-know-password')}</a>
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
