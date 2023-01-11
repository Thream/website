import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Form, useForm } from 'react-component-form'
import type { AxiosResponse } from 'axios'
import type { HandleUseFormCallback } from 'react-component-form'

import { useAuthentication } from '../../../tools/authentication'
import type { GuildComplete } from '../../../models/Guild'
import { guildSchema } from '../../../models/Guild'
import { Input } from '../../design/Input'
import { Main } from '../../design/Main'
import { Button } from '../../design/Button'
import { FormState } from '../../design/FormState'
import { Textarea } from '../../design/Textarea'
import { useFormTranslation } from '../../../hooks/useFormTranslation'

const schema = {
  name: guildSchema.name,
  description: guildSchema.description
}

export const CreateGuild: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { handleUseForm, fetchState, message, errors } = useForm(schema)
  const { getFirstErrorTranslation } = useFormTranslation()

  const { authentication } = useAuthentication()

  const onSubmit: HandleUseFormCallback<typeof schema> = async (formData) => {
    try {
      const { data } = await authentication.api.post<
        any,
        AxiosResponse<{ guild: GuildComplete }>
      >('/guilds', { name: formData.name, description: formData.description })
      const guildId = data.guild.id
      const channel = data.guild.channels[0]
      if (channel == null) {
        throw new Error('No channel found')
      }
      const channelId = channel.id
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
      <Form className='w-4/6 max-w-xs' onSubmit={handleUseForm(onSubmit)}>
        <Input
          type='text'
          placeholder={t('common:name')}
          name='name'
          label={t('common:name')}
          error={getFirstErrorTranslation(errors.name)}
        />
        <Textarea
          label='Description'
          placeholder='Description'
          id='description'
        />
        <Button className='mt-6 w-full' type='submit' data-cy='submit'>
          {t('application:create')}
        </Button>
      </Form>
      <FormState
        id='message'
        state={fetchState}
        message={message != null ? t(message) : undefined}
      />
    </Main>
  )
}
