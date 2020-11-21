import { forwardRef, useState } from 'react'

import { ReactHTMLProps } from 'typings/utils'

type Tooltip = ReactHTMLProps<HTMLDivElement> & {
  content: string
  direction?: 'top' | 'bottom' | 'right' | 'left'
  delay?: number
}

export const Tooltip = forwardRef<HTMLDivElement, Tooltip>((props, ref) => {
  const { direction = 'bottom', delay = 5, children, content, ...rest } = props

  let timeout: NodeJS.Timeout
  const [active, setActive] = useState(false)

  const handleMouse = (): void => {
    if (!active) {
      timeout = setTimeout(() => {
        setActive(true)
      }, delay)
      return
    }
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <>
      <div
        ref={ref}
        {...rest}
        className='Tooltip-Wrapper'
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
        {children}
        {active && <div className={`Tooltip-Tip ${direction}`}>{content}</div>}
      </div>

      <style jsx>
        {`
          .Tooltip-Wrapper {
            --tooltip-text-color: white;
            --tooltip-background-color: black;
            --tooltip-margin: 30px;
            --tooltip-arrow-size: 6px;
          }
          .Tooltip-Wrapper {
            display: inline-block;
            position: relative;
          }
          .Tooltip-Tip {
            position: absolute;
            border-radius: 4px;
            left: 50%;
            transform: translateX(-50%);
            padding: 6px;
            color: var(--tooltip-text-color);
            background: var(--tooltip-background-color);
            font-size: 14px;
            font-family: sans-serif;
            line-height: 1;
            z-index: 100;
            white-space: nowrap;
          }

          .Tooltip-Tip::before {
            content: ' ';
            left: 50%;
            border: solid transparent;
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-width: var(--tooltip-arrow-size);
            margin-left: calc(var(--tooltip-arrow-size) * -1);
          }

          .Tooltip-Tip.top {
            top: calc(var(--tooltip-margin) * -1);
          }
          .Tooltip-Tip.top::before {
            top: 100%;
            border-top-color: var(--tooltip-background-color);
          }

          .Tooltip-Tip.right {
            left: calc(100% + var(--tooltip-margin));
            top: 50%;
            transform: translateX(0) translateY(-50%);
          }
          .Tooltip-Tip.right::before {
            left: calc(var(--tooltip-arrow-size) * -1);
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-right-color: var(--tooltip-background-color);
          }
          .Tooltip-Tip.bottom {
            bottom: calc(var(--tooltip-margin) * -1);
          }
          .Tooltip-Tip.bottom::before {
            bottom: 100%;
            border-bottom-color: var(--tooltip-background-color);
          }

          .Tooltip-Tip.left {
            left: auto;
            right: calc(100% + var(--tooltip-margin));
            top: 50%;
            transform: translateX(0) translateY(-50%);
          }
          .Tooltip-Tip.left::before {
            left: auto;
            right: calc(var(--tooltip-arrow-size) * -2);
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-left-color: var(--tooltip-background-color);
          }
        `}
      </style>
    </>
  )
})
