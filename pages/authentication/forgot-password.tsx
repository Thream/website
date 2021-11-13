import Link from 'next/link'
import { AuthenticationForm } from 'components/Authentication'
import useTranslation from 'next-translate/useTranslation'
import axios from 'axios'

import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { Main } from 'components/design/Main'
import { Footer, FooterProps } from 'components/Footer'
import { Input } from 'components/design/Input'
import { Button } from 'components/design/Button'
import { FormState } from 'components/design/FormState'
import { authenticationFromServerSide } from 'utils/authentication'
import { ScrollableBody } from 'components/ScrollableBody'
import { userSchema } from 'models/User'
import { api } from 'utils/api'
import { HandleSubmitCallback, useForm } from 'hooks/useForm'

const ForgotPassword: React.FC<FooterProps> = (props) => {
  const { t } = useTranslation()
  const { version } = props

  const { fetchState, message, errors, getErrorTranslation, handleSubmit } =
    useForm({ validateSchemaObject: { email: userSchema.email } })

  const onSubmit: HandleSubmitCallback = async (formData) => {
    try {
      await api.post(
        `/users/reset-password?redirectURI=${window.location.origin}/authentication/reset-password`,
        formData
      )
      return {
        type: 'success',
        value: 'authentication:success-forgot-password'
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        return {
          type: 'error',
          value: 'errors:email'
        }
      }
      return {
        type: 'error',
        value: 'errors:server-error'
      }
    }
  }

  return (
    <ScrollableBody>
      <Head title={`Thream | ${t('authentication:forgot-password')}`} />
      <Header />
      <Main>
        <AuthenticationForm onSubmit={handleSubmit(onSubmit)}>
          <Input type='email' placeholder='Email' name='email' label='Email' />
          <Button data-cy='submit' className='w-full mt-6' type='submit'>
            {t('authentication:submit')}
          </Button>
          <p className='mt-3 font-headline text-sm text-green-800 dark:text-green-400 hover:underline'>
            <Link href='/authentication/signin'>
              <a>{t('authentication:already-know-password')}</a>
            </Link>
          </p>
        </AuthenticationForm>
        <FormState
          id='message'
          state={fetchState}
          message={
            message != null ? message : getErrorTranslation(errors.email)
          }
        />
      </Main>
      <Footer version={version} />
    </ScrollableBody>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: false,
  fetchData: async () => {
    const { readPackage } = await import('read-pkg')
    const { version } = await readPackage()
    return { version }
  }
})

export default ForgotPassword
