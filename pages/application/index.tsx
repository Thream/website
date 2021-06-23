import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSwipeable } from 'react-swipeable'
import classNames from 'classnames'
import {
  MenuIcon,
  UsersIcon,
  XIcon,
  CogIcon,
  PlusIcon
} from '@heroicons/react/solid'

import { Head } from 'components/Head'
import { SwitchTheme } from 'components/Header/SwitchTheme'

const ApplicationPage: React.FC = () => {
  const [visibleSidebar, setVisibleSidebar] = useState(true)

  const isMobile: boolean = useMediaQuery({
    query: '(max-width: 768px)'
  })

  const handleToggleSidebar = (): void => {
    setVisibleSidebar((visible) => !visible)
  }

  const handleCloseSidebar = (): void => {
    if (isMobile && visibleSidebar) {
      handleToggleSidebar()
    }
  }

  const swipeableHandlers = useSwipeable({
    trackMouse: false,
    trackTouch: true,
    preventDefaultTouchmoveEvent: true,
    onSwipedRight: () => setVisibleSidebar(true),
    onSwipedLeft: () => setVisibleSidebar(false)
  })

  useEffect(() => {
    setVisibleSidebar(!isMobile)
  }, [isMobile])

  return (
    <>
      <Head title='Thream | Application' />
      <header className='flex bg-gray-200 dark:bg-gray-800 h-16 px-2 py-3 justify-between items-center'>
        <button
          onClick={handleToggleSidebar}
          className='p-2 h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none hover:animate-pulse'
        >
          {!visibleSidebar ? <MenuIcon /> : <XIcon />}
        </button>
        <div className='text-md text-green-800 dark:text-green-400 font-semibold'>
          # Channel 4
        </div>
        <div className='flex space-x-2'>
          <SwitchTheme />
          <button className='p-2 h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none hover:animate-pulse'>
            <UsersIcon />
          </button>
        </div>
      </header>
      <main
        className='h-full-without-header overflow-hidden'
        {...swipeableHandlers}
        onClick={handleCloseSidebar}
      >
        <div className='relative md:flex'>
          <div
            className={classNames(
              'h-full-without-header flex bg-gray-200 dark:bg-gray-800 md:w-80 w-4/5 inset-y-0 left-0 transform transition duration-200 ease-in-out',
              {
                '-translate-x-full absolute': !visibleSidebar,
                relative: visibleSidebar
              }
            )}
          >
            <div className='min-w-[92px] overflow-y-scroll space-y-4 mt-2 border-r-2 border-white/20'>
              <div className='w-full flex justify-center group'>
                <button
                  className='h-12 w-12 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-pulse'
                  title='My profile'
                >
                  <Image
                    className='rounded-full'
                    src='/images/data/divlo.png'
                    alt='logo'
                    width={48}
                    height={48}
                  />
                </button>
                <div className='absolute flex items-center w-3 h-12 left-0'>
                  <span className='absolute w-4/12 bg-green-700 rounded-r-lg group-hover:h-5 h-full'></span>
                </div>
              </div>
              <div className='w-full flex justify-center group'>
                <button
                  className='h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-pulse'
                  title='Join a Guild'
                >
                  <PlusIcon />
                </button>
                <div className='absolute flex items-center w-3 h-12 left-0'>
                  <span className='absolute w-4/12 bg-green-700 rounded-r-lg group-hover:h-5'></span>
                </div>
              </div>
              <div className='relative flex justify-center h-[2px] w-full'>
                <div className='absolute h-[2px] w-12 bg-gray-600 dark:bg-white/20 rounded-full'></div>
              </div>
              {new Array(100).fill(null).map((_, index) => {
                const isSelectedGuild = index === 1
                return (
                  <a
                    key={index}
                    className='w-full flex justify-center cursor-pointer relative group'
                    title='Guild name'
                  >
                    <Image
                      src='/images/icons/Thream.png'
                      alt='logo'
                      width={48}
                      height={48}
                      className='w-12 h-12 rounded-full'
                    />
                    <div className='absolute flex items-center w-3 h-12 left-0'>
                      <span
                        className={classNames(
                          'absolute w-4/12 bg-green-700 rounded-r-lg group-hover:h-5',
                          {
                            'h-full': isSelectedGuild
                          }
                        )}
                      ></span>
                    </div>
                  </a>
                )
              })}
            </div>
            <div className='flex flex-col justify-between w-full mt-2'>
              <div className='text-center p-2 mt-2'>
                <h2 className='text-xl'>Guild Name</h2>
              </div>
              <div className='relative flex justify-center h-[2px] w-full mb-3'>
                <div className='absolute h-[2px] w-8/12 bg-gray-600 dark:bg-white/20 rounded-full'></div>
              </div>
              <nav className='w-full overflow-y-scroll'>
                {new Array(100).fill(null).map((_, index) => {
                  const isOwner = index !== 2
                  return (
                    <a
                      key={index}
                      className={classNames(
                        ' hover:bg-gray-100 group flex items-center justify-between text-sm py-2 my-3 mx-3 transition-colors dark:hover:bg-gray-600 duration-200 rounded-lg',
                        {
                          'text-green-800 dark:text-green-400 font-semibold':
                            index === 4,
                          'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-normal':
                            index !== 4
                        }
                      )}
                      href='#'
                    >
                      <span className='ml-2 mr-4'># Channel {index}</span>
                      {isOwner && (
                        <button className='h-6 w-6 mr-2 invisible group-hover:visible focus:outline-none focus:animate-spin hover:animate-pulse'>
                          <CogIcon />
                        </button>
                      )}
                    </a>
                  )
                })}
              </nav>
              <div className='relative flex justify-center h-[2px] w-full mt-2'>
                <div className='absolute h-[2px] w-8/12 bg-gray-600 dark:bg-white/20 rounded-full'></div>
              </div>
              <div className='flex justify-center items-center p-2 mb-1 space-x-6'>
                <button
                  className='h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-pulse hover:animate-pulse'
                  title='Add a Channel'
                >
                  <PlusIcon />
                </button>
                <button
                  className='h-7 w-7 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-spin hover:animate-pulse'
                  title='Settings'
                >
                  <CogIcon />
                </button>
              </div>
            </div>
          </div>

          <div className='h-full-without-header flex flex-col justify-between flex-1 p-2'>
            <div className='w-full overflow-y-scroll'>
              {new Array(20).fill(null).map((_, index) => {
                return (
                  <div
                    key={index}
                    className='relative flex-1 mt-4 min-w-0 md:p-3 md:mx-3 flex hover:bg-gray-200 dark:hover:bg-gray-800'
                  >
                    <div className='w-12 h-12 mx-3 flex-shrink-0 flex items-center justify-center select-none'>
                      <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <Image
                          className='rounded-full'
                          src='/images/data/divlo.png'
                          alt='logo'
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className='w-full h-auto min-w-0 inline-block flex-shrink'>
                      <div className='w-full h-8 space-x-2'>
                        <span>Divlo</span>
                        <span className='text-gray-800 dark:text-gray-400 text-xs'>
                          06/04/2021 - 22:28:40
                        </span>
                      </div>
                      <div className='break-all md:break-words outline-none text-base font-paragraph'>
                        <p>Message {index}</p>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Eum debitis voluptatum itaque quaerat. Nemo
                          optio voluptas quas mollitia rerum commodi laboriosam
                          voluptates et sit quo. Repudiandae eius at inventore
                          magnam. Voluptas nisi maxime laborum architecto fuga a
                          consequuntur reiciendis rerum beatae hic possimus,
                          omnis dolorum libero, illo dolorem assumenda.
                          Repellat, ad!
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='flex h-auto px-8 pt-4'>
              <div className='flex items-start w-full h-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800'>
                <form className='w-full h-auto rounded-lg px30 overflow-hidden'>
                  <div className='relative flex items-center w-full h-auto rounded-lg'>
                    <div className='w-full relative flex items-center my-1'>
                      <div className='w-full flex items-center p-3'>
                        <textarea
                          className='py-2 flex-grow break-all sm:break-words w-12/12 overflow-y-auto overflow-x-hidden rounded-lg bg-transparent outline-none font-paragraph'
                          placeholder='Write a message'
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
                <div className='w-30 h-12 flex items-center justify-around'>
                  <div className='w-8 h-8 flex items-center justify-center'>
                    <button className='flex items-center justify-center focus:outline-none'>
                      <div>
                        <div className='transform scale-125 hover:scale-150'>
                          🙂
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className='w-8 h-8 flex items-center justify-center'>
                    <button className='relative w-14 h-12 flex items-center overflow-hidden justify-center text-green-800 dark:text-green-400 transform scale-125 hover:scale-150'>
                      <input
                        type='file'
                        className='absolute w-22 h-20 -top-8 -left-8 opacity-0 cursor-pointer'
                      />
                      <svg width='24' height='24'>
                        <path
                          fill='currentColor'
                          d='M12 2a10.01 10.01 0 000 20 10.01 10.01 0 000-20zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default ApplicationPage
