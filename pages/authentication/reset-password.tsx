import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { HandleForm } from 'react-component-form'
import axios from 'axios'
import { Type } from '@sinclair/typebox'

import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { Main } from 'components/design/Main'
import { Footer, FooterProps } from 'components/Footer'
import { Input } from 'components/design/Input'
import { Button } from 'components/design/Button'
import { FormState } from 'components/design/FormState'
import { useFormState } from 'hooks/useFormState'
import { authenticationFromServerSide } from 'utils/authentication'
import { AuthenticationForm } from 'components/Authentication'
import { ScrollableBody } from 'components/ScrollableBody/ScrollableBody'
import { api } from 'utils/api'
import { userSchema } from '../../models/User'
import { ajv } from '../../utils/ajv'

const ResetPassword: React.FC<FooterProps> = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { version } = props
  const [formState, setFormState] = useFormState()
  const [messageTranslationKey, setMessageTranslationKey] = useState<
    string | undefined
  >(undefined)

  const validateSchema = useMemo(() => {
    return Type.Object({
      password: userSchema.password
    })
  }, [])

  const validate = useMemo(() => {
    return ajv.compile(validateSchema)
  }, [validateSchema])

  const handleSubmit: HandleForm = async (formData, formElement) => {
    const isValid = validate(formData)
    if (!isValid) {
      setFormState('error')
      setMessageTranslationKey('errors:invalid')
    } else {
      setFormState('loading')
      try {
        await api.put(`/users/reset-password`, {
          ...formData,
          temporaryToken: router.query.temporaryToken
        })
        await router.push('/authentication/signin')
      } catch (error) {
        setFormState('error')
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          setMessageTranslationKey('errors:invalid')
        } else {
          setMessageTranslationKey('errors:server-error')
        }
      }
    }
  }

  return (
    <ScrollableBody>
      <Head title={`Thream | ${t('authentication:reset-password')}`} />
      <Header />
      <Main>
        <AuthenticationForm onSubmit={handleSubmit}>
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
          state={formState}
          message={
            messageTranslationKey != null ? t(messageTranslationKey) : null
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
