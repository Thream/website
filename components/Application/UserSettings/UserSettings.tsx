import Image from 'next/image'
import { PhotographIcon } from '@heroicons/react/solid'
import useTranslation from 'next-translate/useTranslation'
import { API_URL } from 'tools/api'

import { UserPublic } from '../../../models/User'
import { UserProfileGuilds } from '../UserProfileGuilds'
import { Input } from '../../design/Input'
import { Checkbox } from '../../design/Checkbox'
import { Textarea } from '../../design/Textarea'

export interface UserSettingsProps {
  user: UserPublic
}

export const UserSettings: React.FC<UserSettingsProps> = (props) => {
  const { user } = props
  const { t } = useTranslation()

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <div className='min-w-[1080px] flex flex-col'>
        <div className='flex items-center mx-auto'>
          <div className='relative w-max flex items-center'>
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
          <div className='flex flex-col items-center ml-24'>
            <UserProfileGuilds />
            <p className='mt-6 flex items-center'>
              <Checkbox
                label='Afficher la liste des guilds au public'
                id='checkbox-public-guilds'
              />
            </p>
          </div>
        </div>
        <div className='flex mt-12'>
          <div className='border border-l-neutral-500'>
            <Input label='Email' />
            <Checkbox label='Afficher votre site web au public.' />
            <Input label='Site web' />
            <Textarea
              label={t('application:biography')}
              id='textarea-biography'
            />
          </div>
          <div className='border border-r-neutral-500'></div>
        </div>
      </div>
    </div>
  )
}
