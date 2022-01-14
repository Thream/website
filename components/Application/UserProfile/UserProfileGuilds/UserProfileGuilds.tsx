import Image from 'next/image'
import classNames from 'classnames'
import { EyeOffIcon } from '@heroicons/react/solid'
import useTranslation from 'next-translate/useTranslation'

export interface UserProfileGuildsProps {
  isPublicGuilds?: boolean
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
          'blur-lg select-none': !isPublicGuilds
        })}
      >
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
        <div className='w-[60px] h-[60px] flex justify-center items-center rounded-full filter drop-shadow-lg bg-gray-300 dark:bg-gray-800 z-10'>
          <span className='font-bold text-black dark:text-white text-xl select-none'>
            +4
          </span>
        </div>
      </div>
      <div
        className={classNames(
          'absolute flex items-center top-1/2 -translate-y-1/2',
          { hidden: isPublicGuilds }
        )}
      >
        <EyeOffIcon height={25} />
        <p className='drop-shadow-2xl ml-4'>
          {t('application:private-user-guilds-list')}
        </p>
      </div>
    </div>
  )
}
