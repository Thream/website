import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAuthentication } from '../../../tools/authentication'
import { GuildPublic as GuildPublicType } from '../../../models/Guild'
import { Loader } from '../../design/Loader'
import { GuildPublic } from './GuildPublic'
import { usePagination } from '../../../hooks/usePagination'

export const JoinGuildsPublic: React.FC = () => {
  const [search, setSearch] = useState('')
  const { authentication } = useAuthentication()
  const { t } = useTranslation()

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
    <>
      <input
        data-cy='search-guild-input'
        onChange={handleChange}
        className='my-6 mx-auto mt-16 w-10/12 rounded-md border border-gray-500 bg-white p-3 dark:border-gray-700 dark:bg-[#3B3B3B] sm:w-8/12 md:w-6/12 lg:w-5/12'
        type='search'
        name='search-guild'
        placeholder={`🔎  ${t('application:search')}...`}
      />
      <div className='flex w-full items-center justify-center p-12'>
        <InfiniteScroll
          className='guilds-public-list grid max-w-[1600px] grid-cols-1 gap-8 !overflow-hidden sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
          dataLength={items.length}
          next={nextPage}
          scrollableTarget='application-page-content'
          hasMore={hasMore}
          loader={<Loader />}
        >
          {items.map((guild) => {
            return <GuildPublic guild={guild} key={guild.id} />
          })}
        </InfiniteScroll>
      </div>
    </>
  )
}
