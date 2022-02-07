import { Meta, Story } from '@storybook/react'
import { PlusSmIcon } from '@heroicons/react/solid'
import Image from 'next/image'

import {
  PopupGuildCard as Component,
  PopupGuildCardProps
} from './PopupGuildCard'

const Stories: Meta = {
  title: 'PopupGuildCard',
  component: Component
}

export default Stories

export const PopupGuildCard: Story<PopupGuildCardProps> = (arguments_) => {
  return <Component {...arguments_} />
}
PopupGuildCard.args = {
  image: (
    <Image
      src='/images/svg/design/create-server.svg'
      alt=''
      width={230}
      height={230}
    />
  ),
  description:
    'Create your own guild and manage everything within a few clicks !',
  link: {
    icon: <PlusSmIcon className='mr-2 h-8 w-8' />,
    text: 'Create a server',
    href: '/application/guilds/create'
  }
}
