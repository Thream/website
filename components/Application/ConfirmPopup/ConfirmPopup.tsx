import Image from 'next/image'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import classNames from 'classnames'

import { Loader } from '../../design/Loader'

export interface ConfirmPopupProps {
  className?: string
  title: string
  handleYes: () => void | Promise<void>
  handleNo: () => void | Promise<void>
}

export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ ...props }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleYesLoading = async (): Promise<void> => {
    setIsLoading((isLoading) => !isLoading)
    await props.handleYes()
  }

  return (
    <div className={props.className}>
      <Loader
        className={classNames(
          'absolute top-1/2 left-1/2 scale-0 transition-all',
          {
            'scale-100': isLoading
          }
        )}
      />
      <div
        className={classNames(
          'visible flex flex-col items-center opacity-100 transition-all',
          {
            'invisible opacity-0': isLoading
          }
        )}
      >
        <Image
          quality={100}
          src='/images/svg/design/join-guild.svg'
          alt='Illustration'
          height={150}
          width={150}
        />
        <div className='mt-8 flex flex-col'>
          <h1 className='mb-6 text-center text-xl'>{props.title}</h1>
          <div className='flex gap-7'>
            <button
              className='rounded-3xl bg-success px-8 py-2 text-white transition hover:brightness-125 dark:text-black hover:dark:brightness-75'
              onClick={handleYesLoading}
              data-cy='confirm-popup-yes-button'
            >
              {t('common:yes')}
            </button>
            <button
              className='rounded-3xl bg-error px-8 py-2 text-white transition hover:brightness-125 dark:text-black hover:dark:brightness-75'
              onClick={props.handleNo}
              data-cy='confirm-popup-no-button'
            >
              {t('common:no')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
