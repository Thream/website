import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PlusIcon, MenuIcon, UsersIcon, XIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'
import { useSwipeable } from 'react-swipeable'

import { Sidebar, DirectionSidebar } from './Sidebar'
import { IconButton } from '../design/IconButton'
import { IconLink } from '../design/IconLink'
import { Guilds } from './Guilds/Guilds'
import { Divider } from '../design/Divider'
import { Members } from './Members'
import { useAuthentication } from '../../tools/authentication'

export interface ChannelsPath {
  channelId: number
}
export interface GuildsPath {
  guildId: number
}
export interface GuildsChannelsPath extends GuildsPath, ChannelsPath {}

const isGuildsChannelsPath = (path: any): path is GuildsChannelsPath => {
  return path.guildId !== undefined && path.channelId !== undefined
}

export type ApplicationPath =
  | '/application'
  | '/application/guilds/join'
  | '/application/guilds/create'
  | `/application/users/${number}`
  | `/application/users/settings`
  | GuildsChannelsPath
  | GuildsPath

export interface ApplicationProps {
  path: ApplicationPath
  guildLeftSidebar?: React.ReactNode
  title: string
}

export const Application: React.FC<ApplicationProps> = (props) => {
  const { children, path, guildLeftSidebar, title } = props

  const { user } = useAuthentication()

  const [mounted, setMounted] = useState(false)

  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })

  const [visibleSidebars, setVisibleSidebars] = useState({
    left: !isMobile,
    right: false
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
  }

  const handleCloseSidebars = (): void => {
    if (isMobile && (visibleSidebars.left || visibleSidebars.right)) {
      return setVisibleSidebars({
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
      <header className='z-50 flex h-16 items-center justify-between bg-gray-200 px-2 py-3 shadow-lg dark:bg-gray-800'>
        <IconButton
          className='h-10 w-10 p-2'
          onClick={() => handleToggleSidebars('left')}
        >
          {!visibleSidebars.left ? <MenuIcon /> : <XIcon />}
        </IconButton>
        <div
          data-cy='application-title'
          className='text-md font-semibold text-green-800 dark:text-green-400'
        >
          {title}
        </div>
        <div className='flex space-x-2'>
          {title.startsWith('#') && (
            <IconButton
              data-cy='icon-button-right-sidebar-members'
              className='h-10 w-10 p-2'
              onClick={() => handleToggleSidebars('right')}
            >
              {!visibleSidebars.right ? <UsersIcon /> : <XIcon />}
            </IconButton>
          )}
        </div>
      </header>

      <main
        className='h-full-without-header relative flex overflow-hidden'
        {...swipeableHandlers}
      >
        <Sidebar
          direction='left'
          visible={visibleSidebars.left}
          isMobile={isMobile}
        >
          <div className='top-0 left-0 z-50 flex min-w-[92px] flex-col space-y-4 border-r-2 border-gray-500 bg-gray-200 py-2 dark:border-white/20 dark:bg-gray-800'>
            <IconLink
              href={`/application/users/settings`}
              selected={path === `/application/users/settings`}
              title='Settings'
            >
              <Image
                quality={100}
                className='rounded-full'
                src={
                  user.logo == null
                    ? '/images/data/user-default.png'
                    : user.logo
                }
                alt={"Users's profil picture"}
                draggable={false}
                width={48}
                height={48}
              />
            </IconLink>
            <IconLink
              href='/application'
              selected={path === '/application'}
              title='Join or create a Guild'
            >
              <PlusIcon className='h-12 w-12 text-green-800 dark:text-green-400' />
            </IconLink>
            <Divider />
            <Guilds path={path} />
          </div>
          {guildLeftSidebar}
        </Sidebar>

        <div
          id='application-page-content'
          onClick={handleCloseSidebars}
          className={classNames(
            'h-full-without-header relative top-0 z-0 flex w-full flex-1 flex-col overflow-y-auto transition',
            {
              'absolute opacity-20':
                isMobile && (visibleSidebars.left || visibleSidebars.right)
            }
          )}
        >
          {children}
        </div>

        {isGuildsChannelsPath(path) && (
          <Sidebar
            direction='right'
            visible={visibleSidebars.right}
            isMobile={isMobile}
          >
            <Members />
          </Sidebar>
        )}
      </main>
    </>
  )
}
