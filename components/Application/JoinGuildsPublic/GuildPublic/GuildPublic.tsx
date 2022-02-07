import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { GuildPublic as GuildPublicType } from '../../../../models/Guild'

export interface GuildPublicProps {
  guild: GuildPublicType
}

export const GuildPublic: React.FC<GuildPublicProps> = (props) => {
  const { guild } = props

  const { t } = useTranslation()

  return (
    <div className='flex max-w-sm cursor-pointer flex-col items-center justify-center rounded border border-gray-500 p-4 shadow-lg transition duration-200 ease-in-out hover:-translate-y-2 hover:shadow-none dark:border-gray-700'>
      <Image
        className='rounded-full'
        src={guild.icon != null ? guild.icon : '/images/data/guild-default.png'}
        alt='logo'
        width={80}
        height={80}
      />
      <div className='m-2 mt-3 text-center'>
        <h3 data-cy='guild-name' className='mb-2 text-xl font-bold'>
          {guild.name}
        </h3>
        <p className='mx-auto w-11/12 text-base'>{guild.description}</p>
      </div>
      <p className='mt-4 flex flex-col text-green-800 dark:text-green-400'>
        {guild.membersCount} {t('application:members')}
      </p>
    </div>
  )
}
