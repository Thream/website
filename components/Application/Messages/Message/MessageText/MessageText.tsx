import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

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
        a: (props) => {
          return (
            <a
              className='text-green-800 hover:underline dark:text-green-400'
              {...props}
            />
          )
        },
        emoji: (props) => {
          return <Emoji value={props.value} size={20} />
        },
        code: (properties) => {
          const { inline, className, children, ...props } = properties
          const match = /language-(\w+)/.exec(className ?? '')
          return !(inline as boolean) && match != null ? (
            <SyntaxHighlighter
              style={vscDarkPlus as any}
              language={match[1]}
              PreTag='div'
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {message.value}
    </ReactMarkdown>
  )
}
