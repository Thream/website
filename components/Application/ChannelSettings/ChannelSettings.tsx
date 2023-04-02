import { useRouter } from 'next/router'
import { useState } from 'react'
import { Form, useForm } from 'react-component-form'
import useTranslation from 'next-translate/useTranslation'
import classNames from 'clsx'
import axios from 'axios'
import type { HandleUseFormCallback } from 'react-component-form'

import { FormState } from '../../design/FormState'
import { useGuildMember } from '../../../contexts/GuildMember'
import { Input } from '../../design/Input'
import { Button } from '../../design/Button'
import { useAuthentication } from '../../../tools/authentication'
import type {
  Channel,
  ChannelWithDefaultChannelId
} from '../../../models/Channel'
import { channelSchema } from '../../../models/Channel'
import { ConfirmPopup } from '../ConfirmPopup'
import { useFormTranslation } from '../../../hooks/useFormTranslation'

const schema = {
  name: channelSchema.name
}

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
    handleUseForm,
    fetchState,
    message,
    errors,
    setFetchState,
    setMessage
  } = useForm(schema)
  const { getFirstErrorTranslation } = useFormTranslation()

  const onSubmit: HandleUseFormCallback<typeof schema> = async (formData) => {
    try {
      await authentication.api.put(`/channels/${channel.id}`, formData)
      setInputValues(formData)
      await router.push(`/application/${guild.id}/${channel.id}`)
      return null
    } catch (error) {
      return {
        type: 'error',
        message: 'errors:server-error'
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
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setMessage('application:delete-channel-only-one')
      } else {
        setMessage('errors:server-error')
      }
    }
  }

  return (
    <>
      <Form
        onSubmit={handleUseForm(onSubmit)}
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
                error={getFirstErrorTranslation(errors.name)}
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
        <ConfirmPopup
          className={classNames('relative top-8 transition-all', {
            '!top-0': confirmation
          })}
          handleYes={handleDelete}
          handleNo={handleConfirmation}
          title={`${t('application:delete-the-channel')} ?`}
        />
      </div>
    </>
  )
}
