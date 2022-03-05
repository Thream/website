import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Form } from 'react-component-form'

import { useAuthentication } from '../../../tools/authentication'
import { HandleSubmitCallback, useForm } from '../../../hooks/useForm'
import { Input } from '../../design/Input'
import { Main } from '../../design/Main'
import { Button } from '../../design/Button'
import { FormState } from '../../design/FormState'
import { Channel, channelSchema } from '../../../models/Channel'
import { useGuildMember } from '../../../contexts/GuildMember'

export const CreateChannel: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { guild } = useGuildMember()

  const { fetchState, message, errors, getErrorTranslation, handleSubmit } =
    useForm({
      validateSchema: {
        name: channelSchema.name
      },
      resetOnSuccess: true
    })

  const { authentication } = useAuthentication()

  const onSubmit: HandleSubmitCallback = async (formData) => {
    try {
      const { data: channel } = await authentication.api.post<Channel>(
        `/guilds/${guild.id}/channels`,
        formData
      )
      await router.push(`/application/${guild.id}/${channel.id}`)
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
          data-cy='channel-name-input'
        />
        <Button
          className='mt-6 w-full'
          type='submit'
          data-cy='button-create-channel'
        >
          {t('application:create')}
        </Button>
      </Form>
      <FormState id='message' state={fetchState} message={message} />
    </Main>
  )
}
