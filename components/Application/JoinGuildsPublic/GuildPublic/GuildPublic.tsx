import Image from 'next/image'

import { GuildPublic as GuildPublicType } from 'models/Guild'

export interface GuildPublicProps {
  guild: GuildPublicType
}

export const GuildPublic: React.FC<GuildPublicProps> = (props) => {
  const { guild } = props

  return (
    <div
      key={guild.id}
      className='max-w-sm flex flex-col items-center justify-center border-gray-500 dark:border-gray-700 p-4 cursor-pointer rounded shadow-lg border transition duration-200 ease-in-out hover:-translate-y-2 hover:shadow-none'
    >
      <Image
        className='rounded-full'
        src={guild.icon != null ? guild.icon : '/images/data/guild-default.png'}
        alt='logo'
        width={80}
        height={80}
      />
      <div className='m-2 text-center mt-3'>
        <h3 data-cy='guild-name' className='font-bold text-xl mb-2'>
          {guild.name}
        </h3>
        <p className='text-base w-11/12 mx-auto'>{guild.description}</p>
      </div>
      <p className='flex flex-col text-green-800 dark:text-green-400 mt-4'>
        {guild.membersCount} members
      </p>
    </div>
  )
}
