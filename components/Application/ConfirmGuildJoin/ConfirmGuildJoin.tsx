import Image from 'next/image'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import classNames from 'classnames'

import { Loader } from '../../design/Loader'

export interface ConfirmGuildJoinProps {
  className?: string
  handleYes: () => void | Promise<void>
  handleNo: () => void | Promise<void>
}

export const ConfirmGuildJoin: React.FC<ConfirmGuildJoinProps> = ({
  ...props
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleYesLoading = async (): Promise<void> => {
    setIsLoading((isLoading) => !isLoading)
    await props.handleYes()
  }

  return (
    <div className={props.className}>
      <Loader
        className={classNames('absolute scale-0 transition', {
          'scale-100': isLoading
        })}
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
          alt='Join Guild Illustration'
          height={150}
          width={150}
        />
        <div className='mt-8 flex flex-col'>
          <h1 className='mb-6 text-center text-xl'>
            {t('application:join-the-guild')} ?
          </h1>
          <div className='flex gap-7'>
            <button
              className='rounded-3xl bg-success px-8 py-2 text-white transition hover:brightness-125 dark:text-black hover:dark:brightness-75'
              onClick={handleYesLoading}
            >
              {t('common:yes')}
            </button>
            <button
              className='rounded-3xl bg-error px-8 py-2 text-white transition hover:brightness-125 dark:text-black hover:dark:brightness-75'
              onClick={props.handleNo}
            >
              {t('common:no')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
