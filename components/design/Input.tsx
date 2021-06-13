import { forwardRef, useState } from 'react'
import Link from 'next/link'
import { ErrorMessage } from '../Authentication/ErrorMessage'
import useTranslation from 'next-translate/useTranslation'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  label: string
  errors?: string[]
  showForgotPassword?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    name,
    type = 'text',
    errors = [],
    showForgotPassword = false,
    ...rest
  } = props
  const { t } = useTranslation()
  const [inputType, setInputType] = useState(type)

  const handlePassword = (): void => {
    const oppositeType = inputType === 'password' ? 'text' : 'password'
    setInputType(oppositeType)
  }

  return (
    <>
      <div className='container'>
        <div className='input-with-label'>
          <div className='label-container'>
            <label className='label' htmlFor={name}>
              {label}
            </label>
            {type === 'password' && showForgotPassword ? (
              <Link href='/authentication/forgot-password'>
                <a className='label-forgot-password'>
                  {t('authentication:forgot-password')}
                </a>
              </Link>
            ) : null}
          </div>
          <div className='input-container'>
            <input
              data-testid='input'
              className='input'
              {...rest}
              ref={ref}
              id={name}
              name={name}
              type={inputType}
            />
            {type === 'password' && (
              <div
                data-testid='password-eye'
                onClick={handlePassword}
                className='password-eye'
              />
            )}
            <ErrorMessage errors={errors} />
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            margin-bottom: 20px;
          }
          .input-container {
            margin-top: 0;
            position: relative;
          }
          .input-with-label {
            display: flex;
            flex-direction: column;
          }
          .label-container {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .label-forgot-password {
            font-size: 12px;
          }
          .label {
            color: var(--color-secondary);
            font-size: 16px;
            font-family: 'Poppins', 'Arial', 'sans-serif';
            padding-left: 3px;
          }
          .input {
            background-color: #f1f1f1;
            font-family: 'Roboto', 'Arial', 'sans-serif';
            width: 100%;
            height: 44px;
            line-height: 44px;
            padding: 0 20px;
            color: #2a2a2a;
            border: 0;
            box-shadow: ${errors.length >= 1
              ? '0 0 0 2px var(--color-error)'
              : 'none'};
            border-radius: 10px;
          }
          .input:focus {
            outline: 0;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 2px var(--color-primary);
          }
          .password-eye {
            position: absolute;
            top: 12px;
            right: 16px;
            z-index: 1;
            width: 20px;
            height: 20px;
            background-image: url(/images/svg/icons/input/${inputType}.svg);
            background-size: cover;
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
})
