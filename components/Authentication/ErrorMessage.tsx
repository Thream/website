import useTranslation from 'next-translate/useTranslation'

export interface ErrorMessageProps {
  errors: string[]
  fontSize?: number
}

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { errors, fontSize = 14 } = props
  const { t } = useTranslation()

  if (errors.length === 0) {
    return null
  }

  return (
    <>
      <div className='error-message'>
        {errors.length === 1 && (
          <>
            <div className='error-thumbnail' />
            <span className='error-text'>{errors[0]}</span>
          </>
        )}
        {errors.length > 1 && (
          <>
            <div className='error-container'>
              <div className='error-thumbnail' />
              <span className='error-text'>{t('authentication:errors')} :</span>
            </div>
            <ul className='errors-list'>
              {errors.map((error, index) => {
                return <li key={index}>{error}</li>
              })}
            </ul>
          </>
        )}
      </div>

      <style jsx>
        {`
          .error-message {
            position: relative;
            display: ${errors.length > 1 ? 'block' : 'flex'};
            flex-flow: row;
            align-items: center;
            margin-top: 12px;
            left: -3px;
            color: var(--color-error);
            font-family: 'Poppins', 'Arial', 'sans-serif';
            font-size: ${fontSize}px;
            line-height: 21px;
          }
          .error-container {
            display: flex;
            align-items: center;
          }
          .errors-list {
            margin: 10px 0 0 0;
          }
          .error-thumbnail {
            display: inline-block;
            min-width: 20px;
            width: 20px;
            height: 20px;
            background-image: url(/images/svg/icons/input/error.svg);
            background-size: cover;
          }
          .error-text {
            padding-left: 5px;
          }
        `}
      </style>
    </>
  )
}
