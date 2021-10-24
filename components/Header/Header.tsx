import Link from 'next/link'
import Image from 'next/image'

import { Language } from './Language'
import { SwitchTheme } from './SwitchTheme'

export const Header: React.FC = () => {
  return (
    <header className='bg-white flex justify-center sticky top-0 z-50 w-full px-6 py-2 border-b-2 border-gray-600 dark:border-gray-400 dark:bg-black'>
      <div className='container flex justify-between'>
        <Link href='/'>
          <a>
            <div className='flex items-center justify-center'>
              <Image
                width={60}
                height={60}
                src='/images/icons/Thream.png'
                alt='Thream'
              />
              <span className='ml-1 font-medium font-headline hidden xs:block text-green-800 dark:text-green-400'>
                Thream
              </span>
            </div>
          </a>
        </Link>
        <div className='flex justify-between'>
          <Language />
          <SwitchTheme />
        </div>
      </div>
    </header>
  )
}
