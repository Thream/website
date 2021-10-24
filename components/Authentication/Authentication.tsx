import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useTheme } from 'next-themes'
import { Type } from '@sinclair/typebox'
import type { ErrorObject } from 'ajv'
import type { HandleForm } from 'react-component-form'
import axios from 'axios'

import { SocialMediaButton } from '../design/SocialMediaButton'
import { Main } from '../design/Main'
import { Input } from '../design/Input'
import { Button } from '../design/Button'
import { FormState } from '../design/FormState'
import { useFormState } from '../../hooks/useFormState'
import { AuthenticationForm } from './'
import { userSchema } from '../../models/User'
import { ajv } from '../../utils/ajv'
import { api } from 'utils/api'
import {
  Tokens,
  Authentication as AuthenticationClass
} from '../../utils/authentication'
import { getErrorTranslationKey } from './getErrorTranslationKey'

interface Errors {
  [key: string]: ErrorObject<string, any> | null | undefined
}

const findError = (
  field: string
): ((value: ErrorObject, index: number, object: ErrorObject[]) => boolean) => {
  return (validationError) => validationError.instancePath === field
}

export interface AuthenticationProps {
  mode: 'signup' | 'signin'
}

export const Authentication: React.FC<AuthenticationProps> = (props) => {
  const { mode } = props

  const router = useRouter()
  const { lang, t } = useTranslation()
  const { theme } = useTheme()
  const [formState, setFormState] = useFormState()
  const [messageTranslationKey, setMessageTranslationKey] = useState<
    string | undefined
  >(undefined)
  const [errors, setErrors] = useState<Errors>({
    name: null,
    email: null,
    password: null
  })

  const validateSchema = useMemo(() => {
    return Type.Object({
      ...(mode === 'signup' && { name: userSchema.name }),
      email: userSchema.email,
      password: userSchema.password
    })
  }, [mode])

  const validate = useMemo(() => {
    return ajv.compile(validateSchema)
  }, [validateSchema])

  const getErrorTranslation = (error?: ErrorObject | null): string | null => {
    if (error != null) {
      return t(getErrorTranslationKey(error)).replace(
        '{expected}',
        error?.params?.limit
      )
    }
    return null
  }

  const handleSubmit: HandleForm = async (formData, formElement) => {
    const isValid = validate(formData)
    if (!isValid) {
      setFormState('error')
      const nameError = validate?.errors?.find(findError('/name'))
      const emailError = validate?.errors?.find(findError('/email'))
      const passwordError = validate?.errors?.find(findError('/password'))
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError
      })
    } else {
      setErrors({})
      setFormState('loading')
      if (mode === 'signup') {
        try {
          await api.post(
            `/users/signup?redirectURI=${window.location.origin}/authentication/signin`,
            { ...formData, language: lang, theme }
          )
          formElement.reset()
          setFormState('success')
          setMessageTranslationKey('authentication:success-signup')
        } catch (error) {
          setFormState('error')
          if (axios.isAxiosError(error) && error.response?.status === 400) {
            setMessageTranslationKey('authentication:alreadyUsed')
          } else {
            setMessageTranslationKey('errors:server-error')
          }
        }
      } else {
        try {
          const { data } = await api.post<Tokens>('/users/signin', formData)
          const authentication = new AuthenticationClass(data)
          authentication.signin()
          await router.push('/application')
        } catch (error) {
          setFormState('error')
          if (axios.isAxiosError(error) && error.response?.status === 400) {
            setMessageTranslationKey('authentication:wrong-credentials')
          } else {
            setMessageTranslationKey('errors:server-error')
          }
        }
      }
    }
  }

  return (
    <Main>
      <section className='flex flex-col sm:items-center sm:w-full'>
        <div className='flex flex-col items-center justify-center space-y-6 sm:w-4/6 sm:flex-row sm:space-x-6 sm:space-y-0'>
          <SocialMediaButton socialMedia='Google' />
          <SocialMediaButton socialMedia='GitHub' />
          <SocialMediaButton socialMedia='Discord' />
        </div>
      </section>
      <section className='text-center text-lg font-paragraph pt-8'>
        {t('authentication:or')}
      </section>
      <AuthenticationForm onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <Input
            type='text'
            placeholder={t('authentication:name')}
            name='name'
            label={t('authentication:name')}
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
        <Button data-cy='submit' className='w-full mt-6' type='submit'>
          {t('authentication:submit')}
        </Button>
        <p className='mt-3 font-headline text-sm text-green-800 dark:text-green-400 hover:underline'>
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
      <FormState
        id='message'
        state={formState}
        message={
          messageTranslationKey != null ? t(messageTranslationKey) : null
        }
      />
    </Main>
  )
}
