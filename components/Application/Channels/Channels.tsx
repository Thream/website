import Link from 'next/link'
import classNames from 'classnames'

import { GuildsChannelsPath } from '../Application'

export interface ChannelsProps {
  path: GuildsChannelsPath
}

export const Channels: React.FC<ChannelsProps> = (props) => {
  const { path } = props

  return (
    <nav className='w-full'>
      {new Array(100).fill(null).map((_, index) => {
        return (
          <Link key={index} href={`/application/${path.guildId}/${index}`}>
            <a
              className={classNames(
                'hover:bg-gray-100 group flex items-center justify-between text-sm py-2 my-3 mx-3 transition-colors dark:hover:bg-gray-600 duration-200 rounded-lg',
                {
                  'text-green-800 dark:text-green-400 font-semibold':
                    typeof path !== 'string' && path.channelId === index,
                  'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-normal':
                    typeof path === 'string'
                }
              )}
            >
              <span className='ml-2 mr-4'># Channel {index}</span>
            </a>
          </Link>
        )
      })}
    </nav>
  )
}
