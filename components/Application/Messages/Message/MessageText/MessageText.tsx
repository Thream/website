import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'

import { Emoji, emojiPlugin, isStringWithOnlyOneEmoji } from '../../../../Emoji'
import { MessageWithMember } from '../../../../../models/Message'

export interface MessageContentProps {
  message: MessageWithMember
}

export const MessageText: React.FC<MessageContentProps> = (props) => {
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
      remarkPlugins={[[gfm], [remarkBreaks], [remarkMath]]}
      rehypePlugins={[[emojiPlugin], [rehypeKatex]]}
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
