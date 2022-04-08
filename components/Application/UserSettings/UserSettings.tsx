import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { useState, useMemo } from 'react'
import { Form } from 'react-component-form'
import { EyeIcon, PhotographIcon } from '@heroicons/react/solid'
import { Type } from '@sinclair/typebox'
import axios from 'axios'
import Link from 'next/link'

import { API_URL } from '../../../tools/api'
import { Input } from '../../design/Input'
import { Checkbox } from '../../design/Checkbox'
import { Textarea } from '../../design/Textarea'
import { SocialMediaButton } from '../../design/SocialMediaButton'
import { SwitchTheme } from '../../Header/SwitchTheme'
import { Language } from '../../Header/Language'
import { useAuthentication } from '../../../tools/authentication'
import { Button } from '../../design/Button'
import { FormState } from '../../design/FormState'
import { useForm, HandleSubmitCallback } from '../../../hooks/useForm'
import { userSchema } from '../../../models/User'
import { userSettingsSchema } from '../../../models/UserSettings'
import { ProviderOAuth, providers } from '../../../models/OAuth'

export const UserSettings: React.FC = () => {
  const { user, setUser, authentication } = useAuthentication()
  const { t } = useTranslation()
  const [inputValues, setInputValues] = useState({
    name: user.name,
    status: user.status,
    email: user.email,
    website: user.website,
    biography: user.biography,
    isPublicGuilds: user.settings.isPublicGuilds,
    isPublicEmail: user.settings.isPublicEmail
  })

  const {
    fetchState,
    setFetchState,
    message,
    setMessageTranslationKey,
    errors,
    getErrorTranslation,
    handleSubmit
  } = useForm({
    validateSchema: {
      name: userSchema.name,
      status: Type.Optional(userSchema.status),
      email: Type.Optional(Type.Union([userSchema.email, Type.Null()])),
      website: Type.Optional(userSchema.website),
      biography: Type.Optional(userSchema.biography),
      isPublicGuilds: userSettingsSchema.isPublicGuilds,
      isPublicEmail: userSettingsSchema.isPublicEmail
    },
    replaceEmptyStringToNull: true,
    resetOnSuccess: false
  })

  const hasAllProviders = useMemo(() => {
    return providers.every((provider) => user.strategies.includes(provider))
  }, [user.strategies])

  const onSubmit: HandleSubmitCallback = async (formData) => {
    try {
      const { isPublicGuilds, isPublicEmail, ...userData } = formData
      const userSettings = { isPublicEmail, isPublicGuilds }
      const { data: userCurrentData } = await authentication.api.put(
        `/users/current?redirectURI=${window.location.origin}/authentication/signin`,
        userData
      )
      setInputValues(formData as any)
      const hasEmailChanged = user.email !== userCurrentData.user.email
      if (hasEmailChanged) {
        return {
          type: 'success',
          value: 'application:success-email-changed'
        }
      }
      const { data: userCurrentSettings } = await authentication.api.put(
        '/users/current/settings',
        userSettings
      )
      setUser((oldUser) => {
        return {
          ...oldUser,
          ...userCurrentData,
          settings: userCurrentSettings.settings
        }
      })
      return {
        type: 'success',
        value: 'application:saved-information'
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const message = error.response.data.message as string
        if (message.endsWith('already taken.')) {
          return {
            type: 'error',
            value: 'authentication:already-used'
          }
        } else if (message.endsWith('email to sign in.')) {
          return {
            type: 'error',
            value: 'authentication:email-required-to-sign-in'
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
  }

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setInputValues((oldInputValues) => {
      return {
        ...oldInputValues,
        [event.target.name]: event.target.value
      }
    })
  }

  const onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputValues((oldInputValues) => {
      return {
        ...oldInputValues,
        [event.target.name]: event.target.checked
      }
    })
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    setFetchState('loading')
    const files = event?.target?.files
    if (files != null && files.length === 1) {
      const file = files[0]
      const formData = new FormData()
      formData.append('logo', file)
      try {
        const { data } = await authentication.api.put(
          `/users/current/logo`,
          formData
        )
        setUser((oldUser) => {
          return {
            ...oldUser,
            logo: data.user.logo
          }
        })
        setFetchState('idle')
      } catch (error) {
        setFetchState('error')
        setMessageTranslationKey('errors:server-error')
      }
    }
  }

  const handleSignout = async (): Promise<void> => {
    try {
      setFetchState('loading')
      await authentication.signoutServerSide()
    } catch (error) {
      setFetchState('error')
      setMessageTranslationKey('errors:server-error')
    }
  }

  const handleDeletionProvider = (
    provider: ProviderOAuth
  ): (() => Promise<void>) => {
    return async () => {
      try {
        setFetchState('loading')
        await authentication.api.delete(`/users/oauth2/${provider}`)
        setUser((oldUser) => {
          return {
            ...oldUser,
            strategies: oldUser.strategies.filter(
              (strategy) => strategy !== provider
            )
          }
        })
        setMessageTranslationKey('application:success-deleted-provider')
      } catch (error) {
        setFetchState('error')
        setMessageTranslationKey('errors:server-error')
      }
    }
  }

  const handleAddProvider = (
    provider: ProviderOAuth
  ): (() => Promise<void>) => {
    return async () => {
      const redirect = window.location.href
      const { data: url } = await authentication.api.get(
        `/users/oauth2/${provider.toLowerCase()}/add-strategy?redirectURI=${redirect}`
      )
      window.location.href = url
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='my-auto flex flex-col items-center justify-center py-12 lg:min-w-[875px]'
    >
      <div className='flex w-full flex-col items-center justify-center sm:w-fit lg:flex-row'>
        <div className=' flex w-full flex-wrap items-center justify-center px-6 sm:w-max'>
          <div className='relative'>
            <div className='absolute z-50 h-full w-full'>
              <button className='relative flex h-full w-full items-center justify-center transition hover:scale-110'>
                <input
                  type='file'
                  className='absolute h-full w-full cursor-pointer opacity-0'
                  onChange={handleFileChange}
                />
                <PhotographIcon color='white' className='h-8 w-8' />
              </button>
            </div>
            <div className='flex items-center justify-center rounded-full bg-black shadow-xl'>
              <Image
                quality={100}
                className='rounded-full opacity-50'
                src={
                  user.logo != null
                    ? API_URL + user.logo
                    : '/images/data/user-default.png'
                }
                alt='Profil Picture'
                draggable='false'
                height={125}
                width={125}
              />
            </div>
          </div>
          <div className='mx-12 flex flex-col'>
            <Input
              name='name'
              label={t('common:name')}
              placeholder={t('common:name')}
              className='!mt-0'
              onChange={onChange}
              value={inputValues.name ?? ''}
              error={getErrorTranslation(errors.name)}
            />
            <Input
              name='status'
              label={t('application:status')}
              placeholder={t('application:status')}
              className='!mt-4'
              onChange={onChange}
              value={inputValues.status ?? ''}
              error={getErrorTranslation(errors.status)}
            />
          </div>
        </div>
      </div>
      <div className='mt-12 flex w-full flex-col items-center justify-between sm:w-fit lg:flex-row'>
        <div className='w-4/5 pr-0 sm:w-[450px] lg:border-r-[1px] lg:border-neutral-700 lg:pr-12'>
          <Input
            name='email'
            label='Email'
            placeholder='Email'
            onChange={onChange}
            value={inputValues.email ?? ''}
            error={getErrorTranslation(errors.email)}
          />
          <Checkbox
            name='isPublicEmail'
            label={t('application:label-checkbox-email')}
            id='checkbox-email-visibility'
            onChange={onChangeCheckbox}
            checked={inputValues.isPublicEmail}
          />
          <Input
            name='website'
            label={t('application:website')}
            placeholder={t('application:website')}
            onChange={onChange}
            value={inputValues.website ?? ''}
            error={getErrorTranslation(errors.website)}
          />
          <Textarea
            name='biography'
            label={t('application:biography')}
            placeholder={t('application:biography')}
            id='textarea-biography'
            onChange={onChange}
            value={inputValues.biography ?? ''}
          />
        </div>
        <div className='flex h-full w-4/5 flex-col items-center justify-between pr-0 sm:w-[415px] lg:pl-12'>
          <div className='flex w-full items-center pt-10 lg:pt-0'>
            <Language className='!top-12' />
            <div className='ml-auto flex'>
              <SwitchTheme />
              <Link href={`/application/users/${user.id}`}>
                <a
                  className='group ml-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-slate-200 transition-colors hover:bg-slate-300 dark:bg-slate-700 hover:dark:bg-slate-800'
                  title='Preview Public Profile'
                >
                  <EyeIcon
                    height={20}
                    className='opacity-50 transition-opacity group-hover:opacity-100'
                  />
                </a>
              </Link>
            </div>
          </div>

          <div className='mt-14 flex w-full flex-col gap-4'>
            {!hasAllProviders ? (
              <div className='flex w-full flex-col gap-4'>
                <h3 className='text-center'>
                  {t('application:signin-with-an-account')}
                </h3>
                {providers.map((provider, index) => {
                  if (!user.strategies.includes(provider)) {
                    return (
                      <SocialMediaButton
                        key={index}
                        socialMedia={provider}
                        className='w-full justify-center'
                        onClick={handleAddProvider(provider)}
                      />
                    )
                  }
                  return null
                })}
              </div>
            ) : null}
            {user.strategies.length !== 1 && (
              <div className='mt-4 flex w-full flex-col gap-4'>
                <h3 className='text-center'>
                  {t('application:signout-with-an-account')}
                </h3>
                {providers.map((provider, index) => {
                  if (user.strategies.includes(provider)) {
                    return (
                      <SocialMediaButton
                        key={index}
                        socialMedia={provider}
                        className='w-full justify-center'
                        onClick={handleDeletionProvider(provider)}
                      />
                    )
                  }
                  return null
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-12 flex flex-col items-center justify-center sm:w-fit'>
        <div className='space-x-6'>
          <Button type='submit'>{t('application:save')}</Button>
          <Button type='button' color='red' onClick={handleSignout}>
            {t('application:signout')}
          </Button>
        </div>
        <FormState state={fetchState} message={message} />
      </div>
    </Form>
  )
}
