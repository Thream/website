import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Form } from 'react-component-form'
import TextareaAutosize from 'react-textarea-autosize'
import { AxiosResponse } from 'axios'

import { useAuthentication } from '../../../utils/authentication'
import { HandleSubmitCallback, useForm } from '../../../hooks/useForm'
import { GuildComplete, guildSchema } from '../../../models/Guild'
import { Input } from '../../design/Input'
import { Main } from '../../design/Main'
import { Button } from '../../design/Button'
import { FormState } from '../../design/FormState'

export const CreateGuild: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

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

        <Button className='w-full mt-6' type='submit' data-cy='submit'>
          {t('application:create')}
        </Button>
      </Form>
      <FormState id='message' state={formState} message={message} />
    </Main>
  )
}
