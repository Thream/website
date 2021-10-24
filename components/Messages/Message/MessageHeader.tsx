import date from 'date-and-time'
import { User } from 'utils/authentication'

export interface MessageHeaderProps {
  user: User
  createdAt: string
}

export const MessageHeader: React.FC<MessageHeaderProps> = (props) => {
  return (
    <>
      <h2 className='message-header'>
        <span className='username'>{props.user.name}</span>
        <span className='date'>
          {date.format(new Date(props.createdAt), 'DD/MM/YYYY - HH:mm:ss')}
        </span>
      </h2>

      <style jsx>
        {`
          .message-header {
            position: relative;
            overflow: hidden;
            display: block;
            position: relative;
            line-height: 1.375rem;
            min-height: 1.375rem;
            margin-bottom: 12px;
          }
          .username {
            font-family: 'Poppins', 'Arial', 'sans-serif';
            font-size: 16px;
            font-weight: 600;
            color: var(--color-secondary);
            margin-right: 0.25rem;
          }
          .date {
            font-family: 'Poppins', 'Arial', 'sans-serif';
            font-size: 14px;
            font-weight: 400;
            margin-left: 1em;
            color: var(--color-tertiary);
          }
        `}
      </style>
    </>
  )
}
