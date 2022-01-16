import { useState } from 'react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import classNames from 'classnames'

import { Emoji } from 'components/Emoji'
import { ConfirmGuildJoin } from 'components/Application/ConfirmGuildJoin'

import { GuildPublic as GuildPublicType } from '../../../../models/Guild'

export interface GuildPublicProps {
  guild: GuildPublicType
}

export const GuildPublic: React.FC<GuildPublicProps> = (props) => {
  const { guild } = props
  const [isConfirmed, setIsConfirmed] = useState(false)

  const { t } = useTranslation()

  return (
    <div className='relative overflow-hidden rounded border border-gray-500 dark:border-gray-700 hover:-translate-y-2 hover:shadow-none shadow-lg transition duration-200 ease-in-out'>
      <div
        className={classNames(
          'flex flex-col items-center h-full justify-center cursor-pointer p-4 pt-8 transition duration-200 ease-in-out',
          { '-translate-x-full': isConfirmed }
        )}
        onClick={() => setIsConfirmed(!isConfirmed)}
      >
        <Image
          className='rounded-full'
          src={
            guild.icon != null ? guild.icon : '/images/data/guild-default.png'
          }
          alt='logo'
          width={80}
          height={80}
        />
        <div className='w-full px-4 m-2 text-center mt-6'>
          <h3
            data-cy='guild-name'
            className='w-full center font-bold text-xl mb-2 truncate'
          >
            {guild.name}
          </h3>
          <p className='break-words'>
            {guild.description != null ? (
              guild.description
            ) : (
              <span className='flex h-full opacity-25 justify-center items-center'>
                <Emoji value=':eyes:' size={25} />
                <span className='ml-2'>Nothing&apos;s here...</span>
              </span>
            )}
          </p>
        </div>
        <p className='flex flex-col text-green-800 dark:text-green-400 mt-auto'>
          {guild.membersCount} {t('application:members')}
        </p>
      </div>
      <ConfirmGuildJoin
        className={classNames(
          'absolute w-full h-full flex flex-col w-ful h-ful top-1/2 -translate-y-1/2 left-full translate-x- rounded-2xl justify-center items-center transition-all',
          {
            '!left-0': isConfirmed
          }
        )}
        handleJoinGuild={() => setIsConfirmed(!isConfirmed)}
      />
    </div>
  )
}
