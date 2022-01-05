import Image from 'next/image'
import { PhotographIcon } from '@heroicons/react/solid'
import useTranslation from 'next-translate/useTranslation'
import { API_URL } from 'tools/api'

import { UserPublic } from '../../../models/User'
import { UserProfileGuilds } from '../UserProfileGuilds'
import { Input } from '../../design/Input'
import { Checkbox } from '../../design/Checkbox'
import { Textarea } from '../../design/Textarea'
import { SocialMediaButton } from '../../design/SocialMediaButton'
import { SwitchTheme } from '../../Header/SwitchTheme'
import { Language } from '../../Header/Language'

export interface UserSettingsProps {
  user: UserPublic
}

export const UserSettings: React.FC<UserSettingsProps> = (props) => {
  const { user } = props
  const { t } = useTranslation()

  return (
    <div className='my-auto lg:min-w-[875px] py-12 justify-center items-center flex flex-col'>
      <div className='flex flex-col w-full justify-center items-center lg:flex-row sm:w-fit'>
        <div className=' flex justify-center items-center flex-wrap px-6 w-full sm:w-max'>
          <div className='relative'>
            <div className='absolute w-full h-full z-50'>
              <button className='relative w-full h-full flex items-center justify-center transition hover:scale-110'>
                <input
                  type='file'
                  className='absolute w-full h-full opacity-0 cursor-pointer'
                />
                <PhotographIcon color='white' className='w-8 h-8' />
              </button>
            </div>
            <div className='flex justify-center items-center rounded-full shadow-xl bg-black'>
              <Image
                className='opacity-50 rounded-full'
                src={
                  user.logo != null
                    ? API_URL + user.logo
                    : '/images/data/user-default.png'
                }
                alt='Profil Picture'
                draggable='false'
                height={125}
                width={125}
              />
            </div>
          </div>
          <div className='flex flex-col mx-12'>
            <Input label='Name' className='!mt-0' />
            <Input label='Status' className='!mt-4' />
          </div>
        </div>
        <div className='flex mt-10 flex-col items-center ml-0 lg:ml-24 lg:mt-0'>
          <UserProfileGuilds />
          <Checkbox
            label={t('application:label-checkbox-guilds')}
            id='checkbox-public-guilds'
            className='px-8'
          />
        </div>
      </div>
      <div className='flex flex-col w-full justify-between items-center mt-12 lg:flex-row sm:w-fit'>
        <div className='w-4/5 sm:w-[450px] pr-0 lg:pr-12 border-r-1 border-l-neutral-500'>
          <Input label='Email' />
          <Input label={t('application:website')} />
          <Checkbox
            label={t('application:label-checkbox-website')}
            id='checkbox-website-visibility'
          />
          <Textarea
            label={t('application:biography')}
            id='textarea-biography'
          />
        </div>
        <div className='flex flex-col justify-between items-center w-4/5 sm:w-[415px] h-full pr-0 lg:pl-12 border-t-1 border-r-neutral-500'>
          <div className='flex w-full flex-col gap-4 mt-14'>
            <SocialMediaButton
              socialMedia='Google'
              className='w-full justify-center'
            />
            <SocialMediaButton
              socialMedia='Discord'
              className='w-full justify-center'
            />
            <SocialMediaButton
              socialMedia='GitHub'
              className='w-full justify-center'
            />
          </div>
          <div className='flex justify-between w-full pt-14'>
            <Language />
            <SwitchTheme />
          </div>
        </div>
      </div>
    </div>
  )
}
