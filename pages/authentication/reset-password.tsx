import { NextPage } from 'next'
import { useRouter } from 'next/router'
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
import { AuthenticationForm } from 'components/Authentication'
import { ScrollableBody } from 'components/ScrollableBody/ScrollableBody'
import { api } from 'utils/api'
import { userSchema } from '../../models/User'
import { HandleSubmitCallback, useForm } from 'hooks/useForm'

const ResetPassword: NextPage<FooterProps> = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { version } = props

  const { fetchState, message, errors, getErrorTranslation, handleSubmit } =
    useForm({ validateSchemaObject: { password: userSchema.password } })

  const onSubmit: HandleSubmitCallback = async (formData) => {
    try {
      await api.put(`/users/reset-password`, {
        ...formData,
        temporaryToken: router.query.temporaryToken
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
    <ScrollableBody>
      <Head title={`Thream | ${t('authentication:reset-password')}`} />
      <Header />
      <Main>
        <AuthenticationForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='password'
            placeholder='Password'
            name='password'
            label='Password'
          />
          <Button data-cy='submit' className='w-full mt-6' type='submit'>
            {t('authentication:submit')}
          </Button>
        </AuthenticationForm>
        <FormState
          id='message'
          state={fetchState}
          message={
            message != null ? message : getErrorTranslation(errors.password)
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

export default ResetPassword
