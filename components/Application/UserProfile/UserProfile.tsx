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
import { Guild } from '../../../models/Guild'
import { ConfirmGuildJoin } from '../ConfirmGuildJoin'

export interface UserProfileProps {
  className?: string
  user: UserPublic
  guilds: Guild[]
}

export const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user, guilds } = props
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
    <div className='relative flex h-full flex-col items-center justify-center'>
      <div
        className={classNames('transition', {
          'select-none blur-3xl': showPopup
        })}
      >
        <div className='max-w-[1000px] px-12'>
          <div className='flex items-center justify-between'>
            <div className='flex w-max items-center'>
              <div className='relative flex items-center justify-center overflow-hidden rounded-full shadow-lg transition-all'>
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
              <div className='ml-10 flex flex-col'>
                <div className='mb-2 flex items-center'>
                  <p
                    className='space text-3xl font-bold tracking-wide text-white'
                    data-cy='user-name'
                  >
                    {user.name}
                  </p>
                  <p
                    className='ml-8 select-none text-sm tracking-widest text-white opacity-40'
                    data-cy='user-createdAt'
                  >
                    {date.format(new Date(user.createdAt), 'DD/MM/YYYY')}
                  </p>
                </div>
                <div className='my-2 text-left'>
                  {user.email != null && (
                    <p className='font-bold'>
                      Email:{' '}
                      <a
                        href={`mailto:${user.email}`}
                        target='_blank'
                        className='relative ml-2 font-normal tracking-wide no-underline opacity-80 transition-all after:absolute after:left-0 after:bottom-[-1px] after:h-[1px] after:w-0 after:bg-black after:transition-all hover:opacity-100 hover:after:w-full dark:after:bg-white'
                        rel='noreferrer'
                        data-cy='user-email'
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
                        className='relative ml-2 font-normal tracking-wide no-underline opacity-80 transition-all after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-0 after:bg-black after:transition-all hover:opacity-100 hover:after:w-full dark:after:bg-white'
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
                guilds={guilds}
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

      {/* TODO: We might want to remove this code */}
      <div
        className={classNames(
          'pointer-events-none absolute top-0 flex h-full w-full items-center justify-center bg-zinc-900/75 opacity-0 transition',
          {
            'pointer-events-auto visible opacity-100': showPopup
          }
        )}
      >
        <div
          className={classNames(
            'relative h-[400px] w-[400px] scale-0 overflow-y-auto overflow-x-hidden rounded-2xl bg-gray-200 py-2 shadow-xl transition dark:bg-gray-800',
            { 'scale-100': showPopup }
          )}
        >
          <div
            className={classNames('relative h-full transition', {
              '-translate-x-[150%]': confirmation
            })}
          >
            <UserProfileGuild
              handleConfirmationState={handleConfirmationState}
            />
          </div>

          <ConfirmGuildJoin
            className={classNames(
              'absolute top-0 left-[150%] flex h-full w-full flex-col items-center justify-center transition-all',
              { 'left-[0%]': confirmation }
            )}
            handleJoinGuild={handleConfirmationState}
          />
        </div>
        <XIcon
          height={40}
          onClick={() => setShowPopup(false)}
          className='absolute top-8 right-8 cursor-pointer transition hover:rotate-180'
        />
      </div>
    </div>
  )
}
