import { useState } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { FormState } from '../FormState'

export interface InputProps extends React.ComponentPropsWithRef<'input'> {
  label: string
  error?: string
  showForgotPassword?: boolean
}

export const getInputType = (inputType: string): string => {
  return inputType === 'password' ? 'text' : 'password'
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    name,
    type = 'text',
    showForgotPassword = false,
    error,
    ...rest
  } = props
  const { t } = useTranslation()
  const [inputType, setInputType] = useState(type)

  const handlePassword = (): void => {
    const oppositeType = getInputType(inputType)
    setInputType(oppositeType)
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-between mt-6 mb-2'>
          <label className='pl-1' htmlFor={name}>
            {label}
          </label>
          {type === 'password' && showForgotPassword ? (
            <Link href='/authentication/forgot-password'>
              <a
                className='font-headline text-center text-xs sm:text-sm text-green-800 dark:text-green-400 hover:underline'
                data-testid='forgot-password-link'
              >
                {t('authentication:forgot-password')}
              </a>
            </Link>
          ) : null}
        </div>
        <div className='mt-0 relative'>
          <input
            data-testid='input'
            className='input font-paragraph w-full focus:border focus:outline-none'
            {...rest}
            id={name}
            name={name}
            type={inputType}
          />
          {type === 'password' && (
            <div
              data-testid='password-eye'
              onClick={handlePassword}
              className='password-eye absolute cursor-pointer bg-cover bg-[#f1f1f1]'
            />
          )}
          <FormState state={error == null ? 'idle' : 'error'} message={error} />
        </div>
      </div>

      <style jsx>
        {`
          .input {
            background-color: #f1f1f1;
            height: 44px;
            line-height: 44px;
            padding: 0 20px;
            color: #2a2a2a;
            border: 0;
            border-radius: 10px;
          }
          .input:focus {
            box-shadow: 0 0 0 2px #27b05e;
          }
          .password-eye {
            top: 12px;
            right: 16px;
            z-index: 1;
            width: 20px;
            height: 20px;
            background-image: url('/images/svg/icons/input/${inputType}.svg');
          }
        `}
      </style>
    </>
  )
}
