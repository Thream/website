import styles from './Loader.module.css'

export interface LoaderProps {
  width?: number
  height?: number
  className?: string
}

export const Loader: React.FC<LoaderProps> = (props) => {
  const { width = 50, height = 50 } = props

  return (
    <div className={props.className}>
      <div
        data-cy='progress-spinner'
        className='relative my-0 mx-auto before:block before:pt-[100%] before:content-none'
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <svg className={styles['progressSpinnerSvg']} viewBox='25 25 50 50'>
          <circle
            className={styles['progressSpinnerCircle']}
            cx='50'
            cy='50'
            r='20'
            fill='none'
            strokeWidth='2'
            strokeMiterlimit='10'
          />
        </svg>
      </div>
    </div>
  )
}
