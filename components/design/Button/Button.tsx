import { forwardRef } from 'react'
import classNames from 'clsx'

const className =
  'py-2 px-6 font-paragraph rounded-lg bg-transparent border  hover:text-white dark:hover:text-black fill-current stroke-current transform transition-colors duration-300 ease-in-out focus:outline-none focus:text-white dark:focus:text-black'

const classNameGreen =
  'border-green-800 dark:border-green-400 text-green-800 dark:text-green-400 hover:bg-green-800 focus:bg-green-800 dark:focus:bg-green-400 dark:hover:bg-green-400'

const classNameRed =
  'border-red-800 dark:border-red-400 text-red-800 dark:text-red-400 hover:bg-red-800 focus:bg-red-800 dark:focus:bg-red-400 dark:hover:bg-red-400'

export type ButtonColor = 'green' | 'red'

export interface ButtonLinkProps extends React.ComponentPropsWithRef<'a'> {
  color?: ButtonColor
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, reference) => {
    const {
      children,
      className: givenClassName,
      color = 'green',
      ...rest
    } = props

    return (
      <a
        ref={reference}
        className={classNames(
          className,
          {
            [classNameGreen]: color === 'green',
            [classNameRed]: color === 'red'
          },
          givenClassName
        )}
        {...rest}
      >
        {children}
      </a>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  color?: ButtonColor
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className: givenClassName,
    color = 'green',
    ...rest
  } = props

  return (
    <button
      className={classNames(
        className,
        {
          [classNameGreen]: color === 'green',
          [classNameRed]: color === 'red'
        },
        givenClassName
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
