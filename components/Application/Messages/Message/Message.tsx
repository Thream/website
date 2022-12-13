import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import date from 'date-and-time'
import type { MotionProps } from 'framer-motion'
import { motion } from 'framer-motion'

import type { MessageWithMember } from '../../../../models/Message'
import { MessageText } from './MessageText'
import { Loader } from '../../../design/Loader'
import { MessageFile } from './MessageFile'
import { useAuthentication } from '../../../../tools/authentication'
import { MessageOptions } from './MessageOptions'
import { EditMessage } from './EditMessage'

export interface MessageProps extends MotionProps {
  message: MessageWithMember
}

export const Message: React.FC<MessageProps> = (props) => {
  const { message } = props

  const textareaReference = useRef<HTMLTextAreaElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { authentication, user } = useAuthentication()

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

  const handleEditMode = (): void => {
    setIsEditing((oldIsEditing) => {
      return !oldIsEditing
    })
  }

  return (
    <motion.div
      layout
      initial='initial'
      animate='animate'
      exit='exit'
      data-cy={`message-${message.id}`}
      className='group flex w-full p-4 transition hover:bg-gray-200 dark:hover:bg-gray-900'
      transition={{ type: 'spring', stiffness: 500, damping: 60 }}
      variants={{
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { opacity: 0 }
      }}
    >
      <Link href={`/application/users/${message.member.user.id}`}>
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
      </Link>
      <div className='relative w-full whitespace-pre-wrap break-words break-all'>
        <div className='flex w-max items-center'>
          <Link href={`/application/users/${message.member.user.id}`}>
            <span
              data-cy='message-member-user-name'
              className='font-bold text-gray-900 dark:text-gray-200'
            >
              {message.member.user.name}
            </span>
          </Link>
          <span
            data-cy='message-date'
            className='ml-4 select-none text-xs text-gray-500 dark:text-gray-200'
          >
            {date.format(new Date(message.createdAt), 'DD/MM/YYYY - HH:mm:ss')}
          </span>
        </div>

        {message.member.userId === user.id && (
          <MessageOptions
            message={message}
            editMode={isEditing ? ':white_check_mark:' : ':pencil2:'}
            handleEdit={isEditing ? handleEdit : handleEditMode}
          />
        )}

        {message.type === 'text' ? (
          <>
            {isEditing ? (
              <EditMessage
                message={message}
                textareaRef={textareaReference}
                handleEdit={handleEdit}
                handleKeyDown={handleTextareaKeyDown}
              />
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
    </motion.div>
  )
}
