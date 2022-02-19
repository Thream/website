import Image from 'next/image'
import { LoginIcon } from '@heroicons/react/solid'

export interface UserProfileGuildProps {
  className?: string
  handleConfirmationState: () => void
}

export const UserProfileGuild: React.FC<UserProfileGuildProps> = (props) => {
  const { handleConfirmationState } = props

  return (
    <div
      className='group relative flex w-full cursor-pointer transition'
      onClick={handleConfirmationState}
    >
      <div className='relative w-full px-8 py-5 transition group-hover:-translate-x-20'>
        <div className='flex transition group-hover:opacity-40'>
          <div className='mr-8 flex min-h-[60px] min-w-[60px] select-none justify-center rounded-full drop-shadow-lg filter'>
            <Image
              className='rounded-full'
              src='/images/guilds/Guild_1.svg'
              alt={'Profil Picture'}
              draggable='false'
              height={60}
              width={60}
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-xl font-bold'>Guild Name</h1>
            <p className='mt-2 text-gray-300'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              nam.
            </p>
          </div>
        </div>
        <div className='absolute top-0 right-[-80px] flex h-full w-[80px] items-center justify-center'>
          <LoginIcon
            height={40}
            className='fill-green-600 drop-shadow-[0_0_15px_rgba(22,163,74,0.50)]'
          />
        </div>
      </div>
    </div>
  )
}
