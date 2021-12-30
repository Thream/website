import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

import { Emoji, emojiPlugin, isStringWithOnlyOneEmoji } from '../../../../Emoji'
import { MessageWithMember } from '../../../../../models/Message'

export interface MessageContentProps {
  message: MessageWithMember
}

export const MessageContent: React.FC<MessageContentProps> = (props) => {
  const { message } = props

  const isMessageWithOnlyOneEmoji = useMemo(() => {
    return isStringWithOnlyOneEmoji(message.value)
  }, [message.value])

  if (isMessageWithOnlyOneEmoji) {
    return (
      <div>
        <p>
          <Emoji value={message.value} size={40} />
        </p>
      </div>
    )
  }

  return (
    <ReactMarkdown
      disallowedElements={['table']}
      unwrapDisallowed
      remarkPlugins={[[gfm], [remarkBreaks]]}
      rehypePlugins={[emojiPlugin]}
      linkTarget='_blank'
      components={{
        emoji: (props) => {
          return <Emoji value={props.value} size={20} />
        }
      }}
    >
      {message.value}
    </ReactMarkdown>
  )
}
