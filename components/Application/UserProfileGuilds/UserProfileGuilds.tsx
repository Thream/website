import Image from 'next/image'

export const UserProfileGuilds: React.FC = () => {
  return (
    <div className='flex -space-x-7'>
      <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
        <Image
          className='rounded-full'
          src='/images/guilds/Guild_1.svg'
          alt={'Profil Picture'}
          draggable='false'
          height={60}
          width={60}
        />
      </div>
      <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
        <Image
          className='rounded-full'
          src='/images/guilds/Guild_2.svg'
          alt={'Profil Picture'}
          draggable='false'
          height={60}
          width={60}
        />
      </div>
      <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
        <Image
          className='rounded-full'
          src='/images/guilds/Guild_3.svg'
          alt={'Profil Picture'}
          draggable='false'
          height={60}
          width={60}
        />
      </div>
      <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
        <Image
          className='rounded-full'
          src='/images/guilds/Guild_4.svg'
          alt={'Profil Picture'}
          draggable='false'
          height={60}
          width={60}
        />
      </div>
      <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
        <Image
          className='rounded-full'
          src='/images/guilds/Guild_5.svg'
          alt={'Profil Picture'}
          draggable='false'
          height={60}
          width={60}
        />
      </div>
      <div className='flex justify-center items-center rounded-full filter drop-shadow-lg'>
        <Image
          className='rounded-full'
          src='/images/guilds/Guild_6.svg'
          alt={'Profil Picture'}
          draggable='false'
          height={60}
          width={60}
        />
      </div>
      {/* End of the guilds list */}
      <div className='w-[60px] h-[60px] flex justify-center items-center rounded-full filter drop-shadow-lg bg-gray-300 dark:bg-gray-800 z-10'>
        <span className='font-bold text-black dark:text-white text-xl select-none'>
          +4
        </span>
      </div>
    </div>
  )
}
