import Image from 'next/image'
import Link from 'next/link'

import { MemberWithPublicUser } from '../../../../models/Member'
import { Emoji } from '../../../Emoji'

export interface MemberProps {
  member: MemberWithPublicUser
}

export const Member: React.FC<MemberProps> = (props) => {
  const { member } = props

  return (
    <Link href={`/application/users/${member.user.id}`}>
      <a>
        <div className='flex cursor-pointer items-center overflow-hidden py-2 px-6 pr-10 hover:bg-gray-300 dark:hover:bg-gray-900'>
          <div className='flex min-w-[50px] rounded-full'>
            <Image
              src={
                member.user.logo == null
                  ? '/images/data/user-default.png'
                  : member.user.logo
              }
              alt={"Users's profil picture"}
              height={50}
              width={50}
              draggable={false}
              className='rounded-full'
            />
          </div>
          <div className='ml-5'>
            <p data-cy='member-user-name' className='flex truncate font-bold'>
              {member.user.name}
              {member.isOwner && (
                <span className='ml-4'>
                  <Emoji value=':crown:' size={18} />
                </span>
              )}
            </p>
            {member.user.status != null && member.user.status}
          </div>
        </div>
      </a>
    </Link>
  )
}
