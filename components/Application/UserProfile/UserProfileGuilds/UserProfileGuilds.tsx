import Image from 'next/image'
import classNames from 'classnames'
import { EyeOffIcon } from '@heroicons/react/solid'
import useTranslation from 'next-translate/useTranslation'

import { Guild } from '../../../../models/Guild'

export interface UserProfileGuildsProps {
  isPublicGuilds?: boolean
  guilds: Guild[]
}

export const UserProfileGuilds: React.FC<UserProfileGuildsProps> = (props) => {
  const { isPublicGuilds = false } = props
  const { t } = useTranslation()

  return (
    <div
      className={classNames('relative cursor-pointer', {
        'cursor-auto': !isPublicGuilds
      })}
    >
      <div
        className={classNames('flex -space-x-7', {
          'select-none blur-lg': !isPublicGuilds
        })}
      >
        <div className='flex items-center justify-center rounded-full drop-shadow-lg filter'>
          <Image
            className='rounded-full'
            src='/images/guilds/Guild_1.svg'
            alt={'Profil Picture'}
            draggable='false'
            height={60}
            width={60}
          />
        </div>
        <div className='flex items-center justify-center rounded-full drop-shadow-lg filter'>
          <Image
            className='rounded-full'
            src='/images/guilds/Guild_2.svg'
            alt={'Profil Picture'}
            draggable='false'
            height={60}
            width={60}
          />
        </div>
        <div className='flex items-center justify-center rounded-full drop-shadow-lg filter'>
          <Image
            className='rounded-full'
            src='/images/guilds/Guild_3.svg'
            alt={'Profil Picture'}
            draggable='false'
            height={60}
            width={60}
          />
        </div>
        <div className='flex items-center justify-center rounded-full drop-shadow-lg filter'>
          <Image
            className='rounded-full'
            src='/images/guilds/Guild_4.svg'
            alt={'Profil Picture'}
            draggable='false'
            height={60}
            width={60}
          />
        </div>
        <div className='flex items-center justify-center rounded-full drop-shadow-lg filter'>
          <Image
            className='rounded-full'
            src='/images/guilds/Guild_5.svg'
            alt={'Profil Picture'}
            draggable='false'
            height={60}
            width={60}
          />
        </div>
        <div className='flex items-center justify-center rounded-full drop-shadow-lg filter'>
          <Image
            className='rounded-full'
            src='/images/guilds/Guild_6.svg'
            alt={'Profil Picture'}
            draggable='false'
            height={60}
            width={60}
          />
        </div>
        <div className='z-10 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-300 drop-shadow-lg filter dark:bg-gray-800'>
          <span className='select-none text-xl font-bold text-black dark:text-white'>
            +4
          </span>
        </div>
      </div>
      <div
        className={classNames(
          'absolute top-1/2 flex -translate-y-1/2 items-center',
          { hidden: isPublicGuilds }
        )}
      >
        <EyeOffIcon height={25} />
        <p className='ml-4 drop-shadow-2xl'>
          {t('application:private-user-guilds-list')}
        </p>
      </div>
    </div>
  )
}
