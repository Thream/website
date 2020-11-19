import { forwardRef, useMemo } from 'react'
import { ReactHTMLProps } from 'typings/utils'

type IconButton = ReactHTMLProps<HTMLButtonElement> & {
  iconName: string
  hasBackground?: boolean
  hasOutline?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButton>(
  (props, ref) => {
    const { iconName, hasBackground, ...rest } = props
    const backgroundStyle = useMemo(
      () =>
        hasBackground != null
          ? 'background :var(--color-secondary); width: 50px; height: 50px; border-radius: 50%;'
          : 'background : none;',
      [hasBackground]
    )
    return (
      <>
        <button ref={ref} className='iconButton' {...rest}>
          <img src={`/images/svg/generic/${iconName}.svg`} alt={iconName} />
        </button>

        <style jsx>
          {`
            .iconButton {
              ${backgroundStyle}
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
