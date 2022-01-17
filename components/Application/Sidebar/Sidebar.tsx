import classNames from 'classnames'

import { ApplicationProps } from '..'

export type DirectionSidebar = 'left' | 'right'

export interface SidebarProps {
  direction: DirectionSidebar
  visible: boolean
  path?: ApplicationProps
  isMobile: boolean
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { direction, visible, children, path, isMobile } = props

  return (
    <nav
      className={classNames(
        'h-full-without-header flex z-50 drop-shadow-2xl bg-gray-200 dark:bg-gray-800 transition-all',
        {
          'top-0 right-0 scrollbar-firefox-support overflow-y-auto flex-col space-y-1':
            direction === 'right',
          'w-72': direction === 'right' && visible,
          'w-0 opacity-0': !visible,
          'w-80': direction === 'left' && visible,
          'max-w-max': typeof path !== 'string' && direction === 'left',
          'top-0 right-0': direction === 'right' && isMobile,
          absolute: isMobile
        }
      )}
    >
      {children}
    </nav>
  )
}
