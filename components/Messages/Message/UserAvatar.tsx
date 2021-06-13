import { Avatar } from 'components/design/Avatar'
import { API_URL } from 'utils/api'
import { User } from 'utils/authentication'

export interface UserAvatarProps {
  user: User
}

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  return (
    <>
      <span className='user-avatar'>
        <Avatar
          src={`${API_URL}${props.user.logo}`}
          alt={props.user.name}
          width={50}
          height={50}
        />
      </span>

      <style jsx>
        {`
          .user-avatar {
            cursor: pointer;
            position: absolute;
            flex: 0 0 auto;
            left: 12px;
            overflow: hidden;
          }
        `}
      </style>
    </>
  )
}
