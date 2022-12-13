import Link from 'next/link'
import Image from 'next/image'

import { Language } from './Language'
import { SwitchTheme } from './SwitchTheme'

export const Header: React.FC = () => {
  return (
    <header className='sticky top-0 z-50 flex w-full justify-center border-b-2 border-gray-600 bg-white px-6 py-2 dark:border-gray-400 dark:bg-black'>
      <div className='container flex justify-between'>
        <Link href='/'>
          <div className='flex items-center justify-center'>
            <Image
              quality={100}
              width={60}
              height={60}
              src='/images/icons/Thream.png'
              alt='Thream'
            />
            <span className='ml-1 hidden font-headline font-medium text-green-800 dark:text-green-400 xs:block'>
              Thream
            </span>
          </div>
        </Link>
        <div className='flex justify-between'>
          <Language />
          <SwitchTheme />
        </div>
      </div>
    </header>
  )
}
