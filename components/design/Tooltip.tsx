import { forwardRef } from 'react'

interface TooltipProps extends React.ComponentPropsWithRef<'div'> {
  content: string
  direction?: 'top' | 'bottom' | 'right' | 'left'
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => {
    const { direction = 'bottom', children, content, ...rest } = props

    return (
      <>
        <div ref={ref} {...rest} className='tooltip-wrapper'>
          {children}
          <div className={`tooltip ${direction}`}>{content}</div>
        </div>

        <style jsx>
          {`
            .tooltip-wrapper {
              --tooltip-text-color: white;
              --tooltip-background-color: black;
              --tooltip-margin: 50px;
              --tooltip-arrow-size: 6px;
            }
            .tooltip-wrapper {
              display: inline-block;

            }
            .tooltip {
              position: absolute;
              border-radius: 6px;
              left: 100%;
              top: 50%;
              transform: translateY(-50%);
              padding: 10px;
              color: var(--tooltip-text-color);
              background: var(--tooltip-background-color);
              font-size: 15px;
              font-family: sans-serif;
              line-height: 1;
              z-index: 100;
              white-space: nowrap;
              opacity: 0;
              visibility: hidden;
              transition: all 0.15s ease-in;
            }
            .tooltip-wrapper ~ .tooltip-wrapper:hover .tooltip,
            .tooltip-wrapper:first-child:hover .tooltip {
              opacity: 1;
              visibility: visible;
              transition: all 0.35s ease-out;
              margin: 0;
            }
            .tooltip::before {
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
            .tooltip.top {
              top: calc(var(--tooltip-margin) * -1);
            }
            .tooltip.top::before {
              top: 100%;
              border-top-color: var(--tooltip-background-color);
            }
            .tooltip.right {
              left: calc(100% + var(--tooltip-margin));
            }
            .tooltip.right::before {
              left: calc(var(--tooltip-arrow-size) * -1);
              border-right-color: var(--tooltip-background-color);
            }
            .tooltip.bottom {
              bottom: calc(var(--tooltip-margin) * -1);
            }
            .tooltip.bottom::before {
              bottom: 100%;
              border-bottom-color: var(--tooltip-background-color);
            }
            .tooltip.left {
              left: auto;
              right: calc(100% + var(--tooltip-margin));
              top: 50%;
              transform: translateX(0) translateY(-50%);
            }
            .tooltip.left::before {
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
  }
)
