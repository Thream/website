import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { Emoji } from 'components/Emoji'

import { GuildPublic as GuildPublicType } from '../../../../models/Guild'

export interface GuildPublicProps {
  guild: GuildPublicType
  handlerClickJoin: () => void
}

export const GuildPublic: React.FC<GuildPublicProps> = (props) => {
  const { guild, handlerClickJoin } = props

  const { t } = useTranslation()

  return (
    <div
      className='flex flex-col items-center justify-center border-gray-500 dark:border-gray-700 p-4 pt-8 cursor-pointer rounded shadow-lg border transition duration-200 ease-in-out hover:-translate-y-2 hover:shadow-none'
      onClick={handlerClickJoin}
    >
      <Image
        className='rounded-full'
        src={guild.icon != null ? guild.icon : '/images/data/guild-default.png'}
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
  )
}
