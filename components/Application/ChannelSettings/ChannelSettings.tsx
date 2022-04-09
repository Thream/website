import { useRouter } from 'next/router'
import { useState } from 'react'
import { Form } from 'react-component-form'
import useTranslation from 'next-translate/useTranslation'
import classNames from 'classnames'

import { HandleSubmitCallback, useForm } from '../../../hooks/useForm'
import { FormState } from '../../design/FormState'
import { useGuildMember } from '../../../contexts/GuildMember'
import { Input } from '../../design/Input'
import { Button } from '../../design/Button'
import { useAuthentication } from '../../../tools/authentication'
import {
  Channel,
  channelSchema,
  ChannelWithDefaultChannelId
} from '../../../models/Channel'
import { ConfirmGuildJoin } from '../ConfirmGuildJoin'

export interface ChannelSettingsProps {
  channel: Channel
}

export const ChannelSettings: React.FC<ChannelSettingsProps> = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { authentication } = useAuthentication()
  const { guild } = useGuildMember()

  const { channel } = props

  const [inputValues, setInputValues] = useState({
    name: channel.name
  })

  const [confirmation, setConfirmation] = useState(false)

  const handleConfirmation = (): void => {
    return setConfirmation(!confirmation)
  }

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
      name: channelSchema.name
    },
    replaceEmptyStringToNull: true,
    resetOnSuccess: false
  })

  const onSubmit: HandleSubmitCallback = async (formData) => {
    try {
      await authentication.api.put(`/channels/${channel.id}`, formData)
      setInputValues(formData as any)
      await router.push(`/application/${guild.id}/${channel.id}`)
      return null
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
      const { data } =
        await authentication.api.delete<ChannelWithDefaultChannelId>(
          `/channels/${channel.id}`
        )
      await router.push(`/application/${guild.id}/${data.defaultChannelId}`)
    } catch (error) {
      setFetchState('error')
      setMessageTranslationKey('errors:server-error')
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className='my-auto flex flex-col items-center justify-center py-12'
      >
        <div className='flex w-full flex-col items-center justify-center sm:w-fit lg:flex-row'>
          <div className=' flex w-full flex-wrap items-center justify-center px-6 sm:w-max'>
            <div className='mx-12 flex flex-col'>
              <Input
                name='name'
                label={t('common:name')}
                placeholder={t('common:name')}
                className='!mt-0'
                onChange={onChange}
                value={inputValues.name}
                error={getErrorTranslation(errors.name)}
                data-cy='channel-name-input'
              />
            </div>
          </div>
        </div>

        <div className='mt-12 flex flex-col items-center justify-center sm:w-fit'>
          <div className='space-x-6'>
            <Button type='submit' data-cy='button-save-channel-settings'>
              {t('application:save')}
            </Button>
            <Button
              type='button'
              color='red'
              onClick={handleConfirmation}
              data-cy='button-delete-channel-settings'
            >
              {t('application:delete')}
            </Button>
          </div>
          <FormState state={fetchState} message={message} />
        </div>
      </Form>
      <div
        className={classNames(
          'pointer-events-none invisible absolute z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-90 opacity-0 backdrop-blur-md transition-all',
          { 'pointer-events-auto !visible !opacity-100': confirmation }
        )}
      >
        <ConfirmGuildJoin
          className={classNames('relative top-8 transition-all', {
            '!top-0': confirmation
          })}
          handleYes={handleDelete}
          handleNo={handleConfirmation}
          title={`${t('application:remove-the-guild')} ?`}
        />
      </div>
    </>
  )
}
