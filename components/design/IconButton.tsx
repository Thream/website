import { forwardRef, useMemo } from 'react'

export const icons = [
  'add',
  'delete',
  'edit',
  'emoji',
  'send',
  'settings',
  'more',
  'download'
] as const

export type Icon = typeof icons[number]

interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {
  icon: Icon
  hasBackground?: boolean
  size?: number
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { icon, hasBackground = false, size = 60, ...rest } = props

    const imageSize = useMemo(() => {
      return size / 2.6
    }, [size])

    return (
      <>
        <button ref={ref} className='button' {...rest}>
          <img src={`/images/svg/icons/${icon}.svg`} alt={icon} />
        </button>

        <style jsx>
          {`
            .button {
              background: ${hasBackground
                ? 'var(--color-background-secondary)'
                : 'none'};
              border-radius: ${hasBackground ? '50%' : '0'};
              width: ${hasBackground ? `${size}px` : '100%'};
              height: ${hasBackground ? `${size}px` : '100%'};
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
              width: ${imageSize}px;
              height: ${imageSize}px;
              display: block;
            }
          `}
        </style>
      </>
    )
  }
)
