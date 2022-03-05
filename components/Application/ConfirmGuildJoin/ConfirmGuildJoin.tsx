import Image from 'next/image'
import { useState } from 'react'

import { Loader } from '../../design/Loader'

export interface ConfirmGuildJoinProps {
  className?: string
  handleYes: () => void | Promise<void>
  handleNo: () => void | Promise<void>
}

export const ConfirmGuildJoin: React.FC<ConfirmGuildJoinProps> = (props) => {
  const { className, handleYes, handleNo } = props

  const [isLoading, setIsLoading] = useState(false)

  const handleYesLoading = async (): Promise<void> => {
    setIsLoading((isLoading) => !isLoading)
    await handleYes()
  }

  return (
    <div className={className}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Image
            src='/images/svg/design/join-guild.svg'
            alt='Join Guild Illustration'
            height={150}
            width={150}
          />
          <div className='mt-8 flex flex-col'>
            <h1 className='mb-6 text-center text-xl'>Rejoindre la guild ?</h1>
            <div className='flex gap-7'>
              <button
                className='rounded-3xl bg-success px-8 py-2 transition hover:opacity-50'
                onClick={handleYesLoading}
              >
                Oui
              </button>
              <button
                className='rounded-3xl bg-error px-8 py-2 transition hover:opacity-50'
                onClick={handleNo}
              >
                Non
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
