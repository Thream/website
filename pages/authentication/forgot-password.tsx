import type { NextPage } from 'next'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import axios from 'axios'
import { useForm } from 'react-component-form'
import type { HandleUseFormCallback } from 'react-component-form'

import { AuthenticationForm } from '../../components/Authentication'
import { Head } from '../../components/Head'
import { Header } from '../../components/Header'
import { Main } from '../../components/design/Main'
import type { FooterProps } from '../../components/Footer'
import { Footer } from '../../components/Footer'
import { Input } from '../../components/design/Input'
import { Button } from '../../components/design/Button'
import { FormState } from '../../components/design/FormState'
import { authenticationFromServerSide } from '../../tools/authentication'
import { userSchema } from '../../models/User'
import { api } from '../../tools/api'
import { useFormTranslation } from '../../hooks/useFormTranslation'

const schema = {
  email: userSchema.email
}

const ForgotPassword: NextPage<FooterProps> = (props) => {
  const { t } = useTranslation()
  const { version } = props

  const { handleUseForm, fetchState, message, errors } = useForm(schema)
  const { getFirstErrorTranslation } = useFormTranslation()

  const onSubmit: HandleUseFormCallback<typeof schema> = async (
    formData,
    formElement
  ) => {
    try {
      await api.post(
        `/users/reset-password?redirectURI=${window.location.origin}/authentication/reset-password`,
        formData
      )
      formElement.reset()
      return {
        type: 'success',
        value: 'authentication:success-forgot-password'
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        return {
          type: 'error',
          value: 'errors:invalid-email'
        }
      }
      return {
        type: 'error',
        value: 'errors:server-error'
      }
    }
  }

  return (
    <>
      <Head title={`Thream | ${t('authentication:forgot-password')}`} />
      <Header />
      <Main>
        <AuthenticationForm onSubmit={handleUseForm(onSubmit)}>
          <Input type='email' placeholder='Email' name='email' label='Email' />
          <Button data-cy='submit' className='mt-6 w-full' type='submit'>
            {t('authentication:submit')}
          </Button>
          <p className='mt-3 font-headline text-sm text-green-800 hover:underline dark:text-green-400'>
            <Link href='/authentication/signin'>
              {t('authentication:already-know-password')}
            </Link>
          </p>
        </AuthenticationForm>
        <FormState
          id='message'
          state={fetchState}
          message={
            message != null
              ? t(message)
              : getFirstErrorTranslation(errors.email)
          }
        />
      </Main>
      <Footer version={version} />
    </>
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
