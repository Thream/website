import { Emoji as EmojiMart } from "emoji-mart"

import { EMOJI_SET } from "./emojiPlugin"

export interface EmojiProps {
  value: string
  size: number
  tooltip?: boolean
}

export const Emoji: React.FC<EmojiProps> = (props) => {
  const { value, size, tooltip = false } = props

  return (
    <EmojiMart
      set={EMOJI_SET}
      emoji={value}
      size={size}
      tooltip={tooltip}
      fallback={() => {
        return <>{value}</>
      }}
    />
  )
}
