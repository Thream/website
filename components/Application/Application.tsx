import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PlusIcon, MenuIcon, UsersIcon, XIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'
import { useSwipeable } from 'react-swipeable'

import { Sidebar, DirectionSidebar } from './Sidebar'
import { IconButton } from 'components/design/IconButton'
import { IconLink } from 'components/design/IconLink'
import { Guilds } from './Guilds/Guilds'
import { Divider } from '../design/Divider'
import { Members } from './Members'
import { useAuthentication } from 'utils/authentication'
import { API_URL } from 'utils/api'

export interface GuildsChannelsPath {
  guildId: number
  channelId: number
}

export type ApplicationPath =
  | '/application'
  | '/application/guilds/join'
  | '/application/guilds/create'
  | '/application/users/[userId]'
  | GuildsChannelsPath

export interface ApplicationProps {
  path: ApplicationPath
  guildLeftSidebar?: React.ReactNode
  title: string
}

export const Application: React.FC<ApplicationProps> = (props) => {
  const { children, path, guildLeftSidebar, title } = props

  const { user } = useAuthentication()

  const [visibleSidebars, setVisibleSidebars] = useState({
    left: true,
    right: false
  })

  const [mounted, setMounted] = useState(false)

  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })

  const handleToggleSidebars = (direction: DirectionSidebar): void => {
    if (!isMobile) {
      if (direction === 'left') {
        return setVisibleSidebars({
          ...visibleSidebars,
          left: !visibleSidebars.left
        })
      }
      if (direction === 'right') {
        return setVisibleSidebars({
          ...visibleSidebars,
          right: !visibleSidebars.right
        })
      }
    } else {
      if (direction === 'right' && visibleSidebars.left) {
        return setVisibleSidebars({
          left: false,
          right: true
        })
      }
      if (direction === 'left' && visibleSidebars.right) {
        return setVisibleSidebars({
          left: true,
          right: false
        })
      }
      if (direction === 'left' && !visibleSidebars.right) {
        return setVisibleSidebars({
          ...visibleSidebars,
          left: !visibleSidebars.left
        })
      }
      if (direction === 'right' && !visibleSidebars.left) {
        return setVisibleSidebars({
          ...visibleSidebars,
          right: !visibleSidebars.right
        })
      }
    }
    handleCloseSidebars()
  }

  const handleCloseSidebars = (): void => {
    if (isMobile && (visibleSidebars.left || visibleSidebars.right)) {
      setVisibleSidebars({
        left: false,
        right: false
      })
    }
  }

  const swipeableHandlers = useSwipeable({
    trackMouse: false,
    trackTouch: true,
    preventDefaultTouchmoveEvent: true,
    onSwipedRight: () => {
      if (visibleSidebars.right) {
        return setVisibleSidebars({ ...visibleSidebars, right: false })
      }
      setVisibleSidebars({
        ...visibleSidebars,
        left: true
      })
    },
    onSwipedLeft: () => {
      if (visibleSidebars.left) {
        return setVisibleSidebars({ ...visibleSidebars, left: false })
      }
      setVisibleSidebars({
        ...visibleSidebars,
        right: true
      })
    }
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <header className='flex bg-gray-200 dark:bg-gray-800 h-16 px-2 py-3 justify-between items-center shadow-lg z-50'>
        <IconButton
          className='p-2 h-10 w-10'
          onClick={() => handleToggleSidebars('left')}
        >
          {!visibleSidebars.left ? <MenuIcon /> : <XIcon />}
        </IconButton>
        <div className='text-md text-green-800 dark:text-green-400 font-semibold'>
          {title}
        </div>
        <div className='flex space-x-2'>
          {title.startsWith('#') && (
            <IconButton
              className='p-2 h-10 w-10'
              onClick={() => handleToggleSidebars('right')}
            >
              {!visibleSidebars.right ? <UsersIcon /> : <XIcon />}
            </IconButton>
          )}
        </div>
      </header>

      <main
        className='relative flex h-full-without-header overflow-hidden'
        onClick={handleCloseSidebars}
        {...swipeableHandlers}
      >
        <Sidebar
          direction='left'
          visible={visibleSidebars.left}
          isMobile={isMobile}
        >
          <div className='flex flex-col min-w-[92px] top-0 left-0 z-50 bg-gray-200 dark:bg-gray-800 border-r-2 border-gray-500 dark:border-white/20 py-2 space-y-2'>
            <IconLink
              href={`/application/users/${user.id}`}
              selected={path === `/application/users/${user.id}`}
              title='Settings'
            >
              <Image
                className='rounded-full'
                src={
                  user.logo == null
                    ? '/images/data/user-default.png'
                    : API_URL + user.logo
                }
                alt='logo'
                width={48}
                height={48}
              />
            </IconLink>
            <IconLink
              href='/application'
              selected={path === '/application'}
              title='Join or create a Guild'
            >
              <PlusIcon className='w-12 h-12 text-green-800 dark:text-green-400' />
            </IconLink>
            <Divider />
            <Guilds path={path} />
          </div>

          {guildLeftSidebar}
        </Sidebar>

        <div
          id='application-page-content'
          className={classNames(
            'top-0 h-full-without-header flex flex-col flex-1 z-0 overflow-y-auto transition',
            {
              'absolute opacity-20':
                isMobile && (visibleSidebars.left || visibleSidebars.right)
            }
          )}
        >
          {children}
        </div>

        <Sidebar
          direction='right'
          visible={visibleSidebars.right}
          isMobile={isMobile}
        >
          <Members />
        </Sidebar>
      </main>
    </>
  )
}
