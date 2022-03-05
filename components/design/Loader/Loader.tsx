export interface LoaderProps {
  width?: number
  height?: number
}

export const Loader: React.FC<LoaderProps> = (props) => {
  const { width = 50, height = 50 } = props

  return (
    <>
      <div data-testid='progress-spinner' className='progress-spinner'>
        <svg className='progress-spinner-svg' viewBox='25 25 50 50'>
          <circle
            className='progress-spinner-circle'
            cx='50'
            cy='50'
            r='20'
            fill='none'
            strokeWidth='2'
            strokeMiterlimit='10'
          />
        </svg>
      </div>

      <style jsx>
        {`
          .progress-spinner {
            display: inline-block;
            position: relative;
            margin: 0 auto;
            width: ${width}px;
            height: ${height}px;
            transform: translateX(-50%);
            left: 50%;
          }
          .progress-spinner::before {
            content: '';
            display: block;
            padding-top: 100%;
          }
          .progress-spinner-svg {
            animation: progress-spinner-rotate 2s linear infinite;
            height: 100%;
            transform-origin: center center;
            width: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
          }
          .progress-spinner-circle {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: 0;
            stroke: #27b05e;
            animation: progress-spinner-dash 1.5s ease-in-out infinite;
            stroke-linecap: round;
          }
          @keyframes progress-spinner-rotate {
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes progress-spinner-dash {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 89, 200;
              stroke-dashoffset: -35px;
            }
            100% {
              stroke-dasharray: 89, 200;
              stroke-dashoffset: -124px;
            }
          }
        `}
      </style>
    </>
  )
}
