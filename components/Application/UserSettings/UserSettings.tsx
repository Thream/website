import Image from 'next/image'
import { CameraIcon } from '@heroicons/react/solid'

import { UserPublic } from '../../../models/User'
import { UserProfileGuilds } from '../UserProfileGuilds'

export interface UserSettingsProps {
  user: UserPublic
}

export const UserSettings: React.FC<UserSettingsProps> = (props) => {
  const { user } = props

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <div className='min-w-[1080px] flex flex-col border'>
        <div className='flex items-center mx-auto'>
          <div className='relative w-max flex items-center'>
            <div className='absolute w-full h-full z-50'>
              <button className='relative w-full h-full flex items-center justify-center transition hover:scale-110'>
                <input
                  type='file'
                  className='absolute w-full h-full opacity-0 cursor-pointer'
                />
                <CameraIcon color='white' className='w-14 h-14' />
              </button>
            </div>
            <div className='flex justify-center items-center rounded-full shadow-xl bg-black'>
              <Image
                className='opacity-50 rounded-full'
                src='/images/data/user-default.png'
                alt='Profil Picture'
                draggable='false'
                height={125}
                width={125}
              />
            </div>
          </div>
          <div className='flex flex-col mx-12'>
            <input
              type='text'
              placeholder={user.name}
              className='outline-none bg-gray-200 my-2 h-14 px-6 rounded-md focus:bg-gray-300 transition duration-500 dark:bg-gray-800 dark:hover:bg-gray-700'
            />
            <input
              type='text'
              placeholder={user.status ?? ''}
              className='outline-none bg-gray-200 my-2 h-14 px-6 rounded-md focus:bg-gray-300 transition duration-500 dark:bg-gray-800 dark:hover:bg-gray-700'
            />
          </div>
          <div className='flex flex-col items-center ml-24'>
            <UserProfileGuilds />
            <p className='mt-6 flex items-center'>
              <input
                type='checkbox'
                id='inputCheckbox'
                className='relative appearance-none h-6 w-6 bg-gradient-to-t from-[#bcc7d4] to-[#d3dfed] dark:from-[#1f2937] dark:to-[#273547] mr-3 cursor-pointer rounded-md after:absolute before:absolute after:w-[2px] before:w-[2px] after:bg-black before:bg-black dark:after:bg-white dark:before:bg-white transition-all after:transition-all before:transition-all after:top-[62.5%] after:left-[36%] after:h-[7px] after:translate-x-[-35%] after:translate-y-[-62.5%] after:rotate-[-50deg] after:scale-0 after:duration-200 before:top-[50%] before:left-[59%] before:h-[12px] before:translate-x-[-59%] before:translate-y-[-50%] before:rotate-[40deg] before:scale-0 checked:after:scale-100 checked:before:scale-100'
              />
              <label
                className='cursor-pointer opacity-80 hover:opacity-100 transition duration-400 select-none'
                htmlFor='inputCheckbox'
              >
                Afficher la liste des guilds au public
              </label>
            </p>
          </div>
        </div>
        <div className='flex items border '>xd</div>
      </div>
    </div>
  )
}
