import 'emoji-mart/css/emoji-mart.css'
import { EmojiData, Picker } from 'emoji-mart'
import { useTheme } from 'next-themes'

import { EMOJI_SET } from '../emojiPlugin'

export type EmojiPickerOnClick = (
  emoji: EmojiData,
  event: React.MouseEvent<HTMLElement, MouseEvent>
) => void

export interface EmojiPickerProps {
  onClick?: EmojiPickerOnClick
}

export const EmojiPicker: React.FC<EmojiPickerProps> = (props) => {
  const { theme } = useTheme()

  return (
    <Picker
      set={EMOJI_SET}
      theme={theme as 'light' | 'dark' | 'auto'}
      onClick={props.onClick}
      showPreview={false}
      showSkinTones={false}
    />
  )
}
