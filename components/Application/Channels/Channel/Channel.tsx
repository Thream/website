import classNames from 'classnames'
import Link from 'next/link'
import { CogIcon } from '@heroicons/react/solid'

import { GuildsChannelsPath } from '../../Application'
import { Channel as ChannelType } from '../../../../models/Channel'
import { useGuildMember } from '../../../../contexts/GuildMember'
import { IconButton } from '../../../design/IconButton'

export interface ChannelProps {
  path: GuildsChannelsPath
  channel: ChannelType
  selected?: boolean
}

export const Channel: React.FC<ChannelProps> = (props) => {
  const { channel, path, selected = false } = props

  const { member } = useGuildMember()

  return (
    <Link href={`/application/${path.guildId}/${channel.id}`}>
      <a
        className={classNames(
          'group relative my-3 mx-3 flex items-center justify-between overflow-hidden rounded-lg py-2 text-sm transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600',
          {
            'font-semibold text-green-800 dark:text-green-400': selected
          }
        )}
      >
        <span
          className='max-[315px] ml-2 mr-4 break-all'
          data-cy='channel-name'
        >
          # {channel.name}
        </span>
        {member.isOwner && (
          <IconButton
            className='bg-unherit absolute -right-10 h-full w-8 transition-all group-hover:right-0 group-hover:shadow-lg dark:group-hover:bg-gray-600'
            title='Settings'
          >
            <CogIcon height={20} width={20} />
          </IconButton>
        )}
      </a>
    </Link>
  )
}
