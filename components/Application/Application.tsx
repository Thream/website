import { useEffect, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { CogIcon, PlusIcon } from '@heroicons/react/solid'
import { useMediaQuery } from 'react-responsive'
import { useSwipeable } from 'react-swipeable'

import { HeaderApplication } from './HeaderApplication'
import { IconButton } from 'components/design/IconButton'
import { IconLink } from 'components/design/IconLink'
import { Channels } from './Channels'
import { Guilds } from './Guilds/Guilds'
import { Divider } from 'components/design/Divider/Divider'

export interface GuildsChannelsPath {
  guildId: number
  channelId: number
}

export interface ApplicationProps {
  path: '/application' | '/application/settings' | GuildsChannelsPath
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
      <main
        className='h-full-without-header overflow-hidden'
        onClick={handleCloseSidebar}
        {...swipeableHandlers}
      >
        <div className='relative md:flex'>
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
              <IconLink
                href='/application/settings'
                selected={path === '/application/settings'}
                title='Settings'
              >
                <Image
                  className='rounded-full'
                  src='/images/data/divlo.png'
                  alt='logo'
                  width={48}
                  height={48}
                />
              </IconLink>
              <IconLink
                href='/application'
                selected={path === '/application'}
                title='Join a Guild'
              >
                <PlusIcon />
              </IconLink>
              <Divider />
              <Guilds path={path} />
            </div>

            {typeof path !== 'string' && (
              <div className='flex flex-col justify-between w-full mt-2'>
                <div className='text-center p-2 mt-2'>
                  <h2 className='text-xl'>Guild Name</h2>
                </div>
                <Divider />
                <Channels path={path} />
                <Divider />
                <div className='flex justify-center items-center p-2 mb-1 space-x-6'>
                  <IconButton className='h-10 w-10' title='Add a Channel'>
                    <PlusIcon />
                  </IconButton>
                  <IconButton className='h-7 w-7' title='Settings'>
                    <CogIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
          {children}
        </div>
      </main>
    </>
  )
}
