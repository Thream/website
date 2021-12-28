import classNames from 'classnames'
import Link from 'next/link'

import { GuildsChannelsPath } from '../../Application'
import { Channel as ChannelType } from '../../../../models/Channel'

export interface ChannelProps {
  path: GuildsChannelsPath
  channel: ChannelType
  selected?: boolean
}

export const Channel: React.FC<ChannelProps> = (props) => {
  const { channel, path, selected = false } = props

  return (
    <Link key={channel.id} href={`/application/${path.guildId}/${channel.id}`}>
      <a
        className={classNames(
          'hover:bg-gray-100 group flex items-center justify-between text-sm py-2 my-3 mx-3 transition-colors dark:hover:bg-gray-600 duration-200 rounded-lg',
          {
            'text-green-800 dark:text-green-400 font-semibold': selected
          }
        )}
      >
        <span className='ml-2 mr-4'># {channel.name}</span>
      </a>
    </Link>
  )
}
