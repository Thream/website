import useTranslation from 'next-translate/useTranslation'

import { FormState as FormStateType } from 'hooks/useFormState'
import { ErrorMessage } from './ErrorMessage'
import { Loader } from 'components/design/Loader'

export interface FormStateProps {
  state: FormStateType
  message?: string
}

export const FormState: React.FC<FormStateProps> = (props) => {
  const { state, message } = props
  const { t } = useTranslation()

  if (state === 'loading') {
    return (
      <>
        <div data-testid='loader' className='loader'>
          <Loader />
        </div>

        <style jsx>
          {`
            .loader {
              margin-top: 30px;
              display: flex;
              justify-content: center;
            }
          `}
        </style>
      </>
    )
  }

  if (state === 'idle' || message == null) {
    return null
  }

  if (state === 'success') {
    return (
      <>
        <div className='success'>
          <div className='success-message'>
            <div className='success-thumbnail' />
            <span className='success-text'>
              <b>{t('authentication:success')} :</b> {message}
            </span>
          </div>
        </div>
        <style jsx>
          {`
            .success {
              margin-top: 20px;
              display: flex;
              justify-content: center;
            }
            .success-message {
              position: relative;
              display: flex;
              flex-flow: row;
              align-items: center;
              justify-content: center;
              margin-top: 12px;
              left: -3px;
              color: var(--color-success);
              font-family: 'Arial', 'sans-serif';
              font-size: 16px;
              line-height: 21px;
            }
            .success-thumbnail {
              display: inline-block;
              width: 20px;
              height: 22px;
              background-image: url(/images/svg/icons/input/success.svg);
              background-size: cover;
            }
            .success-text {
              padding-left: 5px;
            }
          `}
        </style>
      </>
    )
  }

  return (
    <>
      <div data-testid='error' className='error'>
        <ErrorMessage fontSize={16} errors={[message]} />
      </div>

      <style jsx>
        {`
          .error {
            margin-top: 20px;
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  )
}
