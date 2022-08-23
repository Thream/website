import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import { FetchState as FormStateType } from '../../../hooks/useFetchState'
import { Loader } from '../Loader'

export interface FormStateProps extends React.ComponentPropsWithoutRef<'div'> {
  state: FormStateType
  message?: string | null
  id?: string
}

export const FormState: React.FC<FormStateProps> = (props) => {
  const { state, message, id, ...rest } = props
  const { t } = useTranslation()

  if (state === 'loading') {
    return (
      <div data-cy='loader' className='mt-8 flex justify-center'>
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
        {...rest}
        className={classNames(
          props.className,
          'mt-6 flex max-w-xl items-center text-center font-medium',
          {
            'text-red-800 dark:text-red-400': state === 'error',
            'text-green-800 dark:text-green-400': state === 'success'
          }
        )}
      >
        <div className='thumbnail inline bg-cover font-headline' />
        <span id={id} className='pl-2'>
          <b>{t(`errors:${state}`)}:</b> {message}
        </span>
      </div>

      <style jsx>{`
        .thumbnail {
          height: 20px;
          width: 20px;
          background-image: url('/images/svg/icons/input/${state}.svg');
        }
      `}</style>
    </>
  )
}
