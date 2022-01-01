import Link from 'next/link'
import classNames from 'classnames'

export interface IconLinkProps {
  selected?: boolean
  href: string
  title?: string
  className?: string
}

export const IconLink: React.FC<IconLinkProps> = (props) => {
  const { children, selected, href, title, className } = props

  return (
    <Link href={href}>
      <a className='w-full flex justify-center relative group' title={title}>
        <div
          className={classNames('w-full flex justify-center group', className)}
        >
          {children}
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
      </a>
    </Link>
  )
}
