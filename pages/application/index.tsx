import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import classNames from 'classnames'
import { useTheme } from 'next-themes'
import { MenuIcon, UsersIcon, XIcon, PlusIcon } from '@heroicons/react/solid'

import { Head } from 'components/Head'

const ApplicationPage: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [visibleSidebar, setVisibleSidebar] = useState(true)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    // setVisibleSidebar(window.innerWidth > 768)
  }, [])

  if (!mounted) {
    return null
  }

  const handleSidebarToggle = (): void => {
    setVisibleSidebar((visible) => !visible)
  }

  return (
    <>
      <Head title='Thream | Application' />
      <header className='flex bg-gray-800 h-16 px-2 py-3 justify-between items-center'>
        <button
          onClick={handleSidebarToggle}
          className='p-2 h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none'
        >
          {!visibleSidebar ? <MenuIcon /> : <XIcon />}
        </button>
        <div className='font-paragraph text-md'>#general</div>
        <div className='flex'>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='p-2 h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none'
          >
            <UsersIcon />
          </button>
        </div>
      </header>
      <main>
        <div className='relative md:flex'>
          <div
            className={classNames(
              'sidebar flex bg-gray-800 md:w-80 w-4/5 inset-y-0 left-0 transform transition duration-200 ease-in-out',
              {
                '-translate-x-full': !visibleSidebar,
                relative: visibleSidebar,
                absolute: !visibleSidebar
              }
            )}
          >
            <div className='min-w-[92px] overflow-y-scroll space-y-2 mt-2'>
              <div className='w-full flex justify-center'>
                <button className='h-12 w-12 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none'>
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
                <button className='h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none'>
                  <PlusIcon />
                </button>
              </div>
              <div className='relative flex justify-center h-[2px] w-full'>
                <div className='absolute h-[2px] w-10 bg-white/20 rounded-full'></div>
              </div>
              {new Array(100).fill(null).map((_, index) => {
                return (
                  <div key={index} className='w-full flex justify-center'>
                    <Image
                      src='/images/icons/Thream.png'
                      alt='logo'
                      width={48}
                      height={48}
                      className='w-12 h-12'
                    />
                  </div>
                )
              })}
            </div>
            <nav className='w-full overflow-y-scroll'>
              {new Array(100).fill(null).map((_, index) => {
                return (
                  <a
                    key={index}
                    className='hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-3 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg '
                    href='#'
                  >
                    <span className='mx-4 text-lg font-normal'>Element</span>
                  </a>
                )
              })}
            </nav>
          </div>

          <div className='flex-1 p-10 text-2xl font-bold'>
            content goes here
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          overflow: hidden;
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
