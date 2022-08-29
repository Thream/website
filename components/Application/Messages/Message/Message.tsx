import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import date from 'date-and-time'
import TextareaAutosize from 'react-textarea-autosize'
import useTranslation from 'next-translate/useTranslation'

import { MessageWithMember } from '../../../../models/Message'
import { MessageText } from './MessageText'
import { Loader } from '../../../design/Loader'
import { MessageFile } from './MessageFile'
import { Emoji } from '../../../Emoji'
import { useAuthentication } from '../../../../tools/authentication'

export interface MessageProps {
  message: MessageWithMember
}

export const Message: React.FC<MessageProps> = (props) => {
  const { message } = props

  const textareaReference = useRef<HTMLTextAreaElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { t } = useTranslation()
  const { authentication, user } = useAuthentication()

  const handleDeleteMessage = async (): Promise<void> => {
    try {
      await authentication.api.delete(`/messages/${message.id}`)
    } catch {}
  }

  const handleTextareaKeyDown: React.KeyboardEventHandler<HTMLFormElement> = (
    event
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }
  }

  const handleEdit = async (): Promise<void> => {
    const newMessage = textareaReference.current?.value ?? message.value
    if (
      typeof newMessage === 'string' &&
      newMessage.length > 0 &&
      newMessage !== message.value
    ) {
      try {
        await authentication.api.put(`/messages/${message.id}`, {
          value: newMessage
        })
      } catch {}
    }
    handleEditMode()
  }

  const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    await handleEdit()
  }

  const handleEditMode = (): void => {
    setIsEditing((oldIsEditing) => {
      return !oldIsEditing
    })
  }

  return (
    <div
      className='group flex w-full p-4 transition hover:bg-gray-200 dark:hover:bg-gray-900'
      data-cy={`message-${message.id}`}
    >
      <Link href={`/application/users/${message.member.user.id}`}>
        <a>
          <div className='mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center'>
            <div className='h-10 w-10 drop-shadow-md'>
              <Image
                quality={100}
                className='rounded-full'
                src={
                  message.member.user.logo == null
                    ? '/images/data/user-default.png'
                    : message.member.user.logo
                }
                alt={"Users's profil picture"}
                width={50}
                height={50}
                draggable={false}
              />
            </div>
          </div>
        </a>
      </Link>
      <div className='relative w-full whitespace-pre-wrap break-words break-all'>
        <div className='flex w-max items-center'>
          <Link href={`/application/users/${message.member.user.id}`}>
            <a>
              <span
                data-cy='message-member-user-name'
                className='font-bold text-gray-900 dark:text-gray-200'
              >
                {message.member.user.name}
              </span>
            </a>
          </Link>
          <span
            data-cy='message-date'
            className='ml-4 select-none text-xs text-gray-500 dark:text-gray-200'
          >
            {date.format(new Date(message.createdAt), 'DD/MM/YYYY - HH:mm:ss')}
          </span>
        </div>
        {message.member.userId === user.id ? (
          <div className='absolute right-6 -top-8 flex opacity-0 transition-opacity group-hover:opacity-100'>
            {message.type === 'text' ? (
              <div
                className='message-options rounded-l-lg border-l-slate-600'
                title={t('application:edit')}
                onClick={isEditing ? handleEdit : handleEditMode}
              >
                <Emoji
                  value={isEditing ? ':white_check_mark:' : ':pencil2:'}
                  size={18}
                />
              </div>
            ) : null}
            <div
              className='message-options rounded-r-lg border-r-slate-600'
              title={t('application:delete')}
              onClick={handleDeleteMessage}
            >
              <Emoji value=':wastebasket:' size={18} />
            </div>
          </div>
        ) : null}
        {message.type === 'text' ? (
          <>
            {isEditing ? (
              <form
                className='flex h-full w-full items-center'
                onSubmit={handleEditSubmit}
                onKeyDown={handleTextareaKeyDown}
              >
                <TextareaAutosize
                  className='scrollbar-firefox-support w-full resize-none bg-transparent p-2 tracking-wide outline-none'
                  placeholder={t('application:write-a-message')}
                  wrap='soft'
                  maxRows={6}
                  name='message'
                  defaultValue={message.value}
                  ref={textareaReference}
                  autoFocus
                  onFocus={(event) => {
                    event.currentTarget.setSelectionRange(
                      event.currentTarget.value.length,
                      event.currentTarget.value.length
                    )
                  }}
                />
              </form>
            ) : (
              <MessageText message={message} />
            )}
          </>
        ) : message.type === 'file' ? (
          <MessageFile message={message} />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}
