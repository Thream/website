import { MenuIcon, UsersIcon, XIcon } from '@heroicons/react/solid'

export interface HeaderApplicationProps {
  visibleLeftSidebar?: boolean
  toggleLeftSidebar?: React.MouseEventHandler<HTMLButtonElement>
  title: string
}

export const HeaderApplication: React.FC<HeaderApplicationProps> = (props) => {
  const { visibleLeftSidebar = false, title, toggleLeftSidebar } = props

  return (
    <header className='flex bg-gray-200 dark:bg-gray-800 h-16 px-2 py-3 justify-between items-center'>
      <button
        onClick={toggleLeftSidebar}
        className='p-2 h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none hover:animate-pulse'
      >
        {!visibleLeftSidebar ? <MenuIcon /> : <XIcon />}
      </button>
      <div className='text-md text-green-800 dark:text-green-400 font-semibold'>
        {title}
      </div>
      <div className='flex space-x-2'>
        <button className='p-2 h-10 w-10 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none hover:animate-pulse'>
          <UsersIcon />
        </button>
      </div>
    </header>
  )
}
