import { PlusSmIcon, ArrowDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import Image from 'next/image'

import { PopupGuildCard } from './PopupGuildCard/PopupGuildCard'
export interface PopupGuildProps {
  className?: string
}

export const PopupGuild: React.FC<PopupGuildProps> = (props) => {
  const { className } = props

  return (
    <div
      className={classNames(
        className,
        'flex p-8 flex-wrap justify-center items-center overflow-y-auto h-full-without-header min-w-full'
      )}
    >
      <PopupGuildCard
        image={
          <Image
            src='/images/svg/design/create-guild.svg'
            alt='Create a guild'
            draggable='false'
            width={230}
            height={230}
          />
        }
        description='Create your own guild and manage everything within a few clicks !'
        link={{
          icon: <PlusSmIcon className='w-8 h-8 mr-2' />,
          text: 'Create a Guild',
          href: '/application/guilds/create'
        }}
      />
      <PopupGuildCard
        image={
          <Image
            src='/images/svg/design/join-guild.svg'
            alt='Join a Guild'
            draggable='false'
            width={200}
            height={200}
          />
        }
        description='Talk, meet and have fun with new friends by joining any interesting guild !'
        link={{
          icon: <ArrowDownIcon className='w-6 h-6 mr-2' />,
          text: 'Join a Guild',
          href: '/application/guilds/join'
        }}
      />
    </div>
  )
}
