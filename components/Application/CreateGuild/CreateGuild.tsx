import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Form } from 'react-component-form'
import { AxiosResponse } from 'axios'

import { useAuthentication } from '../../../tools/authentication'
import { HandleSubmitCallback, useForm } from '../../../hooks/useForm'
import { GuildComplete, guildSchema } from '../../../models/Guild'
import { Input } from '../../design/Input'
import { Main } from '../../design/Main'
import { Button } from '../../design/Button'
import { FormState } from '../../design/FormState'
import { Textarea } from '../../design/Textarea'

export const CreateGuild: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { fetchState, message, errors, getErrorTranslation, handleSubmit } =
    useForm({
      validateSchema: {
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
        <Textarea
          label='Description'
          placeholder='Description'
          id='description'
        />
        <Button className='w-full mt-6' type='submit' data-cy='submit'>
          {t('application:create')}
        </Button>
      </Form>
      <FormState id='message' state={fetchState} message={message} />
    </Main>
  )
}
