import { useState } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import classNames from 'clsx'

import { FormState } from '../FormState'

export interface InputProps extends React.ComponentPropsWithRef<'input'> {
  label: string
  error?: string | null
  showForgotPassword?: boolean
  className?: string
}

export const getInputType = (inputType: string): string => {
  return inputType === 'password' ? 'text' : 'password'
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    name,
    className,
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
    <div className='flex flex-col'>
      <div className={classNames('mb-2 mt-6 flex justify-between', className)}>
        <label className='pl-1' htmlFor={name}>
          {label}
        </label>
        {type === 'password' && showForgotPassword ? (
          <Link
            href='/authentication/forgot-password'
            className='text-center font-headline text-xs text-green-800 hover:underline dark:text-green-400 sm:text-sm'
            data-cy='forgot-password-link'
          >
            {t('authentication:forgot-password')}
          </Link>
        ) : null}
      </div>
      <div className='relative mt-0'>
        <input
          data-cy={`input-${name ?? 'name'}`}
          className='h-11 w-full rounded-lg border border-transparent bg-[#f1f1f1] px-3 font-paragraph leading-10 text-[#2a2a2a] caret-green-600 focus:border focus:shadow-green focus:outline-none'
          {...rest}
          id={name}
          name={name}
          type={inputType}
        />
        {type === 'password' && (
          <div
            data-cy='password-eye'
            onClick={handlePassword}
            style={{
              backgroundImage: `url('/images/svg/icons/input/${inputType}.svg')`
            }}
            className='absolute right-4 top-3 z-10 h-5 w-5 cursor-pointer bg-[#f1f1f1] bg-cover'
          />
        )}
        <FormState
          id={`error-${name ?? 'input'}`}
          state={error == null ? 'idle' : 'error'}
          message={error}
        />
      </div>
    </div>
  )
}
