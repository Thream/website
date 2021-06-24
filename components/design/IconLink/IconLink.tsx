import Link from 'next/link'
import classNames from 'classnames'

export interface IconLinkProps {
  selected?: boolean
  href: string
}

export const IconLink: React.FC<IconLinkProps> = (props) => {
  const { children, selected, href } = props

  return (
    <div className='w-full flex justify-center group'>
      <Link href={href}>
        <a
          className='h-12 w-12 text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-pulse'
          title='Settings'
        >
          {children}
        </a>
      </Link>
      <div className='absolute flex items-center w-3 h-12 left-0'>
        <span
          className={classNames(
            'absolute w-4/12 bg-green-700 rounded-r-lg group-hover:h-5',
            {
              'h-full': selected
            }
          )}
        ></span>
      </div>
    </div>
  )
}
