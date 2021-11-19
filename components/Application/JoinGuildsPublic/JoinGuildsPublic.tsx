import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAuthentication } from 'utils/authentication'
import { GuildPublic as GuildPublicType } from 'models/Guild'
import { Loader } from 'components/design/Loader'
import { GuildPublic } from './GuildPublic'
import { usePagination } from 'hooks/usePagination'

export const JoinGuildsPublic: React.FC = () => {
  const [search, setSearch] = useState('')
  const { authentication } = useAuthentication()

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
        className='w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 bg-white dark:bg-[#3B3B3B] border-gray-500 dark:border-gray-700 p-3 my-6 mt-16 mx-auto rounded-md border'
        type='search'
        name='search-guild'
        placeholder='🔎  Search...'
      />
      <div className='w-full flex items-center justify-center p-12'>
        <InfiniteScroll
          className='guilds-public-list max-w-[1600px] grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 !overflow-hidden'
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
