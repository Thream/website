import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import date from 'date-and-time'
import { API_URL } from 'tools/api'

import { UserPublic } from '../../../models/User'
import { UserProfileGuilds } from '../UserProfileGuilds'

export interface UserProfileProps {
  className?: string
  user: UserPublic
}

export const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user } = props
  const { t } = useTranslation()

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <div className='min-w-[850px]'>
        <div className='flex justify-between items-center'>
          <div className='w-max flex items-center'>
            <div className='relative flex justify-center items-center rounded-full overflow-hidden transition-all shadow-lg'>
              <Image
                className='rounded-full'
                src={
                  user.logo != null
                    ? API_URL + user.logo
                    : '/images/data/user-default.png'
                }
                alt='Profil Picture'
                draggable='false'
                height={125}
                width={125}
              />
            </div>
            <div className='flex flex-col ml-10'>
              <div className='flex items-center mb-2'>
                <p className='text-3xl font-bold space tracking-wide text-white'>
                  {user.name}
                </p>
                <p className='ml-8 text-sm tracking-widest text-white opacity-40 select-none'>
                  {date.format(new Date(user.createdAt), 'DD/MM/YYYY')}
                </p>
              </div>
              <div className='text-left my-2'>
                {user.email != null && (
                  <p className='font-bold'>
                    Email:{' '}
                    <a
                      href={`mailto:${user.email}`}
                      target='_blank'
                      className='relative ml-2 opacity-80 hover:opacity-100 transition-all no-underline font-normal tracking-wide after:absolute after:left-0 after:bottom-[-1px] after:bg-black dark:after:bg-white after:h-[1px] after:w-0 after:transition-all hover:after:w-full'
                      rel='noreferrer'
                    >
                      {user.email}
                    </a>
                  </p>
                )}
                {user.website != null && (
                  <p className='font-bold'>
                    {t('application:website')}:{' '}
                    <a
                      href={user.website}
                      className='relative ml-2 opacity-80 hover:opacity-100 transition-all no-underline font-normal tracking-wide after:absolute after:left-0 after:bottom-[-2px] after:bg-black dark:after:bg-white after:h-[1px] after:w-0 after:transition-all hover:after:w-full'
                    >
                      {user.website}
                    </a>
                  </p>
                )}
                {user.status != null && (
                  <p className='flex font-bold'>
                    {t('application:status')}:{' '}
                    <span className='ml-2 font-normal tracking-wide'>
                      {user.status}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <UserProfileGuilds isPublic={user.settings.isPublicEmail} />
        </div>
        <div className='mt-7'>
          {user.biography != null && (
            <p className='w-[45%]'>{user.biography}</p>
          )}
        </div>
      </div>
    </div>
  )
}
