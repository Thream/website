import { forwardRef } from 'react'

import { ReactHTMLProps } from 'typings/utils'

type IconButton = ReactHTMLProps<HTMLButtonElement> & {
  iconName: string
  hasOutline?: boolean
  hasTooltip?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButton>(
  (props, ref) => {
    const { iconName, ...rest } = props

    return (
      <>
        <button ref={ref} className='iconButton' {...rest}>
          <img src={`/images/svg/generic/${iconName}.svg`} alt={iconName} />
        </button>

        <style jsx>
          {`
            .iconButton {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              border: none;
              outline: none;
              background-color: var(--color-secondary);
            }
            .iconButton img {
              width: 30px;
              height: 30px;
            }
          `}
        </style>
      </>
    )
  }
)
