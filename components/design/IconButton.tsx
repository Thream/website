import { forwardRef } from 'react'
import { ReactHTMLProps } from 'typings/utils'

type IconButtonProps = ReactHTMLProps<HTMLButtonElement> & {
  name: string
  hasBackground?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { name, hasBackground = false, ...rest } = props

    return (
      <>
        <button ref={ref} className='iconButton' {...rest}>
          <img src={`/images/svg/generic/${name}.svg`} alt={name} />
        </button>

        <style jsx>
          {`
            .iconButton {
              background: ${hasBackground ? 'var(--color-secondary)' : 'none'};
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
            .iconButton:hover {
              opacity: 0.9;
            }
            .iconButton img {
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
