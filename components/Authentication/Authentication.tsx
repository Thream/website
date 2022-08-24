import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useTheme } from 'next-themes'
import axios from 'axios'

import { Main } from '../design/Main'
import { Input } from '../design/Input'
import { Button } from '../design/Button'
import { FormState } from '../design/FormState'
import { AuthenticationForm } from '.'
import { userSchema } from '../../models/User'
import { api } from '../../tools/api'
import {
  Tokens,
  Authentication as AuthenticationClass
} from '../../tools/authentication'
import { useForm, HandleSubmitCallback } from '../../hooks/useForm'
import { AuthenticationSocialMedia } from './AuthenticationSocialMedia'

export interface AuthenticationProps {
  mode: 'signup' | 'signin'
}

export const Authentication: React.FC<AuthenticationProps> = (props) => {
  const { mode } = props

  const router = useRouter()
  const { lang, t } = useTranslation()
  const { theme } = useTheme()

  const { errors, fetchState, message, getErrorTranslation, handleSubmit } =
    useForm({
      validateSchema: {
        ...(mode === 'signup' && { name: userSchema.name }),
        email: userSchema.email,
        password: userSchema.password
      },
      resetOnSuccess: true
    })

  const onSubmit: HandleSubmitCallback = async (formData) => {
    if (mode === 'signup') {
      try {
        await api.post(
          `/users/signup?redirectURI=${window.location.origin}/authentication/signin`,
          { ...formData, language: lang, theme }
        )
        return {
          type: 'success',
          value: 'authentication:success-signup'
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          const message = error.response.data.message as string
          if (message.endsWith('already taken.')) {
            return {
              type: 'error',
              value: 'authentication:already-used'
            }
          }
          return {
            type: 'error',
            value: 'errors:server-error'
          }
        }
        return {
          type: 'error',
          value: 'errors:server-error'
        }
      }
    } else {
      try {
        const { data } = await api.post<Tokens>('/users/signin', formData)
        const authentication = new AuthenticationClass(data, true)
        authentication.signin()
        await router.push('/application')
        return null
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          return {
            type: 'error',
            value: 'authentication:wrong-credentials'
          }
        }
        return {
          type: 'error',
          value: 'errors:server-error'
        }
      }
    }
  }

  return (
    <Main>
      <AuthenticationSocialMedia />
      <div className='pt-8 text-center font-paragraph text-lg'>
        {t('authentication:or')}
      </div>
      <AuthenticationForm onSubmit={handleSubmit(onSubmit)}>
        {mode === 'signup' && (
          <Input
            type='text'
            placeholder={t('common:name')}
            name='name'
            label={t('common:name')}
            error={getErrorTranslation(errors.name)}
          />
        )}
        <Input
          type='email'
          placeholder='Email'
          name='email'
          label='Email'
          error={getErrorTranslation(errors.email)}
        />
        <Input
          type='password'
          placeholder={t('authentication:password')}
          name='password'
          label={t('authentication:password')}
          showForgotPassword={mode === 'signin'}
          error={getErrorTranslation(errors.password)}
        />
        <Button data-cy='submit' className='mt-6 w-full' type='submit'>
          {t('authentication:submit')}
        </Button>
        <p className='mt-3 font-headline text-sm text-green-800 hover:underline dark:text-green-400'>
          <Link
            href={
              mode === 'signup'
                ? '/authentication/signin'
                : '/authentication/signup'
            }
          >
            <a>
              {mode === 'signup'
                ? t('authentication:already-have-an-account')
                : t('authentication:dont-have-an-account')}
            </a>
          </Link>
        </p>
      </AuthenticationForm>
      <FormState id='message' state={fetchState} message={message} />
    </Main>
  )
}
