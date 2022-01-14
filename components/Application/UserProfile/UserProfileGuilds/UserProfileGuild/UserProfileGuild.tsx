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
      className='relative flex w-full cursor-pointer transition group'
      onClick={handleConfirmationState}
    >
      <div className='relative group-hover:-translate-x-20 px-8 py-5 w-full transition'>
        <div className='flex group-hover:opacity-40 transition'>
          <div className='flex justify-center rounded-full filter drop-shadow-lg mr-8 min-w-[60px] min-h-[60px] select-none'>
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
            <p className='text-gray-300 mt-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              nam.
            </p>
          </div>
        </div>
        <div className='absolute top-0 right-[-80px] flex justify-center items-center w-[80px] h-full'>
          <LoginIcon
            height={40}
            className='fill-green-600 drop-shadow-[0_0_15px_rgba(22,163,74,0.50)]'
          />
        </div>
      </div>
    </div>
  )
}
