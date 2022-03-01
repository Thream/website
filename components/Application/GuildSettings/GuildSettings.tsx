import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Type } from '@sinclair/typebox'
import { PhotographIcon } from '@heroicons/react/solid'
import { Form } from 'react-component-form'
import useTranslation from 'next-translate/useTranslation'

import { HandleSubmitCallback, useForm } from 'hooks/useForm'
import { guildSchema } from 'models/Guild'
import { FormState } from 'components/design/FormState'

import { API_URL } from '../../../tools/api'
import { useGuildMember } from '../../../contexts/GuildMember'
import { Textarea } from '../../design/Textarea'
import { Input } from '../../design/Input'
import { Button } from '../../design/Button'
import { useAuthentication } from '../../../tools/authentication'

export const GuildSettings: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { authentication } = useAuthentication()
  const { guild, member } = useGuildMember()

  const [inputValues, setInputValues] = useState({
    name: guild.name,
    description: guild.description
  })

  const {
    fetchState,
    message,
    errors,
    getErrorTranslation,
    handleSubmit,
    setFetchState,
    setMessageTranslationKey
  } = useForm({
    validateSchema: {
      name: guildSchema.name,
      description: Type.Optional(guildSchema.description)
    },
    replaceEmptyStringToNull: true,
    resetOnSuccess: false
  })

  const onSubmit: HandleSubmitCallback = async (formData) => {
    try {
      await authentication.api.put(`/guilds/${guild.id}`, formData)
      setInputValues(formData as any)
      return {
        type: 'success',
        value: 'common:name'
      }
    } catch (error) {
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

  const handleDelete = async (): Promise<void> => {
    try {
      await authentication.api.delete(`/guilds/${guild.id}`)
      await router.push('/application')
    } catch (error) {
      setFetchState('error')
      setMessageTranslationKey('errors:server-error')
    }
  }

  const handleLeave = async (): Promise<void> => {
    try {
      await authentication.api.delete(`/guilds/${guild.id}/members/leave`)
      await router.push('/application')
    } catch (error) {
      setFetchState('error')
      setMessageTranslationKey('errors:server-error')
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='my-auto flex flex-col items-center justify-center py-12 lg:min-w-[875px]'
    >
      {member.isOwner && (
        <div className='flex w-full flex-col items-center justify-center sm:w-fit lg:flex-row'>
          <div className=' flex w-full flex-wrap items-center justify-center px-6 sm:w-max'>
            <div className='relative'>
              <div className='absolute z-50 h-full w-full'>
                <button className='relative flex h-full w-full items-center justify-center transition hover:scale-110'>
                  <input
                    type='file'
                    className='absolute h-full w-full cursor-pointer opacity-0'
                  />
                  <PhotographIcon color='white' className='h-8 w-8' />
                </button>
              </div>
              <div className='flex items-center justify-center rounded-full bg-black shadow-xl'>
                <Image
                  className='rounded-full opacity-50'
                  src={
                    guild.icon == null
                      ? '/images/data/guild-default.png'
                      : API_URL + guild.icon
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
                value={inputValues.name}
                error={getErrorTranslation(errors.description)}
              />
              <Textarea
                name='description'
                label={'Description'}
                placeholder={'Description'}
                id='textarea-description'
                onChange={onChange}
                value={inputValues.description ?? ''}
              />
            </div>
          </div>
        </div>
      )}
      <div className='mt-12 flex flex-col items-center justify-center sm:w-fit'>
        <div className='space-x-6'>
          {member.isOwner ? (
            <>
              <Button type='submit'>Sauvegarder</Button>
              <Button color='red' onClick={handleDelete}>
                Supprimer
              </Button>
            </>
          ) : (
            <Button color='red' onClick={handleLeave}>
              Quitter {guild.name}
            </Button>
          )}
        </div>
        <FormState state={fetchState} message={message} />
      </div>
    </Form>
  )
}
