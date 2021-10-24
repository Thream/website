import Image from 'next/image'

import { ApplicationProps } from '../Application'
import { IconLink } from '../../design/IconLink'

export interface GuildsProps extends ApplicationProps {}

export const Guilds: React.FC<GuildsProps> = (props) => {
  const { path } = props

  return (
    <div className='min-w-[92px] mt-[130px] pt-2 h-full border-r-2 border-gray-500 dark:border-white/20 space-y-2 scrollbar-firefox-support overflow-y-auto'>
      {new Array(100).fill(null).map((_, index) => {
        return (
          <IconLink
            key={index}
            href={`/application/${index}/0`}
            selected={typeof path !== 'string' && path.guildId === index}
            title='Guild Name'
          >
            <div className='pl-[6px]'>
              <Image
                src='/images/icons/Thream.png'
                alt='logo'
                width={48}
                height={48}
              />
            </div>
          </IconLink>
        )
      })}
    </div>
  )
}
