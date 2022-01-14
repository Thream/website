import Image from 'next/image'
import { useState } from 'react'
import classNames from 'classnames'
import date from 'date-and-time'
import useTranslation from 'next-translate/useTranslation'
import { XIcon } from '@heroicons/react/solid'

import { API_URL } from '../../../tools/api'
import { UserPublic } from '../../../models/User'
import { UserProfileGuilds } from './UserProfileGuilds'
import { UserProfileGuild } from './UserProfileGuilds/UserProfileGuild'

export interface UserProfileProps {
  className?: string
  user: UserPublic
}

export const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user } = props
  const { t } = useTranslation()

  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [confirmation, setConfirmation] = useState<boolean>(false)

  const handleConfirmationState = (): void => {
    setConfirmation((confirmation) => !confirmation)
  }

  const handlePopupVisibility = (): void => {
    setShowPopup((showPopup) => !showPopup)
  }

  return (
    <div className='relative h-full flex flex-col items-center justify-center'>
      <div
        className={classNames('transition', {
          'blur-3xl select-none': showPopup
        })}
      >
        <div className='max-w-[1000px] px-12'>
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

            <div className='py-8 px-4' onClick={handlePopupVisibility}>
              <UserProfileGuilds
                isPublicGuilds={user.settings.isPublicGuilds}
              />
            </div>
          </div>
          <div className='mt-7'>
            {user.biography != null && (
              <p className='w-[45%]'>{user.biography}</p>
            )}
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'absolute flex justify-center items-center top-0 h-full w-full bg-zinc-900/75 transition opacity-0 pointer-events-none',
          {
            'opacity-100 visible pointer-events-auto': showPopup
          }
        )}
      >
        <div
          className={classNames(
            'relative h-[400px] w-[400px] py-2 rounded-2xl shadow-xl bg-gray-200 dark:bg-gray-800 scale-0 transition overflow-y-auto overflow-x-hidden',
            { 'scale-100': showPopup }
          )}
        >
          <div
            className={classNames('relative transition h-full', {
              '-translate-x-[150%]': confirmation
            })}
          >
            <UserProfileGuild
              handleConfirmationState={handleConfirmationState}
            />
          </div>

          <div
            className={classNames(
              'absolute w-full h-full flex flex-col justify-center items-center transition-all top-0 left-[150%]',
              { 'left-[0%]': confirmation }
            )}
          >
            <Image
              src='/images/svg/design/join-guild.svg'
              alt='Joing Guild Illustration'
              height={150}
              width={150}
            />
            <div className='flex flex-col mt-8'>
              <h1 className='text-xl mb-6 text-center'>Rejoindre la guild ?</h1>
              <div className='flex gap-7'>
                <button
                  className='px-8 py-2 rounded-3xl bg-success hover:opacity-50 transition'
                  onClick={handleConfirmationState}
                >
                  Oui
                </button>
                <button
                  className='px-8 py-2 rounded-3xl bg-error hover:opacity-50 transition'
                  onClick={handleConfirmationState}
                >
                  Non
                </button>
              </div>
            </div>
          </div>
        </div>
        <XIcon
          height={40}
          onClick={() => setShowPopup(false)}
          className='absolute top-8 right-8 cursor-pointer hover:rotate-180 transition'
        />
      </div>
    </div>
  )
}
