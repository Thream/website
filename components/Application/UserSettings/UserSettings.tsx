import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { Form } from 'react-component-form'
import { PhotographIcon } from '@heroicons/react/solid'
import { Type } from '@sinclair/typebox'
import axios from 'axios'

import { API_URL } from '../../../tools/api'
import { UserProfileGuilds } from '../UserProfile/UserProfileGuilds'
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
import { userCurrentSchema, userSchema } from '../../../models/User'
import { userSettingsSchema } from '../../../models/UserSettings'

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

  const { fetchState, message, errors, getErrorTranslation, handleSubmit } =
    useForm({
      validateSchema: {
        name: userSchema.name,
        status: Type.Optional(userSchema.status),
        email: Type.Optional(userCurrentSchema.email),
        website: Type.Optional(userSchema.website),
        biography: Type.Optional(userSchema.biography),
        isPublicGuilds: userSettingsSchema.isPublicGuilds,
        isPublicEmail: userSettingsSchema.isPublicEmail
      },
      replaceEmptyStringToNull: true,
      resetOnSuccess: false
    })

  const onSubmit: HandleSubmitCallback = async (formData) => {
    try {
      const { isPublicGuilds, isPublicEmail, ...userData } = formData
      const userSettings = { isPublicEmail, isPublicGuilds }
      const { data: userCurrentData } = await authentication.api.put(
        `/users/current?redirectURI=${window.location.origin}/authentication/signin`,
        userData
      )
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
      setInputValues(formData as any)
      return {
        type: 'success',
        value: 'common:name'
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

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='my-auto lg:min-w-[875px] py-12 justify-center items-center flex flex-col'
    >
      <div className='flex flex-col w-full justify-center items-center lg:flex-row sm:w-fit'>
        <div className=' flex justify-center items-center flex-wrap px-6 w-full sm:w-max'>
          <div className='relative'>
            <div className='absolute w-full h-full z-50'>
              <button className='relative w-full h-full flex items-center justify-center transition hover:scale-110'>
                <input
                  type='file'
                  className='absolute w-full h-full opacity-0 cursor-pointer'
                />
                <PhotographIcon color='white' className='w-8 h-8' />
              </button>
            </div>
            <div className='flex justify-center items-center rounded-full shadow-xl bg-black'>
              <Image
                className='opacity-50 rounded-full'
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
          <div className='flex flex-col mx-12'>
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
        <div className='flex mt-10 flex-col items-center ml-0 lg:ml-24 lg:mt-0'>
          <UserProfileGuilds isPublicGuilds={inputValues.isPublicGuilds} />
          <Checkbox
            name='isPublicGuilds'
            label={t('application:label-checkbox-guilds')}
            onChange={onChangeCheckbox}
            checked={inputValues.isPublicGuilds}
            id='checkbox-public-guilds'
            className='px-8'
          />
        </div>
      </div>
      <div className='flex flex-col w-full justify-between items-center mt-12 lg:flex-row sm:w-fit'>
        <div className='w-4/5 sm:w-[450px] pr-0 lg:pr-12 lg:border-r-[1px] lg:border-neutral-700'>
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
        <div className='flex flex-col justify-between items-center w-4/5 sm:w-[415px] h-full pr-0 lg:pl-12'>
          <div className='flex w-full flex-col gap-4 mt-14'>
            <SocialMediaButton
              socialMedia='Google'
              className='w-full justify-center'
            />
            <SocialMediaButton
              socialMedia='Discord'
              className='w-full justify-center'
            />
            <SocialMediaButton
              socialMedia='GitHub'
              className='w-full justify-center'
            />
          </div>
          <div className='flex justify-between w-full pt-14'>
            <Language />
            <SwitchTheme />
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center mt-12 sm:w-fit'>
        <Button type='submit'>Sauvegarder</Button>
        <FormState state={fetchState} message={message} />
      </div>
    </Form>
  )
}
