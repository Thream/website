import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

export interface ErrorPageProps {
  statusCode: number
  message: string
}

export const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { message, statusCode } = props
  const { t } = useTranslation()

  return (
    <>
      <h1 className='my-6 text-4xl font-semibold'>
        {t('errors:error')}{' '}
        <span
          className='text-green-800 dark:text-green-400'
          data-cy='status-code'
        >
          {statusCode}
        </span>
      </h1>
      <p className='text-center text-lg'>
        {message}{' '}
        <Link href='/'>
          <a className='text-green-800 hover:underline dark:text-green-400'>
            {t('errors:return-to-home-page')}
          </a>
        </Link>
      </p>

      <style jsx global>
        {`
          main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-width: 100vw;
            flex: 1;
          }
          #__next {
            display: flex;
            flex-direction: column;
            padding-top: 0;
            height: 100vh;
          }
        `}
      </style>
    </>
  )
}
