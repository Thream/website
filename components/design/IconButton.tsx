import { forwardRef } from 'react'

type IconSVG = 'add' | 'delete' | 'edit' | 'emoji' | 'send' | 'settings' | 'more'

interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {
  icon: IconSVG
  hasBackground?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { icon, hasBackground = false, ...rest } = props

    return (
      <>
        <button ref={ref} className='button' {...rest}>
          <img src={`/images/svg/icons/${icon}.svg`} alt={icon} />
        </button>

        <style jsx>
          {`
            .button {
              background: ${hasBackground ? 'var(--color-primary)' : 'none'};
              border-radius: ${hasBackground ? '50%' : '0'};
              width: ${hasBackground ? '50px' : '100%'};
              height: ${hasBackground ? '50px' : '100%'};
              border: none;
              outline: none;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }
            .button:hover {
              opacity: 0.9;
            }
            .button > img {
              width: 20px;
              height: 20px;
              display: block;
            }
          `}
        </style>
      </>
    )
  }
)
