import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSwipeable } from 'react-swipeable'
import classNames from 'classnames'
import { useTheme } from 'next-themes'
import {
  MenuIcon,
  UsersIcon,
  XIcon,
  CogIcon,
  PlusIcon
} from '@heroicons/react/solid'

import { Head } from 'components/Head'

const ApplicationPage: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [visibleSidebar, setVisibleSidebar] = useState(true)
  const { theme, setTheme } = useTheme()

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
    onSwipedRight: handleToggleSidebar
  })

  useEffect(() => {
    setMounted(true)
    setVisibleSidebar(!isMobile)
  }, [isMobile])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Head title='Thream | Application' />
      <header className='flex bg-gray-800 h-16 px-2 py-3 justify-between items-center'>
        <button
          onClick={handleToggleSidebar}
          className='p-2 h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none'
        >
          {!visibleSidebar ? <MenuIcon /> : <XIcon />}
        </button>
        <div className='text-md text-green-400 dark:text-green-400 font-semibold'>
          #general
        </div>
        <div className='flex'>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='p-2 h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none'
          >
            <UsersIcon />
          </button>
        </div>
      </header>
      <main {...swipeableHandlers} onClick={handleCloseSidebar}>
        <div className='relative md:flex'>
          <div
            className={classNames(
              'sidebar flex bg-gray-800 md:w-80 w-4/5 inset-y-0 left-0 transform transition duration-200 ease-in-out',
              {
                '-translate-x-full absolute': !visibleSidebar,
                relative: visibleSidebar
              }
            )}
          >
            <div className='min-w-[92px] overflow-y-scroll space-y-4 mt-2 border-r-2 border-white/20'>
              <div className='w-full flex justify-center'>
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
              </div>
              <div className='w-full flex justify-center'>
                <button
                  className='h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-pulse'
                  title='Add a Guild'
                >
                  <PlusIcon />
                </button>
              </div>
              <div className='relative flex justify-center h-[2px] w-full'>
                <div className='absolute h-[2px] w-10 bg-white/20 rounded-full'></div>
              </div>
              {new Array(100).fill(null).map((_, index) => {
                return (
                  <a
                    key={index}
                    className='w-full flex justify-center cursor-pointer'
                    title='Guild name'
                  >
                    <Image
                      src='/images/icons/Thream.png'
                      alt='logo'
                      width={48}
                      height={48}
                      className='w-12 h-12'
                    />
                  </a>
                )
              })}
            </div>
            <div className='flex flex-col justify-between w-full mt-2'>
              <div className='text-center p-2 mt-2'>
                <h2 className='text-xl'>Guild Name</h2>
              </div>
              <nav className='w-full overflow-y-scroll'>
                {new Array(100).fill(null).map((_, index) => {
                  return (
                    <a
                      key={index}
                      className={classNames(
                        ' hover:bg-gray-100 group flex items-center justify-between text-sm py-2 my-3 mx-3 transition-colors dark:hover:bg-gray-600 duration-200 rounded-lg',
                        {
                          'text-green-400 dark:text-green-400 font-semibold':
                            index === 4,
                          'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-normal':
                            index !== 4
                        }
                      )}
                      href='#'
                    >
                      <span className='ml-2 mr-4'># Channel {index}</span>
                      <button className='h-6 w-6 mr-2 hidden group-hover:block focus:outline-none focus:animate-spin'>
                        <CogIcon />
                      </button>
                    </a>
                  )
                })}
              </nav>
              <div className='flex justify-center items-center p-2 mb-1 space-x-6'>
                <button
                  className='h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-pulse'
                  title='Add a Channel'
                >
                  <PlusIcon />
                </button>
                <button
                  className='h-7 w-7 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-spin'
                  title='Settings'
                >
                  <CogIcon />
                </button>
              </div>
            </div>
          </div>

          <div className='flex-1 p-10 text-2xl font-bold'>
            content goes here
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          overflow: hidden;
          height: calc(100vh - 64px);
        }
        .sidebar {
          height: calc(100vh - 64px);
        }
      `}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default ApplicationPage
