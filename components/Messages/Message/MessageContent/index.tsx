import { Loader } from 'components/design/Loader'
import { MessageType } from 'contexts/Messages'
import { MessageFile } from './MessageFile'
import { MessageText } from './MessageText'

export interface MessageContentProps {
  value: string
  type: MessageType
  mimetype: string
}

export const MessageContent: React.FC<MessageContentProps> = (props) => {
  return (
    <>
      <div className='message-content'>
        {props.type === 'text' ? (
          <MessageText value={props.value} />
        ) : props.type === 'file' ? (
          <MessageFile {...props} />
        ) : (
          <Loader />
        )}
      </div>

      <style jsx>
        {`
          .message-content {
            font-family: 'Roboto', 'Arial', 'sans-serif';
            font-size: 16px;
            font-weight: 400;
            position: relative;
            margin-left: -75px;
            padding-left: 75px;
            overflow: hidden;
          }
        `}
      </style>
    </>
  )
}
