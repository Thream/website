import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAuthentication } from '../../../tools/authentication'
import { GuildPublic as GuildPublicType } from '../../../models/Guild'
import { Loader } from '../../design/Loader'
import { GuildPublic } from './GuildPublic'
import { usePagination } from '../../../hooks/usePagination'
import { SocketData, handleSocketData } from '../../../tools/handleSocketData'

export const JoinGuildsPublic: React.FC = () => {
  const [search, setSearch] = useState('')

  const { authentication } = useAuthentication()
  const { t } = useTranslation()

  const { items, hasMore, nextPage, resetPagination, setItems } =
    usePagination<GuildPublicType>({
      api: authentication.api,
      url: '/guilds/public'
    })

  useEffect(() => {
    authentication?.socket?.on(
      'guilds',
      (data: SocketData<GuildPublicType>) => {
        handleSocketData({ data, setItems })
      }
    )

    return () => {
      authentication?.socket?.off('guilds')
    }
  }, [authentication.socket, setItems])

  useEffect(() => {
    resetPagination()
    nextPage({ search })
  }, [resetPagination, nextPage, search])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value)
  }

  return (
    <div className='flex h-full w-full flex-col transition-all'>
      <input
        data-cy='search-guild-input'
        onChange={handleChange}
        className='my-6 mx-auto mt-16 w-10/12 rounded-md border border-gray-500 bg-white p-3 dark:border-gray-700 dark:bg-[#3B3B3B] sm:w-8/12 md:w-6/12 lg:w-5/12'
        type='search'
        name='search-guild'
        placeholder={`🔎  ${t('application:search')}...`}
      />
      <div className='w-full p-12'>
        <InfiniteScroll
          className='guilds-public-list relative mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fill,_minmax(20em,_1fr))] gap-8 !overflow-visible'
          dataLength={items.length}
          next={nextPage}
          scrollableTarget='application-page-content'
          hasMore={hasMore}
          loader={<Loader className='absolute left-1/2 -translate-x-1/2' />}
        >
          {items.map((guild) => {
            return <GuildPublic guild={guild} key={guild.id} />
          })}
        </InfiniteScroll>
      </div>
    </div>
  )
}
