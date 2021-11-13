import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import { FetchState as FormStateType } from 'hooks/useFetchState'
import { Loader } from '../Loader'

export interface FormStateProps {
  state: FormStateType
  message?: string | null
  id?: string
}

export const FormState: React.FC<FormStateProps> = (props) => {
  const { state, message, id } = props
  const { t } = useTranslation()

  if (state === 'loading') {
    return (
      <div data-testid='loader' className='mt-8 flex justify-center'>
        <Loader />
      </div>
    )
  }

  if (state === 'idle' || message == null) {
    return null
  }

  return (
    <>
      <div
        className={classNames(
          'mt-6 relative flex flex-row items-center font-medium text-center max-w-xl',
          {
            'text-red-800 dark:text-red-400': state === 'error',
            'text-green-800 dark:text-green-400': state === 'success'
          }
        )}
      >
        <div className='thumbnail bg-cover absolute top-0 inline-block font-headline'></div>
        <span id={id} className={classNames({ 'pl-6': state === 'error' })}>
          <b>{t(`errors:${state}`)}:</b> {message}
        </span>
      </div>

      <style jsx>{`
        .thumbnail {
          min-width: 20px;
          width: 20px;
          height: ${state === 'error' ? '20px' : '25px'};
          background-image: url('/images/svg/icons/input/${state}.svg');
        }
      `}</style>
    </>
  )
}
