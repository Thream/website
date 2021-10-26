import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { Form } from 'react-component-form'
import TextareaAutosize from 'react-textarea-autosize'
import { AxiosResponse } from 'axios'

import { useAuthentication } from 'utils/authentication'
import { HandleSubmitCallback, useForm } from 'hooks/useForm'
import { GuildComplete, guildSchema } from 'models/Guild'
import { Input } from 'components/design/Input'
import { Main } from 'components/design/Main'
import { Button } from 'components/design/Button'
import { FormState } from 'components/design/FormState'

export const CreateGuild: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [iconSource, setIconSource] = useState<string>(
    '/images/data/guild-default.png'
  )

  const { formState, message, errors, getErrorTranslation, handleSubmit } =
    useForm({
      validateSchemaObject: {
        name: guildSchema.name,
        description: guildSchema.description
      }
    })

  const { authentication } = useAuthentication()

  const onSubmit: HandleSubmitCallback = async (formData) => {
    try {
      const { data } = await authentication.api.post<
        any,
        AxiosResponse<{ guild: GuildComplete }>
      >('/guilds', { name: formData.name, description: formData.description })
      const guildId = data.guild.id
      const channelId = data.guild.channels[0].id
      if (formData.icon != null) {
        const iconData = new FormData()
        iconData.append('icon', formData.icon)
        try {
          await authentication.api.put(`/guilds/${guildId}/icon`, iconData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        } catch (error) {}
      }
      await router.push(`/application/${guildId}/${channelId}`)
      return null
    } catch (error) {
      return {
        type: 'error',
        value: 'errors:server-error'
      }
    }
  }

  return (
    <Main>
      <Form className='w-4/6 max-w-xs' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <div className='flex justify-between mt-6 mb-2'>
            <label className='pl-1' htmlFor='icon'>
              Icon
            </label>
          </div>

          <div className='mt-2 relative flex flex-col items-center'>
            <button className='relative w-14 h-14 flex items-center overflow-hidden justify-center text-green-800 dark:text-green-400 transform scale-125 hover:scale-150'>
              <Image
                src={iconSource}
                alt='logo'
                width={56}
                height={56}
                className='w-14 h-14 rounded-full'
              />
              <input
                onChange={(event) => {
                  if (event.target.files != null) {
                    const [file] = event.target.files
                    if (file != null) {
                      setIconSource(URL.createObjectURL(file))
                    }
                  }
                }}
                name='icon'
                id='icon'
                type='file'
                accept='image/*'
                className='absolute w-22 h-20 -top-8 -left-8 opacity-0 cursor-pointer'
              />
            </button>
          </div>
        </div>

        <Input
          type='text'
          placeholder={t('common:name')}
          name='name'
          label={t('common:name')}
          error={getErrorTranslation(errors.name)}
        />

        <div className='flex flex-col'>
          <div className='flex justify-between mt-6 mb-2'>
            <label className='pl-1' htmlFor='description'>
              Description
            </label>
          </div>
          <div className='mt-0 relative'>
            <TextareaAutosize
              className='p-3 rounded-lg bg-[#f1f1f1] text-[#2a2a2a] caret-green-600 font-paragraph w-full focus:border focus:outline-none resize-none focus:shadow-green'
              placeholder='Description...'
              id='description'
              name='description'
              wrap='soft'
            ></TextareaAutosize>
          </div>
        </div>

        <Button className='w-full mt-6' type='submit'>
          {t('application:create')}
        </Button>
      </Form>
      <FormState id='message' state={formState} message={message} />
    </Main>
  )
}
