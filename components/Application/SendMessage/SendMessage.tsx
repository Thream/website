import { useState, useRef } from 'react'
import useTranslation from 'next-translate/useTranslation'
import TextareaAutosize from 'react-textarea-autosize'
import classNames from 'clsx'

import type { GuildsChannelsPath } from '..'
import { useAuthentication } from '../../../tools/authentication'
import type { EmojiPickerOnClick } from '../../Emoji'
import { EmojiPicker } from '../../Emoji'

export interface SendMessageProps {
  path: GuildsChannelsPath
}

export const SendMessage: React.FC<SendMessageProps> = (props) => {
  const { path } = props
  const { t } = useTranslation()
  const { authentication } = useAuthentication()

  const [isVisibleEmojiPicker, setIsVisibleEmojiPicker] = useState(false)
  const [message, setMessage] = useState('')
  const textareaReference = useRef<HTMLTextAreaElement>(null)

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    if (typeof message === 'string' && message.length > 0) {
      await authentication.api.post(`/channels/${path.channelId}/messages`, {
        value: message
      })
      setMessage('')
    }
  }

  const handleTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setMessage(event.target.value)
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const files = event?.target?.files
    if (files != null && files.length === 1 && files[0] != null) {
      const file = files[0]
      const formData = new FormData()
      formData.append('file', file)
      await authentication.api.post(
        `/channels/${path.channelId}/messages/uploads`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    }
  }

  const handleVisibleEmojiPicker = (): void => {
    setIsVisibleEmojiPicker((isVisible) => {
      return !isVisible
    })
  }

  const handleEmojiPicker: EmojiPickerOnClick = (emoji) => {
    const emojiColons = emoji.colons ?? ''
    setMessage((oldMessage) => {
      return oldMessage + emojiColons
    })
    handleVisibleEmojiPicker()
    textareaReference.current?.focus()
  }

  return (
    <div className='relative p-6 pb-4'>
      <div
        className={classNames(
          'absolute bottom-24 right-20 z-50 w-fit transition-all duration-100',
          {
            'invisible translate-y-5 opacity-0': !isVisibleEmojiPicker
          }
        )}
      >
        <EmojiPicker onClick={handleEmojiPicker} />
      </div>
      <div className='flex h-full w-full rounded-lg bg-gray-200 py-1 text-gray-600 dark:bg-gray-800 dark:text-gray-200'>
        <form
          className='flex h-full w-full items-center'
          onSubmit={handleSubmit}
          onKeyDown={handleTextareaKeyDown}
        >
          <TextareaAutosize
            className='scrollbar-firefox-support my-2 w-full resize-none bg-transparent p-2 px-6 tracking-wide outline-none'
            placeholder={t('application:write-a-message')}
            wrap='soft'
            maxRows={6}
            name='message'
            onChange={handleTextareaChange}
            value={message}
            ref={textareaReference}
          />
        </form>
        <div className='flex h-full items-center justify-around pr-6'>
          <button
            className='flex h-full w-full items-center justify-center p-1 text-2xl transition hover:-translate-y-1'
            onClick={handleVisibleEmojiPicker}
          >
            🙂
          </button>
          <button className='relative flex h-full w-full cursor-pointer items-center justify-center p-1 text-green-800 transition hover:-translate-y-1 dark:text-green-400'>
            <input
              type='file'
              className='absolute h-full w-full cursor-pointer opacity-0'
              onChange={handleFileChange}
            />
            <svg width='25' height='25' viewBox='0 0 22 22'>
              <path
                d='M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM12 15C12 15.2652 11.8946 15.5196 11.7071 15.7071C11.5196 15.8946 11.2652 16 11 16C10.7348 16 10.4804 15.8946 10.2929 15.7071C10.1054 15.5196 10 15.2652 10 15V12H7C6.73478 12 6.48043 11.8946 6.29289 11.7071C6.10536 11.5196 6 11.2652 6 11C6 10.7348 6.10536 10.4804 6.29289 10.2929C6.48043 10.1054 6.73478 10 7 10H10V7C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6C11.2652 6 11.5196 6.10536 11.7071 6.29289C11.8946 6.48043 12 6.73478 12 7V10H15C15.2652 10 15.5196 10.1054 15.7071 10.2929C15.8946 10.4804 16 10.7348 16 11C16 11.2652 15.8946 11.5196 15.7071 11.7071C15.5196 11.8946 15.2652 12 15 12H12V15Z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
