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
    <Link href={`/application/${path.guildId}/${channel.id}`}>
      <a
        className={classNames(
          'group my-3 mx-3 flex items-center justify-between rounded-lg py-2 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600',
          {
            'font-semibold text-green-800 dark:text-green-400': selected
          }
        )}
      >
        <span className='ml-2 mr-4' data-cy='channel-name'>
          # {channel.name}
        </span>
      </a>
    </Link>
  )
}
