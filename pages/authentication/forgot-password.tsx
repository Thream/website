import { useState, useMemo } from 'react'
import Link from 'next/link'
import { AuthenticationForm } from 'components/Authentication'
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
import { ScrollableBody } from 'components/ScrollableBody'
import { api } from 'utils/api'
import { userSchema } from '../../models/User'
import { ajv } from '../../utils/ajv'

const ForgotPassword: React.FC<FooterProps> = (props) => {
  const { t } = useTranslation()
  const { version } = props
  const [formState, setFormState] = useFormState()
  const [messageTranslationKey, setMessageTranslationKey] = useState<
    string | undefined
  >(undefined)

  const validateSchema = useMemo(() => {
    return Type.Object({
      email: userSchema.email
    })
  }, [])

  const validate = useMemo(() => {
    return ajv.compile(validateSchema)
  }, [validateSchema])

  const handleSubmit: HandleForm = async (formData, formElement) => {
    const isValid = validate(formData)
    if (!isValid) {
      setFormState('error')
      setMessageTranslationKey('errors:email')
    } else {
      setFormState('loading')
      try {
        await api.post(
          `/users/reset-password?redirectURI=${window.location.origin}/authentication/reset-password`,
          formData
        )
        formElement.reset()
        setFormState('success')
        setMessageTranslationKey('authentication:success-forgot-password')
      } catch (error) {
        setFormState('error')
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          setMessageTranslationKey('errors:email')
        } else {
          setMessageTranslationKey('errors:server-error')
        }
      }
    }
  }

  return (
    <ScrollableBody>
      <Head title={`Thream | ${t('authentication:forgot-password')}`} />
      <Header />
      <Main>
        <AuthenticationForm onSubmit={handleSubmit}>
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

export default ForgotPassword
