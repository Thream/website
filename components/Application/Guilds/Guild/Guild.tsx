import Image from 'next/image'

import { API_URL } from '../../../../tools/api'
import { GuildWithDefaultChannelId } from '../../../../models/Guild'
import { IconLink } from '../../../design/IconLink'

export interface GuildProps {
  guild: GuildWithDefaultChannelId
  selected?: boolean
}

export const Guild: React.FC<GuildProps> = (props) => {
  const { guild, selected } = props

  return (
    <IconLink
      className='mt-2'
      href={`/application/${guild.id}/${guild.defaultChannelId}`}
      selected={selected}
      title={guild.name}
    >
      <div className='pl-[6px]'>
        <Image
          className='rounded-full'
          src={
            guild.icon != null
              ? API_URL + guild.icon
              : '/images/data/guild-default.png'
          }
          alt='logo'
          width={48}
          height={48}
          draggable={false}
        />
      </div>
    </IconLink>
  )
}
