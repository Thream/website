import { memo } from 'react'
import Image from 'next/image'

import { GuildWithDefaultChannelId } from '../../../models/Guild'
import { IconLink } from '../../design/IconLink'

export interface GuildProps {
  guild: GuildWithDefaultChannelId
  selected?: boolean
}

const GuildMemo: React.FC<GuildProps> = (props) => {
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
          quality={100}
          className='rounded-full'
          src={
            guild.icon != null ? guild.icon : '/images/data/guild-default.png'
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

export const Guild = memo(GuildMemo)
