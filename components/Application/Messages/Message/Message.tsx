import Image from 'next/image'
import date from 'date-and-time'

import { MessageWithMember } from '../../../../models/Message'
import { API_URL } from '../../../../utils/api'

export interface MessageProps {
  message: MessageWithMember
}

export const Message: React.FC<MessageProps> = (props) => {
  const { message } = props

  return (
    <div className='p-4 flex transition hover:bg-gray-200 dark:hover:bg-gray-900'>
      <div className='w-12 h-12 mr-4 flex flex-shrink-0 items-center justify-center'>
        <div className='w-10 h-10 drop-shadow-md'>
          <Image
            className='rounded-full'
            src={
              message.member.user.logo == null
                ? '/images/data/user-default.png'
                : API_URL + message.member.user.logo
            }
            alt={"Users's profil picture"}
            width={50}
            height={50}
            draggable={false}
          />
        </div>
      </div>
      <div className='w-full'>
        <div className='w-max flex items-center'>
          <span className='font-bold text-gray-900 dark:text-gray-200'>
            {message.member.user.name}
          </span>
          <span className='text-gray-500 dark:text-gray-200 text-xs ml-4 select-none'>
            {date.format(new Date(message.createdAt), 'DD/MM/YYYY - HH:mm:ss')}
          </span>
        </div>
        <div className='text-gray-800 dark:text-gray-300 font-paragraph mt-1 break-words'>
          {message.value}
        </div>
      </div>
    </div>
  )
}
