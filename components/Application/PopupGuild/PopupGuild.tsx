import useTranslation from 'next-translate/useTranslation'
import { PlusSmIcon, ArrowDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import Image from 'next/image'

import { PopupGuildCard } from './PopupGuildCard/PopupGuildCard'
export interface PopupGuildProps {
  className?: string
}

export const PopupGuild: React.FC<PopupGuildProps> = (props) => {
  const { className } = props

  const { t } = useTranslation()

  return (
    <div
      className={classNames(
        className,
        'h-full-without-header flex min-w-full flex-wrap items-center justify-center overflow-y-auto p-8'
      )}
    >
      <PopupGuildCard
        image={
          <Image
            quality={100}
            src='/images/svg/design/create-guild.svg'
            alt={t('application:create-a-guild')}
            draggable='false'
            width={230}
            height={230}
          />
        }
        description={t('application:create-a-guild-description')}
        link={{
          icon: <PlusSmIcon className='mr-2 h-8 w-8' />,
          text: t('application:create-a-guild'),
          href: '/application/guilds/create'
        }}
      />
      <PopupGuildCard
        image={
          <Image
            quality={100}
            src='/images/svg/design/join-guild.svg'
            alt={t('application:join-a-guild')}
            draggable='false'
            width={200}
            height={200}
          />
        }
        description={t('application:join-a-guild-description')}
        link={{
          icon: <ArrowDownIcon className='mr-2 h-6 w-6' />,
          text: t('application:join-a-guild'),
          href: '/application/guilds/join'
        }}
      />
    </div>
  )
}
