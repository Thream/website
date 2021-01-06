import { forwardRef } from 'react'

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <>
        <button ref={ref} {...rest} className='btn'>
          {children}
        </button>

        <style jsx>{`
          .btn {
            position: relative;
            cursor: pointer;
            font-size: var(--default-font-size);
            letter-spacing: 0.8px;
            padding: 1rem 3rem;
            font-weight: 400;
            transform: translateY(-3px);
            background-color: var(--color-background-primary);
            border: 1px solid var(--color-primary);
            border-radius: 10px;
            transition: all 0.3s ease-in;
            color: var(--color-primary);
            outline: 0;
            font-weight: 700;
          }
          .btn:hover {
            background-color: var(--color-primary);
            color: var(--color-secondary);
          }
        `}
        </style>
      </>
    )
  }
)
