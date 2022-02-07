import { render } from '@testing-library/react'
import { PlusSmIcon } from '@heroicons/react/solid'
import Image from 'next/image'

import { PopupGuildCard } from './PopupGuildCard'

describe('<PopupGuildCard />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PopupGuildCard
        image={
          <Image
            src='/images/svg/design/create-server.svg'
            alt=''
            width={230}
            height={230}
          />
        }
        description='Create your own guild and manage everything within a few clicks !'
        link={{
          icon: <PlusSmIcon className='mr-2 h-8 w-8' />,
          text: 'Create a server',
          href: '/application/guilds/create'
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
