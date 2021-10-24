import Image from 'next/image'

import { Divider } from '../../design/Divider'

export const Members: React.FC = () => {
  return (
    <>
      <div className='mb-2'>
        <h1 className='text-center pt-2 my-2 text-xl'>Members</h1>
        <Divider />
      </div>
      <div className='flex items-center cursor-pointer py-2 px-4 pr-10 rounded hover:bg-gray-300 dark:hover:bg-gray-900'>
        <div className='min-w-[50px] flex rounded-full border-2 border-green-500'>
          <Image
            src='/images/data/divlo.png'
            alt={"Users's profil picture"}
            height={50}
            width={50}
            draggable='false'
            className='rounded-full'
          />
        </div>
        <div className='max-w-[145px] ml-4'>
          <p className='overflow-hidden whitespace-nowrap overflow-ellipsis'>
            Walidouxssssssssssss
          </p>
          <span className='text-green-600 dark:text-green-400'>Online</span>
        </div>
      </div>
      {new Array(100).fill(null).map((_, index) => {
        return (
          <div
            key={index}
            className='flex items-center cursor-pointer py-2 px-4 pr-10 rounded opacity-40 hover:bg-gray-300 dark:hover:bg-gray-900'
          >
            <div className='min-w-[50px] flex rounded-full border-2 border-transparent drop-shadow-md'>
              <Image
                src='/images/data/divlo.png'
                alt={"Users's profil picture"}
                height={50}
                width={50}
                draggable='false'
                className='rounded-full'
              />
            </div>
            <div className='max-w-[145px] ml-4'>
              <p className='overflow-hidden whitespace-nowrap overflow-ellipsis'>
                Walidouxssssssssssssssssssssssssssssss
              </p>
              <span className='text-red-800 dark:text-red-400'>Offline</span>
            </div>
          </div>
        )
      })}
    </>
  )
}
