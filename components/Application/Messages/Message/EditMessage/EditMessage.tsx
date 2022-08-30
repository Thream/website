import useTranslation from 'next-translate/useTranslation'
import TextareaAutosize from 'react-textarea-autosize'

import { MessageProps } from '../Message'

export interface EditMessageProps extends MessageProps {
  handleEdit: () => Promise<void>
  handleKeyDown: React.KeyboardEventHandler<HTMLFormElement>
  textareaRef: React.RefObject<HTMLTextAreaElement>
}

export const EditMessage: React.FC<
  React.PropsWithChildren<EditMessageProps>
> = ({ handleEdit, handleKeyDown, textareaRef, message }) => {
  const { t } = useTranslation()

  const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    await handleEdit()
  }

  return (
    <form
      className='flex h-full w-full items-center'
      onSubmit={handleEditSubmit}
      onKeyDown={handleKeyDown}
    >
      <TextareaAutosize
        className='scrollbar-firefox-support w-full resize-none bg-transparent p-2 tracking-wide outline-none'
        placeholder={t('application:write-a-message')}
        wrap='soft'
        maxRows={6}
        name='message'
        defaultValue={message.value}
        ref={textareaRef}
        autoFocus
        onFocus={(event) => {
          event.currentTarget.setSelectionRange(
            event.currentTarget.value.length,
            event.currentTarget.value.length
          )
        }}
      />
    </form>
  )
}
