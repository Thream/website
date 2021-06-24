import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'
import { CogIcon, PlusIcon } from '@heroicons/react/solid'
import { useMediaQuery } from 'react-responsive'
import { useSwipeable } from 'react-swipeable'

import { HeaderApplication } from './HeaderApplication'
import { MainApplication } from './MainApplication/MainApplication'

export interface ApplicationProps {
  path:
    | '/application'
    | '/application/settings'
    | {
        guildId: number
        channelId: number
      }
}

export const Application: React.FC<ApplicationProps> = (props) => {
  const { path, children } = props

  const [visibleSidebar, setVisibleSidebar] = useState(false)

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
      <HeaderApplication
        visibleLeftSidebar={visibleSidebar}
        toggleLeftSidebar={handleToggleSidebar}
        title={`# Channel ${typeof path !== 'string' ? path.channelId : ''}`}
      />
      <MainApplication
        onClick={handleCloseSidebar}
        swipeableHandlers={swipeableHandlers}
      >
        <div
          className={classNames(
            'h-full-without-header flex bg-gray-200 dark:bg-gray-800 inset-y-0 left-0 transform transition duration-200 ease-in-out',
            {
              '-translate-x-full absolute': !visibleSidebar,
              relative: visibleSidebar,
              'md:w-80 w-4/5': typeof path !== 'string'
            }
          )}
        >
          <div className='min-w-[92px] overflow-y-scroll space-y-4 mt-2 border-r-2 border-white/20'>
            <div className='w-full flex justify-center group'>
              <Link href='/application/settings'>
                <a
                  className='h-12 w-12 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-pulse'
                  title='Settings'
                >
                  <Image
                    className='rounded-full'
                    src='/images/data/divlo.png'
                    alt='logo'
                    width={48}
                    height={48}
                  />
                </a>
              </Link>
              <div className='absolute flex items-center w-3 h-12 left-0'>
                <span
                  className={classNames(
                    'absolute w-4/12 bg-green-700 rounded-r-lg group-hover:h-5',
                    {
                      'h-full': path === '/application/settings'
                    }
                  )}
                ></span>
              </div>
            </div>
            <div className='w-full flex justify-center group'>
              <Link href='/application'>
                <a
                  className='h-12 w-12 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-pulse'
                  title='Join a Guild'
                >
                  <PlusIcon />
                </a>
              </Link>

              <div className='absolute flex items-center w-3 h-12 left-0'>
                <span
                  className={classNames(
                    'absolute w-4/12 bg-green-700 rounded-r-lg group-hover:h-5',
                    {
                      'h-full': path === '/application'
                    }
                  )}
                ></span>
              </div>
            </div>
            <div className='relative flex justify-center h-[2px] w-full'>
              <div className='absolute h-[2px] w-12 bg-gray-600 dark:bg-white/20 rounded-full'></div>
            </div>
            {new Array(100).fill(null).map((_, index) => {
              return (
                <Link key={index} href={`/application/${index}/0`}>
                  <a
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
                            'h-full':
                              typeof path !== 'string' && path.guildId === index
                          }
                        )}
                      ></span>
                    </div>
                  </a>
                </Link>
              )
            })}
          </div>

          {typeof path !== 'string' && (
            <div className='flex flex-col justify-between w-full mt-2'>
              <div className='text-center p-2 mt-2'>
                <h2 className='text-xl'>Guild Name</h2>
              </div>
              <div className='relative flex justify-center h-[2px] w-full mb-3'>
                <div className='absolute h-[2px] w-8/12 bg-gray-600 dark:bg-white/20 rounded-full'></div>
              </div>
              <nav className='w-full overflow-y-scroll'>
                {new Array(100).fill(null).map((_, index) => {
                  return (
                    <Link
                      key={index}
                      href={`/application/${path.guildId}/${index}`}
                    >
                      <a
                        className={classNames(
                          ' hover:bg-gray-100 group flex items-center justify-between text-sm py-2 my-3 mx-3 transition-colors dark:hover:bg-gray-600 duration-200 rounded-lg',
                          {
                            'text-green-800 dark:text-green-400 font-semibold':
                              typeof path !== 'string' &&
                              path.channelId === index,
                            'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-normal':
                              typeof path === 'string'
                          }
                        )}
                        href='#'
                      >
                        <span className='ml-2 mr-4'># Channel {index}</span>
                      </a>
                    </Link>
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
          )}
        </div>
        {children}
      </MainApplication>
    </>
  )
}
