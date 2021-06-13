import { useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { useAuthentication } from 'utils/authentication'
import { IconButton } from 'components/design/IconButton'
import { MessageData } from 'contexts/Messages'
import { EmojiPicker, EmojiPickerOnClick } from 'components/Emoji'

const defaultMessageData: MessageData = { type: 'text', value: '' }

export interface SendMessageProps {
  channelId: string
}

export const SendMessage: React.FC<SendMessageProps> = (props) => {
  const { authentication } = useAuthentication()
  const [messageData, setMessageData] = useState<MessageData>(
    defaultMessageData
  )
  const [isVisibleEmojiPicker, setIsVisibleEmojiPicker] = useState(false)
  const inputFile = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [isVisibleEmojiPicker])

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = async (
    event
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      await sendMessage(messageData)
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    await sendMessage(messageData)
  }

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setMessageData({
      value: event.target.value,
      type: 'text'
    })
  }

  const handleVisibleEmojiPicker = (): void => {
    setIsVisibleEmojiPicker((isVisible) => !isVisible)
  }

  const handleEmojiPicker: EmojiPickerOnClick = (emoji) => {
    const emojiColons = emoji.colons ?? ''
    setMessageData((message) => {
      return {
        value: message.value + emojiColons,
        type: 'text'
      }
    })
    handleVisibleEmojiPicker()
  }

  const handleUploadFile = (): void => {
    inputFile.current?.click()
  }

  const handleSubmitFile = async (): Promise<void> => {
    if (
      inputFile.current?.files != null &&
      inputFile.current?.files?.length > 0
    ) {
      const file = inputFile.current.files[0]
      const formData = new FormData()
      formData.append('type', 'file')
      formData.append('file', file)
      await authentication.api.post(
        `/channels/${props.channelId}/messages`,
        formData
      )
      setMessageData(defaultMessageData)
    }
  }

  const sendMessage = async (messageData: MessageData): Promise<void> => {
    const isEmptyMessage = messageData.value.length <= 0
    if (!isEmptyMessage) {
      await authentication.api.post(`/channels/${props.channelId}/messages`, {
        value: messageData.value,
        type: messageData.type
      })
      setMessageData(defaultMessageData)
    }
  }

  return (
    <>
      {isVisibleEmojiPicker && <EmojiPicker onClick={handleEmojiPicker} />}
      <form onSubmit={handleSubmit}>
        <div className='send-message'>
          <div className='icons'>
            <IconButton
              type='button'
              icon='emoji'
              hasBackground
              size={50}
              id='emoji-picker-button'
              onClick={handleVisibleEmojiPicker}
            />
            <IconButton
              type='button'
              icon='add'
              hasBackground
              size={50}
              style={{ marginLeft: 5 }}
              onClick={handleUploadFile}
            />
            <input
              ref={inputFile}
              type='file'
              name='input-file'
              id='input-file'
              onChange={handleSubmitFile}
            />
          </div>
          <div className='message-content'>
            <TextareaAutosize
              name='message-value'
              id='message-value'
              wrap='soft'
              placeholder='Write a message'
              required
              maxLength={50_000}
              value={messageData.value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <IconButton type='submit' icon='send' hasBackground size={50} />
        </div>
      </form>

      <style jsx global>
        {`
          .message-content textarea {
            font-family: 'Roboto', 'Arial', 'sans-serif';
            color: var(--color-secondary);
            width: 100%;
            border: none;
            background-color: transparent;
            resize: none;
            outline: none;
            line-height: 30px;
            height: 30px;
            padding: 0 10px;
            margin: 0;
            white-space: pre-wrap;
          }
        `}
      </style>
      <style jsx>
        {`
          .send-message {
            display: flex;
            justify-content: space-between;
            background-color: var(--color-background-tertiary);
            padding: 10px;
            margin-top: 20px;
            border-radius: 2%;
          }
          #input-file {
            display: none;
          }
          .icons {
            display: flex;
          }
          .message-content {
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
