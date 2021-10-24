import { Emoji as EmojiMart } from 'emoji-mart'

import { emojiSet } from './emojiPlugin'

export interface EmojiProps {
  value: string
  size: number
}

export const Emoji: React.FC<EmojiProps> = (props) => {
  const { value, size } = props

  return (
    <EmojiMart
      set={emojiSet}
      emoji={value}
      size={size}
      tooltip
      fallback={() => <>{value}</>}
    />
  )
}
