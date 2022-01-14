import { forwardRef } from 'react'
import classNames from 'classnames'

const className =
  'py-2 px-6 font-paragraph rounded-lg bg-transparent border border-green-800 dark:border-green-400 text-green-800 dark:text-green-400 hover:bg-green-800 hover:text-white dark:hover:bg-green-400 dark:hover:text-black fill-current stroke-current transform transition-colors duration-300 ease-in-out focus:outline-none focus:bg-green-800 focus:text-white dark:focus:bg-green-400 dark:focus:text-black'

export interface ButtonLinkProps extends React.ComponentPropsWithRef<'a'> {}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, reference) => {
    const { children, className: givenClassName, ...rest } = props

    return (
      <a
        ref={reference}
        className={classNames(className, givenClassName)}
        {...rest}
      >
        {children}
      </a>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, className: givenClassName, ...rest } = props

  return (
    <button className={classNames(className, givenClassName)} {...rest}>
      {children}
    </button>
  )
}
