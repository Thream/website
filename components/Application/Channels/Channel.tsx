import { memo } from "react"
import classNames from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { CogIcon } from "@heroicons/react/solid"

import type { GuildsChannelsPath } from "../Application"
import type { Channel as ChannelType } from "../../../models/Channel"
import { useGuildMember } from "../../../contexts/GuildMember"
import { IconButton } from "../../design/IconButton"

export interface ChannelProps {
  path: GuildsChannelsPath
  channel: ChannelType
  selected?: boolean
}

const ChannelMemo: React.FC<ChannelProps> = (props) => {
  const { channel, path, selected = false } = props
  const router = useRouter()

  const { member } = useGuildMember()

  return (
    <Link
      href={`/application/${path.guildId}/${channel.id}`}
      className={classNames(
        "group relative mx-3 my-3 flex items-center justify-between overflow-hidden rounded-lg py-2 text-sm transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600",
        {
          "font-semibold text-green-800 dark:text-green-400": selected,
        },
      )}
    >
      <span className="max-[315px] ml-2 mr-4 break-all" data-cy="channel-name">
        # {channel.name}
      </span>
      {member.isOwner && (
        <IconButton
          onClick={async () => {
            await router.push(
              `/application/${channel.guildId}/${channel.id}/settings`,
            )
          }}
          className="bg-unherit absolute -right-10 h-full w-8 transition-all group-hover:right-0 group-hover:shadow-lg dark:group-hover:bg-gray-600"
          title="Settings"
        >
          <CogIcon height={20} width={20} />
        </IconButton>
      )}
    </Link>
  )
}

export const Channel = memo(ChannelMemo)
