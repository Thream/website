import Image from 'next/image'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'

const JoinGuildPage: React.FC<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <Head title='Thream | Application' />
      <Application path='/application/guilds/join'>
        <input
          className='w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 bg-white dark:bg-[#3B3B3B] border-gray-500 dark:border-gray-700 p-3 my-6 mt-16 mx-auto rounded-md border'
          type='search'
          name='search_guild'
          placeholder='🔎  Search...'
        />
        <div className='w-full flex items-center justify-center p-12'>
          <div className='max-w-[1600px] grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8'>
            {new Array(100).fill(null).map((_, index) => {
              return (
                <div
                  key={index}
                  className='max-w-sm flex flex-col items-center justify-center border-gray-500 dark:border-gray-700 p-4 cursor-pointer rounded shadow-lg border transition duration-200 ease-in-out hover:-translate-y-2 hover:shadow-none'
                >
                  <Image
                    src='/images/icons/Thream.png'
                    alt='logo'
                    width={80}
                    height={80}
                  />
                  <div className='m-2 text-center mt-3'>
                    <h3 className='font-bold text-xl mb-2'>Guild</h3>
                    <p className='text-base w-11/12 mx-auto'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                  </div>
                  <p className='flex flex-col text-green-800 dark:text-green-400 mt-4'>
                    54 members
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Application>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default JoinGuildPage
