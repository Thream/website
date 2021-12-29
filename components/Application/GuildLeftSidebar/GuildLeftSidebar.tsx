import { CogIcon, PlusIcon } from '@heroicons/react/solid'

import { useGuildMember } from 'contexts/GuildMember'
import { Divider } from 'components/design/Divider'
import { Channels } from 'components/Application/Channels'
import { IconButton } from 'components/design/IconButton'
import { GuildsChannelsPath } from '..'

export interface GuildLeftSidebarProps {
  path: GuildsChannelsPath
}

export const GuildLeftSidebar: React.FC<GuildLeftSidebarProps> = (props) => {
  const { path } = props

  const { guild } = useGuildMember()

  return (
    <div className='flex flex-col justify-between w-full mt-2'>
      <div className='text-center p-2 mx-8 mt-2'>
        <h2 data-cy='guild-left-sidebar-title' className='text-xl'>
          {guild.name}
        </h2>
      </div>
      <Divider />
      <Channels path={path} />
      <Divider />
      <div className='flex justify-center items-center p-2 mb-1 space-x-6'>
        <IconButton className='h-10 w-10' title='Add a Channel'>
          <PlusIcon />
        </IconButton>
        <IconButton className='h-7 w-7' title='Settings'>
          <CogIcon />
        </IconButton>
      </div>
    </div>
  )
}
