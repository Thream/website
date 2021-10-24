import { memo } from 'react'

import { MessageContent } from './MessageContent'
import { MessageHeader } from './MessageHeader'
import { UserAvatar } from './UserAvatar'
import { Message as MessageProps } from 'contexts/Messages'

export const Message: React.FunctionComponent<MessageProps> = memo((props) => {
  return (
    <>
      <div className='message'>
        <UserAvatar user={props.user} />
        <MessageHeader createdAt={props.createdAt} user={props.user} />
        <MessageContent
          value={props.value}
          type={props.type}
          mimetype={props.mimetype}
        />
      </div>

      <style jsx>
        {`
          .message:hover {
            background-color: var(--color-background-tertiary);
          }
          .message {
            transition: background-color 0.15s ease-in-out;
            margin-top: 2.3rem;
            min-height: 2.75rem;
            padding-left: 72px;
            position: relative;
            word-wrap: break-word;
            flex: 0 0 auto;
            position: relative;
          }
        `}
      </style>
    </>
  )
})
