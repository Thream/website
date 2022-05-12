import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import classNames from 'classnames'
import axios from 'axios'

import { Emoji } from '../../../Emoji'
import { ConfirmPopup } from '../../ConfirmPopup'
import {
  GuildPublic as GuildPublicType,
  GuildWithDefaultChannelId
} from '../../../../models/Guild'
import { useAuthentication } from '../../../../tools/authentication'

export interface GuildPublicProps {
  guild: GuildPublicType
}

export const GuildPublic: React.FC<GuildPublicProps> = (props) => {
  const { guild } = props
  const router = useRouter()
  const { authentication } = useAuthentication()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const { t } = useTranslation()

  const handleIsConfirmed = (): void => {
    setIsConfirmed((isConfirmed) => !isConfirmed)
  }

  const handleYes = async (): Promise<void> => {
    try {
      const { data } = await authentication.api.post<{
        guild: GuildWithDefaultChannelId
      }>(`/guilds/${guild.id}/members/join`)
      await router.push(
        `/application/${guild.id}/${data.guild.defaultChannelId}`
      )
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 400 &&
        typeof error?.response?.data.defaultChannelId === 'number'
      ) {
        const defaultChannelId = error.response.data.defaultChannelId as number
        await router.push(`/application/${guild.id}/${defaultChannelId}`)
      } else {
        await router.push('/application')
      }
    }
  }

  return (
    <div className='relative h-80 overflow-hidden rounded border border-gray-500 shadow-lg transition duration-200 ease-in-out hover:-translate-y-2 hover:shadow-none dark:border-gray-700'>
      <div
        className={classNames(
          'flex h-full cursor-pointer flex-col items-center justify-center p-4 pt-8 transition duration-200 ease-in-out',
          { '-translate-x-full': isConfirmed }
        )}
        onClick={handleIsConfirmed}
      >
        <Image
          quality={100}
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
              <span className='flex h-full items-center justify-center opacity-40 dark:opacity-20'>
                <Emoji value=':eyes:' size={25} />
                <span className='ml-2'>{t('application:nothing-here')}</span>
              </span>
            )}
          </p>
        </div>
        <p className='mt-auto flex flex-col text-green-800 dark:text-green-400'>
          {guild.membersCount} {t('application:members')}
        </p>
      </div>
      <ConfirmPopup
        title={`${t('application:join-the-guild')} ?`}
        className={classNames(
          'w-ful h-ful translate-x- absolute top-1/2 left-full flex h-full w-full -translate-y-1/2 flex-col items-center justify-center rounded-2xl transition-all',
          {
            '!left-0': isConfirmed
          }
        )}
        handleYes={handleYes}
        handleNo={handleIsConfirmed}
      />
    </div>
  )
}
