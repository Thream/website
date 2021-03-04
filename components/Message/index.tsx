import { User } from 'utils/authentication'

interface MessageProps {
  id: number
  value: string
  type: 'text' | 'file'
  mimetype: string
  memberId: number
  channelId: number
  createdAt: string
  updatedAt: string
  user: User
}

export const Message: React.FunctionComponent<MessageProps> = (props) => {
  const { value } = props

  return (
    <>
      <p>{value}</p>

      <style jsx>
        {`
          p {
            padding: 1em;
            color: var(--color-tertiary);
          }
        `}
      </style>
    </>
  )
}
