import Link from 'next/link'
import { CogIcon, PlusIcon } from '@heroicons/react/solid'

import { useGuildMember } from '../../../contexts/GuildMember'
import { Divider } from '../../design/Divider'
import { Channels } from '../Channels'
import { IconButton } from '../../design/IconButton'
import { GuildsChannelsPath } from '..'

export interface GuildLeftSidebarProps {
  path: GuildsChannelsPath
}

export const GuildLeftSidebar: React.FC<GuildLeftSidebarProps> = (props) => {
  const { path } = props

  const { guild, member } = useGuildMember()

  return (
    <div className='mt-2 flex w-full flex-col justify-between'>
      <div className='mx-8 mt-2 p-2 text-center'>
        <h2 data-cy='guild-left-sidebar-title' className='text-xl'>
          {guild.name}
        </h2>
      </div>
      <Divider />
      <Channels path={path} />
      <Divider />
      <div className='mb-1 flex items-center justify-center space-x-6 p-2'>
        {member.isOwner && (
          <Link href={`/application/${path.guildId}/channels/create`} passHref>
            <a data-cy='link-add-channel'>
              <IconButton className='h-10 w-10' title='Add a Channel'>
                <PlusIcon />
              </IconButton>
            </a>
          </Link>
        )}
        <Link href={`/application/${path.guildId}/settings`} passHref>
          <a data-cy='link-settings-guild'>
            <IconButton className='h-7 w-7' title='Settings'>
              <CogIcon />
            </IconButton>
          </a>
        </Link>
      </div>
    </div>
  )
}
