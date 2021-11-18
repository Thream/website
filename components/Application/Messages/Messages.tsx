import Image from 'next/image'
import TextareaAutosize from 'react-textarea-autosize'

export const Messages: React.FC = () => {
  return (
    <>
      <div className='w-full scrollbar-firefox-support overflow-y-auto transition-all'>
        {new Array(20).fill(null).map((_, index) => {
          return (
            <div
              key={index}
              className='p-4 flex transition hover:bg-gray-200 dark:hover:bg-gray-900'
            >
              <div className='w-12 h-12 mr-4 flex flex-shrink-0 items-center justify-center'>
                <div className='w-10 h-10 drop-shadow-md'>
                  <Image
                    className='rounded-full'
                    src='/images/data/user-default.png'
                    alt='logo'
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className='w-full'>
                <div className='w-max flex items-center'>
                  <span className='font-bold text-gray-900 dark:text-gray-200'>
                    Divlo
                  </span>
                  <span className='text-gray-500 dark:text-gray-200 text-xs ml-4 select-none'>
                    06/04/2021 - 22:28:40
                  </span>
                </div>
                <div className='text-gray-800 dark:text-gray-300 font-paragraph mt-1 break-words'>
                  <p>Message {index}</p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eum debitis voluptatum itaque quaerat. Nemo optio voluptas
                    quas mollitia rerum commodi laboriosam voluptates et sit
                    quo. Repudiandae eius at inventore magnam. Voluptas nisi
                    maxime laborum architecto fuga a consequuntur reiciendis
                    rerum beatae hic possimus, omnis dolorum libero, illo
                    dolorem assumenda. Repellat, ad!
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='p-6 pb-4'>
        <div className='w-full h-full py-1 flex rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-200'>
          <form className='w-full h-full flex items-center'>
            <TextareaAutosize
              className='w-full scrollbar-firefox-support p-2 px-6 my-2 bg-transparent outline-none font-paragraph tracking-wide resize-none'
              placeholder='Write a message...'
              wrap='soft'
              maxRows={6}
            />
          </form>
          <div className='h-full flex items-center justify-around pr-6'>
            <button className='w-full h-full flex items-center justify-center p-1 text-2xl transition hover:-translate-y-1'>
              🙂
            </button>
            <button className='relative w-full h-full flex items-center justify-center p-1 text-green-800 dark:text-green-400 transition hover:-translate-y-1'>
              <input
                type='file'
                className='absolute w-full h-full opacity-0 cursor-pointer'
              />
              <svg width='25' height='25' viewBox='0 0 22 22'>
                <path
                  d='M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM12 15C12 15.2652 11.8946 15.5196 11.7071 15.7071C11.5196 15.8946 11.2652 16 11 16C10.7348 16 10.4804 15.8946 10.2929 15.7071C10.1054 15.5196 10 15.2652 10 15V12H7C6.73478 12 6.48043 11.8946 6.29289 11.7071C6.10536 11.5196 6 11.2652 6 11C6 10.7348 6.10536 10.4804 6.29289 10.2929C6.48043 10.1054 6.73478 10 7 10H10V7C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6C11.2652 6 11.5196 6.10536 11.7071 6.29289C11.8946 6.48043 12 6.73478 12 7V10H15C15.2652 10 15.5196 10.1054 15.7071 10.2929C15.8946 10.4804 16 10.7348 16 11C16 11.2652 15.8946 11.5196 15.7071 11.7071C15.5196 11.8946 15.2652 12 15 12H12V15Z'
                  fill='currentColor'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
