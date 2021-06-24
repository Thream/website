import { MenuIcon, UsersIcon, XIcon } from '@heroicons/react/solid'
import { IconButton } from 'components/design/IconButton'

export interface HeaderApplicationProps {
  visibleLeftSidebar?: boolean
  toggleLeftSidebar?: React.MouseEventHandler<HTMLButtonElement>
  title: string
}

export const HeaderApplication: React.FC<HeaderApplicationProps> = (props) => {
  const { visibleLeftSidebar = false, title, toggleLeftSidebar } = props

  return (
    <header className='flex bg-gray-200 dark:bg-gray-800 h-16 px-2 py-3 justify-between items-center'>
      <IconButton className='p-2 h-10 w-10' onClick={toggleLeftSidebar}>
        {!visibleLeftSidebar ? <MenuIcon /> : <XIcon />}
      </IconButton>
      <div className='text-md text-green-800 dark:text-green-400 font-semibold'>
        {title}
      </div>
      <div className='flex space-x-2'>
        <IconButton className='p-2 h-10 w-10'>
          <UsersIcon />
        </IconButton>
      </div>
    </header>
  )
}
