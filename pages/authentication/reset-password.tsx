import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { Input } from 'components/design/Input'
import { Header } from 'components/Header'
import { FormState } from 'components/Authentication/FormState'
import { Container } from 'components/design/Container'
import { AuthenticationFormLayout } from 'components/Authentication/AuthenticationFormLayout'
import { passwordSchema } from 'components/Authentication/AuthenticationForm'
import { useForm } from 'hooks/useForm'
import { api } from 'utils/api'
import { authenticationFromServerSide } from 'utils/authentication'

const ResetPassword: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const {
    getErrorMessages,
    formState,
    message,
    handleChange,
    handleSubmit
  } = useForm({
    validatorSchema: passwordSchema
  })

  return (
    <>
      <Head title={`Thream | ${t('authentication:reset-password')}`} />

      <Header />
      <Container>
        <AuthenticationFormLayout
          onChange={handleChange}
          onSubmit={handleSubmit(async (formData) => {
            await api.put('/users/resetPassword', {
              ...formData,
              tempToken: router.query.tempToken
            })
            await router.push('/authentication/signin')
            return null
          })}
        >
          <Input
            errors={getErrorMessages('password')}
            type='password'
            placeholder='Password'
            name='password'
            label='Password'
          />
        </AuthenticationFormLayout>
        <FormState state={formState} message={message} />
      </Container>

      <style jsx>
        {`
          .text-center {
            text-align: center;
          }
          .signin-link {
            font-size: 16px;
          }
        `}
      </style>
    </>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: false
})

export default ResetPassword
