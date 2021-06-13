import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'
import { MenuIcon, UsersIcon } from '@heroicons/react/solid'

import { Head } from 'components/Head'

const ApplicationPage: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Head title='Thream | Application' />

      <header className='flex bg-gray-800 h-16 px-2 justify-between items-center'>
        <button className='p-2 h-10 w-10 text-center flex items-center justify-center'>
          <MenuIcon className='text-green-800 dark:text-green-400' />
        </button>
        <div className='font-paragraph text-md'>#general</div>
        <div className='flex'>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='p-2 h-10 w-10 text-center flex items-center justify-center'
          >
            <UsersIcon className='text-green-800 dark:text-green-400' />
          </button>
        </div>
      </header>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default ApplicationPage
