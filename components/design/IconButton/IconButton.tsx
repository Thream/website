import classNames from 'classnames'

export interface IconButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, className, ...rest } = props

  return (
    <button
      className={classNames(
        'text-center flex items-center justify-center text-green-800 dark:text-green-400 focus:outline-none focus:animate-pulse hover:animate-pulse',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
