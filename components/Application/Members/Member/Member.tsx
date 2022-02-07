import Image from 'next/image'
import Link from 'next/link'

import { MemberWithPublicUser } from '../../../../models/Member'
import { API_URL } from '../../../../tools/api'

export interface MemberProps {
  member: MemberWithPublicUser
}

export const Member: React.FC<MemberProps> = (props) => {
  const { member } = props

  return (
    <Link href={`/application/users/${member.user.id}`}>
      <a>
        <div className='flex cursor-pointer items-center rounded py-2 px-4 pr-10 hover:bg-gray-300 dark:hover:bg-gray-900'>
          <div className='flex min-w-[50px] rounded-full'>
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
          <div className='ml-4 max-w-[145px]'>
            <p
              data-cy='member-user-name'
              className='overflow-hidden overflow-ellipsis whitespace-nowrap'
            >
              {member.user.name}
            </p>
            {member.user.status != null && <span>{member.user.status}</span>}
          </div>
        </div>
      </a>
    </Link>
  )
}
