import Link from 'next/link'
import classNames from 'clsx'

export interface IconLinkProps {
  selected?: boolean
  href: string
  title?: string
  className?: string
}

export const IconLink: React.FC<React.PropsWithChildren<IconLinkProps>> = (
  props
) => {
  const { children, selected, href, title, className } = props

  return (
    <Link href={href}>
      <a className='group relative flex w-full justify-center' title={title}>
        <div
          className={classNames('group flex w-full justify-center', className)}
        >
          {children}
          <div className='absolute left-0 flex h-12 w-3 items-center'>
            <span
              className={classNames(
                'absolute w-4/12 rounded-r-lg bg-green-700 group-hover:h-5',
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
