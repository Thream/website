import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import axios from 'axios'
import { useForm } from 'react-component-form'
import type { HandleUseFormCallback } from 'react-component-form'

import { Head } from '../../components/Head'
import { Header } from '../../components/Header'
import { FormState } from '../../components/design/FormState'
import { Main } from '../../components/design/Main'
import type { FooterProps } from '../../components/Footer'
import { Footer } from '../../components/Footer'
import { Input } from '../../components/design/Input'
import { Button } from '../../components/design/Button'
import { authenticationFromServerSide } from '../../tools/authentication'
import { AuthenticationForm } from '../../components/Authentication'
import { api } from '../../tools/api'
import { userSchema } from '../../models/User'
import { useFormTranslation } from '../../hooks/useFormTranslation'

const schema = {
  password: userSchema.password
}

const ResetPassword: NextPage<FooterProps> = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { version } = props

  const { handleUseForm, fetchState, message, errors } = useForm(schema)
  const { getFirstErrorTranslation } = useFormTranslation()

  const onSubmit: HandleUseFormCallback<typeof schema> = async (formData) => {
    try {
      await api.put(`/users/reset-password`, {
        ...formData,
        temporaryToken: router.query['temporaryToken']
      })
      await router.push('/authentication/signin')
      return null
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        return {
          type: 'error',
          value: 'errors:invalid'
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
      <Head title={`Thream | ${t('authentication:reset-password')}`} />
      <Header />
      <Main>
        <AuthenticationForm onSubmit={handleUseForm(onSubmit)}>
          <Input
            type='password'
            placeholder='Password'
            name='password'
            label='Password'
          />
          <Button data-cy='submit' className='mt-6 w-full' type='submit'>
            {t('authentication:submit')}
          </Button>
        </AuthenticationForm>
        <FormState
          id='message'
          state={fetchState}
          message={
            message != null
              ? t(message)
              : getFirstErrorTranslation(errors.password)
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

export default ResetPassword
