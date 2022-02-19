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
    <div className='relative overflow-hidden rounded border border-gray-500 shadow-lg transition duration-200 ease-in-out hover:-translate-y-2 hover:shadow-none dark:border-gray-700'>
      <div
        className={classNames(
          'flex h-full cursor-pointer flex-col items-center justify-center p-4 pt-8 transition duration-200 ease-in-out',
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
        <div className='m-2 mt-6 w-full px-4 text-center'>
          <h3
            data-cy='guild-name'
            className='center mb-2 w-full truncate text-xl font-bold'
          >
            {guild.name}
          </h3>
          <p className='break-words'>
            {guild.description != null ? (
              guild.description
            ) : (
              <span className='flex h-full items-center justify-center opacity-25'>
                <Emoji value=':eyes:' size={25} />
                <span className='ml-2'>Nothing&apos;s here...</span>
              </span>
            )}
          </p>
        </div>
        <p className='mt-auto flex flex-col text-green-800 dark:text-green-400'>
          {guild.membersCount} {t('application:members')}
        </p>
      </div>
      <ConfirmGuildJoin
        className={classNames(
          'w-ful h-ful translate-x- absolute top-1/2 left-full flex h-full w-full -translate-y-1/2 flex-col items-center justify-center rounded-2xl transition-all',
          {
            '!left-0': isConfirmed
          }
        )}
        handleJoinGuild={() => setIsConfirmed(!isConfirmed)}
      />
    </div>
  )
}
