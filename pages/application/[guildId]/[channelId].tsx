import { GetServerSideProps } from 'next'
import Image from 'next/image'
import TextareaAutosize from 'react-textarea-autosize'

import { Head } from 'components/Head'
import { Application } from 'components/Application'

export interface ChannelPageProps {
  channelId: number
  guildId: number
}

const ChannelPage: React.FC<ChannelPageProps> = (props) => {
  const { channelId, guildId } = props

  return (
    <>
      <Head title='Thream | Application' />
      <Application
        path={{
          channelId,
          guildId
        }}
      >
        <div className='h-full-without-header flex flex-col justify-between flex-1 p-2'>
          <div className='w-full overflow-y-scroll'>
            {new Array(20).fill(null).map((_, index) => {
              return (
                <div
                  key={index}
                  className='relative flex-1 mt-4 min-w-0 md:p-2 md:mx-2 flex hover:bg-gray-200 dark:hover:bg-gray-800'
                >
                  <div className='w-12 h-12 mr-3 flex-shrink-0 flex items-center justify-center select-none'>
                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                      <Image
                        className='rounded-full'
                        src='/images/data/divlo.png'
                        alt='logo'
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                  <div className='w-full h-auto min-w-0 inline-block flex-shrink'>
                    <div className='w-full h-8 space-x-2'>
                      <span>Divlo</span>
                      <span className='text-gray-800 dark:text-gray-400 text-xs'>
                        06/04/2021 - 22:28:40
                      </span>
                    </div>
                    <div className='break-all md:break-words outline-none text-base font-paragraph'>
                      <p>Message {index}</p>
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Eum debitis voluptatum itaque quaerat. Nemo optio
                        voluptas quas mollitia rerum commodi laboriosam
                        voluptates et sit quo. Repudiandae eius at inventore
                        magnam. Voluptas nisi maxime laborum architecto fuga a
                        consequuntur reiciendis rerum beatae hic possimus, omnis
                        dolorum libero, illo dolorem assumenda. Repellat, ad!
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='flex h-auto px-8 pt-6 pb-2'>
            <div className='flex items-start w-full h-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800'>
              <form className='w-full h-auto rounded-lg px30 overflow-hidden'>
                <div className='relative flex items-center w-full h-auto rounded-lg'>
                  <div className='w-full relative flex items-center my-1'>
                    <div className='w-full flex items-center p-3'>
                      <TextareaAutosize
                        className='py-2 flex-grow break-all sm:break-words w-12/12 overflow-y-auto overflow-x-hidden rounded-lg bg-transparent outline-none font-paragraph resize-none'
                        placeholder='Write a message'
                        wrap='soft'
                      ></TextareaAutosize>
                    </div>
                  </div>
                </div>
              </form>
              <div className='w-30 h-12 flex items-center justify-around'>
                <div className='w-8 h-8 flex items-center justify-center'>
                  <button className='flex items-center justify-center focus:outline-none'>
                    <div>
                      <div className='transform scale-125 hover:scale-150'>
                        🙂
                      </div>
                    </div>
                  </button>
                </div>
                <div className='w-8 h-8 flex items-center justify-center'>
                  <button className='relative w-14 h-12 flex items-center overflow-hidden justify-center text-green-800 dark:text-green-400 transform scale-125 hover:scale-150'>
                    <input
                      type='file'
                      className='absolute w-22 h-20 -top-8 -left-8 opacity-0 cursor-pointer'
                    />
                    <svg width='24' height='24'>
                      <path
                        fill='currentColor'
                        d='M12 2a10.01 10.01 0 000 20 10.01 10.01 0 000-20zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Application>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  {},
  {
    channelId: string
    guildId: string
  }
> = async (context) => {
  const channelId = Number(context?.params?.channelId)
  const guildId = Number(context?.params?.guildId)
  if (isNaN(channelId) || isNaN(guildId)) {
    return {
      redirect: {
        destination: '/application',
        permanent: false
      }
    }
  }
  return {
    props: { channelId, guildId }
  }
}

export default ChannelPage
