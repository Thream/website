import { forwardRef } from 'react'

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <>
        <button ref={ref} {...rest} className='button'>
          {children}
        </button>

        <style jsx>{`
          .button {
            cursor: pointer;
            font-size: var(--default-font-size);
            font-weight: 400;
            letter-spacing: 0.8px;
            padding: 1rem 2rem;
            transform: translateY(-3px);
            background-color: transparent;
            border: 1px solid var(--color-primary);
            border-radius: 10px;
            transition: all 0.3s ease-in;
            color: var(--color-primary);
            outline: 0;
            margin: 0;
          }
          .button:hover {
            background-color: var(--color-primary);
            color: #fff;
          }
        `}
        </style>
      </>
    )
  }
)
