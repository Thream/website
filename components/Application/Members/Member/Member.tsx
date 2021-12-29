import Image from 'next/image'

import { MemberWithPublicUser } from 'models/Member'
import { API_URL } from 'utils/api'

export interface MemberProps {
  member: MemberWithPublicUser
}

export const Member: React.FC<MemberProps> = (props) => {
  const { member } = props

  return (
    <div className='flex items-center cursor-pointer py-2 px-4 pr-10 rounded hover:bg-gray-300 dark:hover:bg-gray-900'>
      <div className='min-w-[50px] flex rounded-full'>
        <Image
          src={
            member.user.logo == null
              ? '/images/data/user-default.png'
              : API_URL + member.user.logo
          }
          alt={"Users's profil picture"}
          height={50}
          width={50}
          draggable={false}
          className='rounded-full'
        />
      </div>
      <div className='max-w-[145px] ml-4'>
        <p className='overflow-hidden whitespace-nowrap overflow-ellipsis'>
          {member.user.name}
        </p>
        {member.user.status != null && <span>{member.user.status}</span>}
      </div>
    </div>
  )
}
