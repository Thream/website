import Image from 'next/image'
import { PencilIcon, PhotographIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import date from 'date-and-time'

import { UserPublic } from '../../../models/User'

export interface UserProfileProps {
  className?: string
  isOwner?: boolean
  user: UserPublic
}

export const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user, isOwner = false } = props

  const { t } = useTranslation()

  const handleSubmitChanges = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()
  }

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <div className='min-w-[1080px]'>
        <div className='flex justify-between items-center'>
          <div className='w-max flex items-center'>
            <div
              className={classNames(
                'relative flex justify-center items-center rounded-full overflow-hidden transition-all shadow-lg',
                {
                  'after:absolute after:w-full after:h-full border-4 border-white cursor-pointer':
                    isOwner
                }
              )}
            >
              {isOwner && (
                <div className='absolute w-full h-full z-50'>
                  <button className='relative w-full h-full flex items-center justify-center transition hover:-translate-y-1'>
                    <input
                      type='file'
                      className='absolute w-full h-full opacity-0 cursor-pointer'
                    />
                    <PhotographIcon className='w-14 h-14' />
                  </button>
                </div>
              )}
              <Image
                className={classNames('rounded-full', {
                  'opacity-30': isOwner
                })}
                src='/images/data/divlo.png'
                alt={'Profil Picture'}
                draggable='false'
                height={125}
                width={125}
              />
            </div>
            <div className='flex flex-col ml-10'>
              <div className='flex items-center mb-2 border'>
                <form onSubmit={handleSubmitChanges}>
                  <input
                    type='text'
                    value={user.name}
                    className='min-w-[10px] border bg-transparent text-3xl font-bold space tracking-wide text-white'
                    disabled
                  />
                </form>
                {isOwner && (
                  <button className='ml-2 text-gray-500'>
                    <PencilIcon className='w-6 h-6' />
                  </button>
                )}
                <span className='h-5 w-5 bg-error shadow-error ml-4 rounded-full'>
                  {''}
                </span>
                <p className='ml-8 text-sm tracking-widest text-white opacity-40 select-none'>
                  {date.format(new Date(user.createdAt), 'DD/MM/YYYY')}
                </p>
              </div>
              <div className='text-left my-2'>
                {user.website != null && (
                  <p className='font-bold'>
                    {t('application:website')}:{' '}
                    <a
                      href={user.website}
                      className='relative ml-2 opacity-80 hover:opacity-100 transition-all no-underline font-normal tracking-wide after:absolute after:left-0 after:bottom-[-1px] after:bg-black dark:after:bg-white after:h-[1px] after:w-0 after:transition-all hover:after:w-full'
                    >
                      {user.website}
                    </a>
                  </p>
                )}
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
              </div>
            </div>
          </div>
          <div className='flex -space-x-7'>
            <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
              <Image
                className='rounded-full'
                src='/images/guilds/Guild_1.svg'
                alt={'Profil Picture'}
                draggable='false'
                height={60}
                width={60}
              />
            </div>
            <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
              <Image
                className='rounded-full'
                src='/images/guilds/Guild_2.svg'
                alt={'Profil Picture'}
                draggable='false'
                height={60}
                width={60}
              />
            </div>
            <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
              <Image
                className='rounded-full'
                src='/images/guilds/Guild_3.svg'
                alt={'Profil Picture'}
                draggable='false'
                height={60}
                width={60}
              />
            </div>
            <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
              <Image
                className='rounded-full'
                src='/images/guilds/Guild_4.svg'
                alt={'Profil Picture'}
                draggable='false'
                height={60}
                width={60}
              />
            </div>
            <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
              <Image
                className='rounded-full'
                src='/images/guilds/Guild_5.svg'
                alt={'Profil Picture'}
                draggable='false'
                height={60}
                width={60}
              />
            </div>
            <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
              <Image
                className='rounded-full'
                src='/images/guilds/Guild_6.svg'
                alt={'Profil Picture'}
                draggable='false'
                height={60}
                width={60}
              />
            </div>
            {/* End of the guilds list */}
            <div className='w-[60px] h-[60px] flex justify-center items-center rounded-full filter drop-shadow-lg bg-gray-300 dark:bg-gray-800 z-10'>
              <span className='font-bold text-black dark:text-white text-xl select-none'>
                +4
              </span>
            </div>
          </div>
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
