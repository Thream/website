import Image from 'next/image'
import { Form } from 'react-component-form'
import TextareaAutosize from 'react-textarea-autosize'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import { Input } from 'components/design/Input'
import { Main } from 'components/design/Main'
import { Button } from 'components/design/Button'
import { FormState } from 'components/design/FormState'
import {
  authenticationFromServerSide,
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'

const CreateGuild: React.FC<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <Head title='Thream | Create a Guild' />
      <Application path='/application/guilds/create'>
        <Main>
          <Form className='w-4/6 max-w-xs'>
            <div className='flex flex-col'>
              <div className='flex justify-between mt-6 mb-2'>
                <label className='pl-1' htmlFor='icon'>
                  Icon
                </label>
              </div>

              <div className='mt-2 relative flex flex-col items-center'>
                <button className='relative w-14 h-14 flex items-center overflow-hidden justify-center text-green-800 dark:text-green-400 transform scale-125 hover:scale-150'>
                  <Image
                    src='/images/data/guild-default.png'
                    alt='logo'
                    width={56}
                    height={56}
                    className='w-14 h-14 rounded-full'
                  />
                  <input
                    name='icon'
                    id='icon'
                    type='file'
                    className='absolute w-22 h-20 -top-8 -left-8 opacity-0 cursor-pointer'
                  />
                </button>
              </div>
            </div>

            <Input type='text' placeholder='Name' name='name' label='Name' />

            <div className='flex flex-col'>
              <div className='flex justify-between mt-6 mb-2'>
                <label className='pl-1' htmlFor='description'>
                  Description
                </label>
              </div>
              <div className='mt-0 relative'>
                <TextareaAutosize
                  className='p-3 rounded-lg bg-[#f1f1f1] text-[#2a2a2a] caret-green-600 font-paragraph w-full focus:border focus:outline-none resize-none focus:shadow-green'
                  placeholder='Description...'
                  id='description'
                  name='description'
                  wrap='soft'
                ></TextareaAutosize>
                <FormState state='idle' />
              </div>
            </div>

            <Button className='w-full mt-6' type='submit'>
              Create
            </Button>
          </Form>
        </Main>
      </Application>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true
})

export default CreateGuild
