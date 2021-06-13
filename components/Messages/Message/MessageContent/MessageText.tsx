import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Tex from '@matejmazur/react-katex'
import math from 'remark-math'
import 'katex/dist/katex.min.css'

import { Emoji, emojiPlugin, isStringWithOnlyOneEmoji } from 'components/Emoji'

export interface MessageTextProps {
  value: string
}

export const MessageText: React.FC<MessageTextProps> = (props) => {
  const isMessageWithOnlyOneEmoji = useMemo(() => {
    return isStringWithOnlyOneEmoji(props.value)
  }, [props.value])

  if (isMessageWithOnlyOneEmoji) {
    return (
      <div className='message-content'>
        <p>
          <Emoji value={props.value} size={40} />
        </p>
      </div>
    )
  }

  return (
    <>
      <ReactMarkdown
        disallowedTypes={['heading', 'table']}
        unwrapDisallowed
        plugins={[[gfm], [emojiPlugin], [math]]}
        linkTarget='_blank'
        renderers={{
          inlineMath: ({ value }) => <Tex math={value} />,
          math: ({ value }) => <Tex block math={value} />,
          emoji: ({ value }) => {
            return <Emoji value={value} size={20} />
          }
        }}
      >
        {props.value}
      </ReactMarkdown>

      <style jsx global>
        {`
          .message-content p {
            margin: 0;
            line-height: 30px;
            white-space: pre-wrap;
          }
          .message-content .katex,
          .message-content .katex-display {
            text-align: initial;
          }
        `}
      </style>
    </>
  )
}
