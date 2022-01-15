import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/solid'

import { useAuthentication } from '../../../tools/authentication'
import { GuildPublic as GuildPublicType } from '../../../models/Guild'
import { Loader } from '../../design/Loader'
import { GuildPublic } from './GuildPublic'
import { usePagination } from '../../../hooks/usePagination'
import { ConfirmGuildJoin } from '../ConfirmGuildJoin'

export const JoinGuildsPublic: React.FC = () => {
  const [search, setSearch] = useState('')
  const [confirmation, setConfirmation] = useState<boolean>(false)
  const { authentication } = useAuthentication()
  const { t } = useTranslation()

  const handleConfirmationJoinGuild = (): void => {
    setConfirmation(!confirmation)
  }

  const { items, hasMore, nextPage, resetPagination } =
    usePagination<GuildPublicType>({
      api: authentication.api,
      url: '/guilds/public'
    })

  useEffect(() => {
    resetPagination()
    nextPage({ search })
  }, [resetPagination, nextPage, search])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value)
  }

  return (
    <div className='relative w-full h-full'>
      <div
        className={classNames('flex flex-col transition w-full h-full', {
          'blur-lg': confirmation
        })}
      >
        <input
          data-cy='search-guild-input'
          onChange={handleChange}
          className='w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 bg-white dark:bg-[#3B3B3B] border-gray-500 dark:border-gray-700 p-3 my-6 mt-16 mx-auto rounded-md border'
          type='search'
          name='search-guild'
          placeholder={`🔎  ${t('application:search')}...`}
        />
        <div className='w-full p-12'>
          <InfiniteScroll
            className='guilds-public-list max-w-[1400px] mx-auto grid gap-8 grid-cols-[repeat(auto-fill,_minmax(20em,_1fr))] !overflow-visible'
            dataLength={items.length}
            next={nextPage}
            scrollableTarget='application-page-content'
            hasMore={hasMore}
            loader={<Loader />}
          >
            {items.map((guild) => {
              return (
                <GuildPublic
                  guild={guild}
                  key={guild.id}
                  handlerClickJoin={handleConfirmationJoinGuild}
                />
              )
            })}
          </InfiniteScroll>
        </div>
      </div>
      <div
        className={classNames(
          'absolute h-full top-0 left-0 w-full tranition opacity-100 visible',
          {
            'opacity-0 invisible': !confirmation
          }
        )}
      >
        <XIcon
          className='fixed top-20 right-6 p-4 cursor-pointer transition hover:rotate-180 z-10'
          onClick={handleConfirmationJoinGuild}
          height={75}
        />

        <ConfirmGuildJoin
          className={classNames(
            'fixed flex flex-col w-max top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-14 rounded-2xl justify-center items-center bg-slate-800 dark:bg-slate-800 transition-all scale-0',
            { 'scale-100': confirmation }
          )}
          handleJoinGuild={handleConfirmationJoinGuild}
        />
      </div>
    </div>
  )
}
