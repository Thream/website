import useTranslation from 'next-translate/useTranslation'

import { useAuthentication } from '../../../../../tools/authentication'
import { Emoji } from '../../../../Emoji'
import type { MessageProps } from '../Message'

interface MessageOptionsProps extends MessageProps {
  handleEdit: () => void
  editMode: ':white_check_mark:' | ':pencil2:'
}

export const MessageOptions: React.FC<
  React.PropsWithChildren<MessageOptionsProps>
> = ({ handleEdit, editMode, message }) => {
  const { t } = useTranslation()
  const { authentication } = useAuthentication()

  const handleDeleteMessage = async (): Promise<void> => {
    try {
      await authentication.api.delete(`/messages/${message.id}`)
    } catch {}
  }

  return (
    <div className='absolute right-6 -top-8 flex opacity-0 transition-opacity group-hover:opacity-100'>
      {message.type === 'text' && (
        <div
          className='message-options rounded-l-lg border-l-slate-600'
          title={t('application:edit')}
          onClick={handleEdit}
        >
          <Emoji value={editMode} size={18} />
        </div>
      )}
      <div
        className='message-options rounded-r-lg border-r-slate-600'
        title={t('application:delete')}
        onClick={handleDeleteMessage}
      >
        <Emoji value=':wastebasket:' size={18} />
      </div>
    </div>
  )
}
