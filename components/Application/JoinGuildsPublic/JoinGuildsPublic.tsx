import { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useAuthentication } from 'utils/authentication'
import { GuildPublic } from 'models/Guild'
import { Loader } from 'components/design/Loader'
import { useFetchState } from 'hooks/useFetchState'

export const JoinGuildsPublic: React.FC = () => {
  const [guilds, setGuilds] = useState<GuildPublic[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [inputSearch, setInputSearch] = useState('')
  const [fetchState, setFetchState] = useFetchState('idle')
  const afterId = useRef<number | null>(null)

  const { authentication } = useAuthentication()

  const fetchGuilds = useCallback(async (): Promise<void> => {
    if (fetchState !== 'idle') {
      return
    }
    setFetchState('loading')
    const { data } = await authentication.api.get<GuildPublic[]>(
      `/guilds/public?limit=20&search=${inputSearch}${
        afterId.current != null ? `&after=${afterId.current}` : ''
      }`
    )
    afterId.current = data.length > 0 ? data[data.length - 1].id : null
    setGuilds((oldGuilds) => {
      return [...oldGuilds, ...data]
    })
    setHasMore(data.length > 0)
    setFetchState('idle')
  }, [authentication, fetchState, setFetchState, inputSearch])

  useEffect(() => {
    afterId.current = null
    setGuilds([])
    fetchGuilds().catch((error) => {
      console.error(error)
    })
  }, [inputSearch]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputSearch(event.target.value)
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
          className='guilds-list max-w-[1600px] grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 !overflow-hidden'
          dataLength={guilds.length}
          next={fetchGuilds}
          scrollableTarget='application-page-content'
          hasMore={hasMore}
          loader={<Loader />}
        >
          {guilds.map((guild) => {
            return (
              <div
                key={guild.id}
                className='max-w-sm flex flex-col items-center justify-center border-gray-500 dark:border-gray-700 p-4 cursor-pointer rounded shadow-lg border transition duration-200 ease-in-out hover:-translate-y-2 hover:shadow-none'
              >
                <Image
                  className='rounded-full'
                  src={
                    guild.icon != null
                      ? guild.icon
                      : '/images/data/guild-default.png'
                  }
                  alt='logo'
                  width={80}
                  height={80}
                />
                <div className='m-2 text-center mt-3'>
                  <h3 data-cy='guild-name' className='font-bold text-xl mb-2'>
                    {guild.name}
                  </h3>
                  <p className='text-base w-11/12 mx-auto'>
                    {guild.description}
                  </p>
                </div>
                <p className='flex flex-col text-green-800 dark:text-green-400 mt-4'>
                  {guild.membersCount} members
                </p>
              </div>
            )
          })}
        </InfiniteScroll>
      </div>
    </>
  )
}
